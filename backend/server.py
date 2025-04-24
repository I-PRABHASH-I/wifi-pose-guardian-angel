
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import pandas as pd
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
MODEL_FOLDER = 'models'

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODEL_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_model(model_path):
    try:
        # Load the model (assuming it's a PyTorch model)
        model = torch.load(model_path)
        model.eval()
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

def process_csv(file_path):
    # Read and preprocess CSV data
    df = pd.read_csv(file_path)
    # Extract features (assuming the CSV has the same format as training data)
    features = df.iloc[:, :30].values  # First 30 columns are subcarrier data
    
    # Convert to tensor
    features_tensor = torch.FloatTensor(features)
    return features_tensor

@app.route('/infer', methods=['POST'])
def infer():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    model_path = request.headers.get('Model-Path', 'models/pose_lstm.pth')
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Save uploaded file
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            
            # Load model
            model = load_model(model_path)
            if model is None:
                return jsonify({'error': 'Failed to load model'}), 500
            
            # Process CSV
            features = process_csv(file_path)
            
            # Make prediction
            with torch.no_grad():
                outputs = model(features)
                predictions = torch.argmax(outputs, dim=1)
            
            # Map numerical predictions to pose classes
            pose_classes = ['Stand', 'Sit', 'Kneel', 'Sleep']
            predicted_pose = pose_classes[predictions[0].item()]
            
            # Generate keypoints based on the predicted pose
            # This is a simplified version - you might want to modify based on your needs
            keypoints = generate_keypoints(predicted_pose)
            
            return jsonify({
                'human_present': True,
                'pose_class': predicted_pose,
                'keypoints': keypoints
            })
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            # Clean up uploaded file
            if os.path.exists(file_path):
                os.remove(file_path)
    
    return jsonify({'error': 'Invalid file type'}), 400

def generate_keypoints(pose):
    # This is a placeholder - implement actual keypoint generation based on your model
    # For now, using similar logic as the mock frontend
    base_points = [
        {'x': 0.5, 'y': 0.1},  # Head
        {'x': 0.5, 'y': 0.2},  # Neck
        # ... add more default points as needed
    ]
    return base_points

if __name__ == '__main__':
    app.run(debug=True, port=5000)
