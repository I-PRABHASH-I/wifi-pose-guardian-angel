
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import pandas as pd
import numpy as np
import os
from werkzeug.utils import secure_filename
import sys

# Add the parent directory to the path so we can import the LSTM model
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.train_lstm_pose import LSTM_Model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
MODEL_PATH = 'pose_detection_model.pth'
INPUT_SIZE = 30  # Number of subcarriers

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Map numerical predictions to pose classes
POSE_CLASSES = ['Stand', 'Sit', 'Kneel', 'Sleep']

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_model():
    # Check if model file exists
    if not os.path.exists(MODEL_PATH):
        print(f"Model file not found: {MODEL_PATH}")
        return None
    
    try:
        # Initialize model architecture
        model = LSTM_Model(input_size=INPUT_SIZE, hidden_size=64, num_layers=2, num_classes=4)
        # Load the saved weights
        model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
        model.eval()
        print("Model loaded successfully")
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

def process_csv(file_path):
    # Read and preprocess CSV data
    try:
        df = pd.read_csv(file_path)
        # Extract features (assuming the CSV has the same format as training data)
        # Use the first 30 columns (subcarrier data)
        features = df.iloc[:, :INPUT_SIZE].values
        
        # Convert to tensor
        features_tensor = torch.FloatTensor(features)
        return features_tensor
    except Exception as e:
        print(f"Error processing CSV: {str(e)}")
        return None

def generate_keypoints(pose):
    # Generate keypoints based on the predicted pose
    # This uses the same logic as in the frontend mock
    if pose == "Stand":
        return [
            {"x": 0.5, "y": 0.1},  # Head
            {"x": 0.5, "y": 0.2},  # Neck
            {"x": 0.5, "y": 0.3},  # Spine
            {"x": 0.5, "y": 0.45},  # Pelvis
            {"x": 0.5, "y": 0.5},  # Tailbone
            {"x": 0.6, "y": 0.2},  # Right shoulder
            {"x": 0.65, "y": 0.35},  # Right elbow
            {"x": 0.4, "y": 0.2},  # Left shoulder
            {"x": 0.35, "y": 0.35},  # Left elbow
            {"x": 0.7, "y": 0.5},  # Right hand
            {"x": 0.7, "y": 0.5},  # Right fingers
            {"x": 0.3, "y": 0.5},  # Left hand
            {"x": 0.3, "y": 0.5},  # Left fingers
            {"x": 0.55, "y": 0.6},  # Right hip
            {"x": 0.55, "y": 0.75},  # Right knee
            {"x": 0.55, "y": 0.9},  # Right ankle
            {"x": 0.45, "y": 0.6},  # Left hip
            {"x": 0.45, "y": 0.75},  # Left knee
            {"x": 0.45, "y": 0.9}  # Left ankle
        ]
    elif pose == "Sit":
        return [
            {"x": 0.5, "y": 0.2},  # Head
            {"x": 0.5, "y": 0.3},  # Neck
            {"x": 0.5, "y": 0.4},  # Spine
            {"x": 0.5, "y": 0.5},  # Pelvis
            {"x": 0.5, "y": 0.5},  # Tailbone
            {"x": 0.6, "y": 0.3},  # Right shoulder
            {"x": 0.65, "y": 0.4},  # Right elbow
            {"x": 0.4, "y": 0.3},  # Left shoulder
            {"x": 0.35, "y": 0.4},  # Left elbow
            {"x": 0.7, "y": 0.5},  # Right hand
            {"x": 0.7, "y": 0.5},  # Right fingers
            {"x": 0.3, "y": 0.5},  # Left hand
            {"x": 0.3, "y": 0.5},  # Left fingers
            {"x": 0.55, "y": 0.5},  # Right hip
            {"x": 0.6, "y": 0.7},  # Right knee
            {"x": 0.5, "y": 0.9},  # Right ankle
            {"x": 0.45, "y": 0.5},  # Left hip
            {"x": 0.4, "y": 0.7},  # Left knee
            {"x": 0.5, "y": 0.9}  # Left ankle
        ]
    elif pose == "Kneel":
        return [
            {"x": 0.5, "y": 0.2},  # Head
            {"x": 0.5, "y": 0.3},  # Neck
            {"x": 0.5, "y": 0.4},  # Spine
            {"x": 0.5, "y": 0.5},  # Pelvis
            {"x": 0.5, "y": 0.55},  # Tailbone
            {"x": 0.6, "y": 0.3},  # Right shoulder
            {"x": 0.7, "y": 0.4},  # Right elbow
            {"x": 0.4, "y": 0.3},  # Left shoulder
            {"x": 0.3, "y": 0.4},  # Left elbow
            {"x": 0.75, "y": 0.5},  # Right hand
            {"x": 0.8, "y": 0.5},  # Right fingers
            {"x": 0.25, "y": 0.5},  # Left hand
            {"x": 0.2, "y": 0.5},  # Left fingers
            {"x": 0.55, "y": 0.55},  # Right hip
            {"x": 0.55, "y": 0.75},  # Right knee
            {"x": 0.7, "y": 0.9},  # Right ankle
            {"x": 0.45, "y": 0.55},  # Left hip
            {"x": 0.45, "y": 0.75},  # Left knee
            {"x": 0.3, "y": 0.9}  # Left ankle
        ]
    elif pose == "Sleep":
        return [
            {"x": 0.1, "y": 0.5},  # Head
            {"x": 0.2, "y": 0.5},  # Neck
            {"x": 0.4, "y": 0.5},  # Spine
            {"x": 0.6, "y": 0.5},  # Pelvis
            {"x": 0.7, "y": 0.5},  # Tailbone
            {"x": 0.2, "y": 0.4},  # Right shoulder
            {"x": 0.3, "y": 0.35},  # Right elbow
            {"x": 0.2, "y": 0.6},  # Left shoulder
            {"x": 0.3, "y": 0.65},  # Left elbow
            {"x": 0.4, "y": 0.3},  # Right hand
            {"x": 0.45, "y": 0.25},  # Right fingers
            {"x": 0.4, "y": 0.7},  # Left hand
            {"x": 0.45, "y": 0.75},  # Left fingers
            {"x": 0.6, "y": 0.45},  # Right hip
            {"x": 0.75, "y": 0.4},  # Right knee
            {"x": 0.9, "y": 0.4},  # Right ankle
            {"x": 0.6, "y": 0.55},  # Left hip
            {"x": 0.75, "y": 0.6},  # Left knee
            {"x": 0.9, "y": 0.6}  # Left ankle
        ]
    else:
        # Default skeleton
        return [{"x": 0.5, "y": 0.5} for _ in range(19)]

