
import numpy as np
import pandas as pd
from scipy.signal import butter, filtfilt
import random

def generate_synthetic_csi(num_samples=1000):
    # Parameters
    num_subcarriers = 30  # Number of CSI subcarriers
    noise_level = 0.1    # Amount of noise to add
    
    # Lists to store all data
    all_csi_data = []
    all_presence = []
    all_poses = []
    
    # Define pose-specific CSI patterns
    def generate_pose_pattern(pose, presence):
        if not presence:
            # Generate background noise when no human is present
            return np.random.normal(0, 0.1, num_subcarriers)
        
        # Base pattern
        x = np.linspace(0, 2*np.pi, num_subcarriers)
        
        if pose == 0:  # Standing
            pattern = 2.0 * np.sin(x) + 0.5 * np.cos(2*x)
        elif pose == 1:  # Sitting
            pattern = 1.5 * np.sin(x + np.pi/4) + 0.8 * np.cos(3*x)
        elif pose == 2:  # Kneeling
            pattern = 1.2 * np.sin(2*x) + 0.6 * np.cos(x + np.pi/3)
        else:  # Sleeping
            pattern = 0.8 * np.sin(3*x) + 1.0 * np.cos(x + np.pi/6)
        
        # Add random variations
        pattern += np.random.normal(0, noise_level, num_subcarriers)
        
        return pattern
    
    # Generate samples for each pose
    for _ in range(num_samples):
        # Randomly decide presence (70% chance of human present)
        presence = random.random() < 0.7
        
        if presence:
            # Generate pose only if human is present
            pose = random.randint(0, 3)  # 0:Stand, 1:Sit, 2:Kneel, 3:Sleep
        else:
            pose = 0  # Default pose when no human present
        
        # Generate CSI pattern
        csi_pattern = generate_pose_pattern(pose, presence)
        
        # Apply butterworth filter to smooth the pattern
        b, a = butter(3, 0.1)
        csi_pattern = filtfilt(b, a, csi_pattern)
        
        # Store the data
        all_csi_data.append(csi_pattern)
        all_presence.append(int(presence))
        all_poses.append(pose)
    
    # Convert to numpy arrays
    all_csi_data = np.array(all_csi_data)
    all_presence = np.array(all_presence)
    all_poses = np.array(all_poses)
    
    # Create DataFrame
    csi_columns = [f'subcarrier_{i}' for i in range(num_subcarriers)]
    df = pd.DataFrame(all_csi_data, columns=csi_columns)
    
    # Add presence and pose columns
    df['presence'] = all_presence
    df['pose'] = all_poses
    
    # Save to CSV
    df.to_csv('dataset.csv', index=False)
    print(f"Generated {num_samples} synthetic CSI samples and saved to dataset.csv")
    
    # Print some statistics
    print("\nDataset Statistics:")
    print(f"Total samples: {num_samples}")
    print(f"Samples with human present: {sum(all_presence)}")
    print("\nPose distribution (when human present):")
    present_poses = all_poses[all_presence == 1]
    for pose_id in range(4):
        count = sum(present_poses == pose_id)
        print(f"Pose {pose_id}: {count} samples ({100 * count / len(present_poses):.1f}%)")

if __name__ == "__main__":
    generate_synthetic_csi(num_samples=1000)
