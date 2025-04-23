
# validate_lstm_pose.py

import torch
import numpy as np
from train_lstm_pose import LSTM_Model, CSIDataset
from torch.utils.data import DataLoader
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

def validate_model():
    print("Loading test dataset...")
    # Load the full dataset
    dataset = CSIDataset("dataset.csv")
    
    # Use 20% of data for testing
    test_size = int(0.2 * len(dataset))
    _, test_dataset = torch.utils.data.random_split(
        dataset, 
        [len(dataset) - test_size, test_size]
    )
    
    test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
    
    # Load the trained model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = LSTM_Model().to(device)
    
    try:
        model.load_state_dict(torch.load('pose_detection_model.pth'))
        print("Model loaded successfully")
    except FileNotFoundError:
        print("Error: Model file 'pose_detection_model.pth' not found!")
        return
    
    # Set model to evaluation mode
    model.eval()
    
    # Initialize lists to store predictions and ground truth
    all_presence_true = []
    all_presence_pred = []
    all_pose_true = []
    all_pose_pred = []
    
    print("\nStarting validation...")
    
    with torch.no_grad():
        for csi, presence, pose in test_loader:
            csi, presence, pose = csi.to(device), presence.to(device), pose.to(device)
            
            # Get model predictions
            presence_pred, pose_pred = model(csi)
            
            # Convert presence predictions to binary (0 or 1)
            predicted_presence = (presence_pred > 0.5).float()
            
            # Get pose predictions
            _, predicted_pose = torch.max(pose_pred, 1)
            
            # Store true and predicted values
            # Convert tensors to numpy and ensure they're flattened
            all_presence_true.extend(presence.cpu().numpy().flatten())
            all_presence_pred.extend(predicted_presence.cpu().numpy().flatten())
            all_pose_true.extend(pose.cpu().numpy().flatten())
            all_pose_pred.extend(predicted_pose.cpu().numpy().flatten())
    
    # Convert lists to numpy arrays
    all_presence_true = np.array(all_presence_true)
    all_presence_pred = np.array(all_presence_pred)
    all_pose_true = np.array(all_pose_true)
    all_pose_pred = np.array(all_pose_pred)
    
    # Debug information
    print(f"Shape of presence true: {all_presence_true.shape}")
    print(f"Shape of presence pred: {all_presence_pred.shape}")
    print(f"Shape of pose true: {all_pose_true.shape}")
    print(f"Shape of pose pred: {all_pose_pred.shape}")
    
    # Calculate metrics for human presence detection
    presence_accuracy = (all_presence_true == all_presence_pred).mean() * 100
    print(f"\nHuman Presence Detection Results:")
    print(f"Accuracy: {presence_accuracy:.2f}%")
    
    # Calculate confusion matrix for human presence
    presence_cm = confusion_matrix(all_presence_true, all_presence_pred)
    
    # Plot confusion matrix for human presence
    plt.figure(figsize=(8, 6))
    sns.heatmap(presence_cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix - Human Presence Detection')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.savefig('presence_confusion_matrix.png')
    plt.close()
    
    # Calculate metrics for pose classification (only for samples where human is present)
    # Make sure we're using boolean indexing correctly
    human_present_indices = np.where(all_presence_true == 1)[0]
    
    if len(human_present_indices) > 0:
        # Use integer indexing instead of boolean masking
        pose_true_filtered = np.array([all_pose_true[i] for i in human_present_indices])
        pose_pred_filtered = np.array([all_pose_pred[i] for i in human_present_indices])
        
        pose_accuracy = (pose_true_filtered == pose_pred_filtered).mean() * 100
        print(f"\nPose Classification Results (when human is present):")
        print(f"Accuracy: {pose_accuracy:.2f}%")
        print(f"Number of samples with human present: {len(pose_true_filtered)}")
        
        # Print detailed classification report
        pose_names = ['Stand', 'Sit', 'Kneel', 'Sleep']
        print("\nDetailed Pose Classification Report:")
        print(classification_report(
            pose_true_filtered, 
            pose_pred_filtered,
            target_names=pose_names,
            zero_division=0
        ))
        
        # Calculate and plot confusion matrix for poses
        pose_cm = confusion_matrix(pose_true_filtered, pose_pred_filtered, labels=range(len(pose_names)))
        plt.figure(figsize=(10, 8))
        sns.heatmap(pose_cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=pose_names, yticklabels=pose_names)
        plt.title('Confusion Matrix - Pose Classification')
        plt.ylabel('True Pose')
        plt.xlabel('Predicted Pose')
        plt.savefig('pose_confusion_matrix.png')
        plt.close()
    else:
        print("\nNo samples with humans present found in the test set")

if __name__ == "__main__":
    validate_model()
