
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Define the LSTM Model
class LSTM_Model(nn.Module):
    def __init__(self, input_size=30, hidden_size=64, num_layers=2, num_classes=4):
        super(LSTM_Model, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc1 = nn.Linear(hidden_size, 32)
        self.fc2 = nn.Linear(32, num_classes + 1)  # +1 for presence detection
        self.relu = nn.ReLU()
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # Initialize hidden state with zeros
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        
        # Forward propagate LSTM
        out, _ = self.lstm(x, (h0, c0))
        
        # Decode the hidden state of the last time step
        out = out[:, -1, :]
        out = self.relu(self.fc1(out))
        out = self.fc2(out)
        
        # Split output into presence and pose
        presence = self.sigmoid(out[:, 0])
        pose = out[:, 1:]
        
        return presence, pose

# Custom Dataset class
class CSIDataset(Dataset):
    def __init__(self, csv_file):
        data = pd.read_csv(csv_file)
        # Updated to use 'subcarrier_X' columns instead of 'csi_X'
        self.csi_data = torch.FloatTensor(data.iloc[:, :-2].values)  # All columns except last two
        self.presence = torch.FloatTensor(data.iloc[:, -2].values)   # Second-to-last column
        self.pose = torch.LongTensor(data.iloc[:, -1].values)       # Last column

    def __len__(self):
        return len(self.csi_data)

    def __getitem__(self, idx):
        return self.csi_data[idx], self.presence[idx], self.pose[idx]

def train_model():
    # Set random seed for reproducibility
    torch.manual_seed(42)
    
    # Hyperparameters
    input_size = 30  # CSI data dimensions (number of subcarriers)
    hidden_size = 64
    num_layers = 2
    num_classes = 4  # Number of pose classes
    num_epochs = 50
    batch_size = 32
    learning_rate = 0.001
    
    # Load the dataset
    print("Loading dataset...")
    dataset = CSIDataset("dataset.csv")
    
    # Split into train and validation sets
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    
    # Initialize the model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = LSTM_Model(input_size, hidden_size, num_layers, num_classes).to(device)
    
    # Loss and optimizer
    presence_criterion = nn.BCELoss()
    pose_criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
    
    # Training loop
    print("Starting training...")
    train_losses = []
    val_losses = []
    
    for epoch in range(num_epochs):
        model.train()
        total_train_loss = 0
        
        for batch_idx, (csi, presence, pose) in enumerate(train_loader):
            csi, presence, pose = csi.to(device), presence.to(device), pose.to(device)
            
            # Forward pass
            presence_pred, pose_pred = model(csi)
            
            # Calculate loss
            presence_loss = presence_criterion(presence_pred, presence)
            pose_loss = pose_criterion(pose_pred, pose)
            loss = presence_loss + pose_loss
            
            # Backward and optimize
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            total_train_loss += loss.item()
            
        avg_train_loss = total_train_loss / len(train_loader)
        train_losses.append(avg_train_loss)
        
        # Validation
        model.eval()
        total_val_loss = 0
        correct_presence = 0
        correct_pose = 0
        total_samples = 0
        
        with torch.no_grad():
            for csi, presence, pose in val_loader:
                csi, presence, pose = csi.to(device), presence.to(device), pose.to(device)
                
                # Forward pass
                presence_pred, pose_pred = model(csi)
                
                # Calculate loss
                presence_loss = presence_criterion(presence_pred, presence)
                pose_loss = pose_criterion(pose_pred, pose)
                loss = presence_loss + pose_loss
                
                total_val_loss += loss.item()
                
                # Calculate accuracy
                predicted_presence = (presence_pred > 0.5).float()
                _, predicted_pose = torch.max(pose_pred, 1)
                
                correct_presence += (predicted_presence == presence).sum().item()
                correct_pose += (predicted_pose == pose).sum().item()
                total_samples += presence.size(0)
        
        avg_val_loss = total_val_loss / len(val_loader)
        val_losses.append(avg_val_loss)
        
        presence_accuracy = 100 * correct_presence / total_samples
        pose_accuracy = 100 * correct_pose / total_samples
        
        print(f'Epoch [{epoch+1}/{num_epochs}], '
              f'Train Loss: {avg_train_loss:.4f}, '
              f'Val Loss: {avg_val_loss:.4f}, '
              f'Presence Acc: {presence_accuracy:.2f}%, '
              f'Pose Acc: {pose_accuracy:.2f}%')
    
    # Save the model
    torch.save(model.state_dict(), 'pose_detection_model.pth')
    
    # Plot training and validation loss
    plt.figure(figsize=(10, 6))
    plt.plot(train_losses, label='Training Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training and Validation Loss')
    plt.legend()
    plt.savefig('training_loss.png')
    plt.close()

if __name__ == "__main__":
    train_model()