# Load model when the server starts
model = load_model()

@app.route('/infer', methods=['POST'])
def infer():
    # Check if file was included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Save uploaded file
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            
            # Check if model is loaded
            if model is None:
                return jsonify({'error': 'Model not loaded'}), 500
            
            # Process CSV
            features = process_csv(file_path)
            if features is None:
                return jsonify({'error': 'Failed to process CSV file'}), 500
            
            # Make prediction
            with torch.no_grad():
                presence_pred, pose_logits = model(features)
                
                # Get the most likely pose class
                _, predicted_pose_idx = torch.max(pose_logits, 1)
                pose_idx = predicted_pose_idx[0].item()
                
                # Map numerical prediction to pose class name
                predicted_pose = POSE_CLASSES[pose_idx]
                
                # Convert presence prediction to boolean
                human_present = bool(presence_pred[0].item() > 0.5)
                
                # Calculate confidence scores for each pose
                confidences = torch.nn.functional.softmax(pose_logits, dim=1)[0].tolist()
                confidence_dict = {POSE_CLASSES[i]: confidences[i] for i in range(len(POSE_CLASSES))}
            
            # Generate keypoints based on the predicted pose
            keypoints = generate_keypoints(predicted_pose)
            
            return jsonify({
                'human_present': human_present,
                'pose_class': predicted_pose,
                'keypoints': keypoints,
                'confidence': confidence_dict
            })
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            # Clean up uploaded file
            if os.path.exists(file_path):
                os.remove(file_path)
    
    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
