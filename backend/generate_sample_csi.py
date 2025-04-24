
import numpy as np
import pandas as pd
from scipy.signal import butter, filtfilt

def generate_csi_sample(pose, noise_level=0.1):
    """Generate a single CSI sample for a specific pose."""
    num_subcarriers = 30
    x = np.linspace(0, 2*np.pi, num_subcarriers)
    
    if pose == "no_human":
        # Generate background noise when no human is present
        pattern = np.random.normal(0, 0.1, num_subcarriers)
    elif pose == "stand":
        pattern = 2.0 * np.sin(x) + 0.5 * np.cos(2*x)
    elif pose == "sit":
        pattern = 1.5 * np.sin(x + np.pi/4) + 0.8 * np.cos(3*x)
    elif pose == "kneel":
        pattern = 1.2 * np.sin(2*x) + 0.6 * np.cos(x + np.pi/3)
    elif pose == "sleep":
        pattern = 0.8 * np.sin(3*x) + 1.0 * np.cos(x + np.pi/6)
    
    # Add random variations
    if pose != "no_human":
        pattern += np.random.normal(0, noise_level, num_subcarriers)
    
    # Apply butterworth filter to smooth the pattern
    b, a = butter(3, 0.1)
    pattern = filtfilt(b, a, pattern)
    
    return pattern

def create_sample_file(pose, num_samples=10):
    """Create a CSV file with multiple samples for a specific pose."""
    all_samples = []
    
    for _ in range(num_samples):
        csi_pattern = generate_csi_sample(pose)
        all_samples.append(csi_pattern)
    
    # Convert to numpy array
    all_samples = np.array(all_samples)
    
    # Create DataFrame
    csi_columns = [f'subcarrier_{i}' for i in range(30)]
    df = pd.DataFrame(all_samples, columns=csi_columns)
    
    # Add presence and pose columns
    df['presence'] = 1 if pose != "no_human" else 0
    df['pose'] = {'stand': 0, 'sit': 1, 'kneel': 2, 'sleep': 3, 'no_human': 0}[pose]
    
    # Save to CSV
    filename = f'sample_csi_{pose}.csv'
    df.to_csv(filename, index=False)
    print(f"Generated {filename} with {num_samples} samples")

def main():
    # Create sample files for each pose and no-human scenario
    poses = ['stand', 'sit', 'kneel', 'sleep', 'no_human']
    
    for pose in poses:
        create_sample_file(pose, num_samples=10)
        
    print("\nAll sample files have been generated!")
    print("You can now upload these files to the website to test different scenarios.")

if __name__ == "__main__":
    main()
