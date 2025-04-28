
import numpy as np
import pandas as pd
from scipy.signal import butter, filtfilt

def generate_csi_sample(pose, noise_level=0.1):
    """Generate a single CSI sample for a specific pose."""
    # ... keep existing code (CSI pattern generation function)

def create_sample_file(poses, num_samples_per_pose=10):
    """Create a CSV file with multiple samples for all poses, shuffled."""
    all_samples = []
    all_labels = []
    
    # Generate samples for each pose
    for pose in poses:
        for _ in range(num_samples_per_pose):
            csi_pattern = generate_csi_sample(pose)
            all_samples.append(csi_pattern)
            all_labels.append({
                'presence': 1 if pose != "no_human" else 0,
                'pose': {'stand': 0, 'sit': 1, 'kneel': 2, 'sleep': 3, 'no_human': 0}[pose]
            })
    
    # Convert to numpy arrays
    all_samples = np.array(all_samples)
    
    # Create DataFrame
    csi_columns = [f'subcarrier_{i}' for i in range(30)]
    df = pd.DataFrame(all_samples, columns=csi_columns)
    
    # Add presence and pose columns
    df['presence'] = [label['presence'] for label in all_labels]
    df['pose'] = [label['pose'] for label in all_labels]
    
    # Shuffle the dataset
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    # Save to CSV
    filename = 'sample_csi_all.csv'
    df.to_csv(filename, index=False)
    print(f"Generated {filename} with {len(df)} samples (shuffled)")

def main():
    # Create sample files for each pose and no-human scenario
    poses = ['stand', 'sit', 'kneel', 'sleep', 'no_human']
    create_sample_file(poses, num_samples_per_pose=10)
    print("\nShuffled sample file has been generated!")
    print("You can now upload this file to the website to test different scenarios.")

if __name__ == "__main__":
    main()

