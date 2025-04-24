import { PoseType } from "@/components/PoseResult";

interface Point {
  x: number;
  y: number;
}

interface PredictionResult {
  human_present: boolean;
  pose_class: PoseType;
  keypoints: Point[];
}

// Configuration for model path
const MODEL_CONFIG = {
  modelPath: 'backend/models/pose_lstm.pth',  // Path to your trained LSTM model
  csvPath: 'backend/data'  // Path for CSV files
};

// This is a mock API function that would normally send the CSV to a Flask backend
export async function predictFromCSV(file: File): Promise<PredictionResult> {
  // In a real implementation, this would post to the Flask API:
  // const formData = new FormData();
  // formData.append('file', file);
  // const response = await fetch('http://localhost:5000/infer', {
  //   method: 'POST',
  //   body: formData,
  //   headers: {
  //     'Model-Path': MODEL_CONFIG.modelPath,
  //   }
  // });
  // return await response.json();
  
  // For now, simulate API call with a delay and return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random pose for demonstration
      const poses: PoseType[] = ["Stand", "Sit", "Kneel", "Sleep"];
      const randomPose = poses[Math.floor(Math.random() * poses.length)];
      
      // Return mock data
      resolve({
        human_present: true,
        pose_class: randomPose,
        keypoints: generateMockKeypoints(randomPose)
      });
    }, 2000); // Simulate 2-second processing time
  });
}

// Helper to generate mock keypoints based on pose
function generateMockKeypoints(pose: PoseType): Point[] {
  switch (pose) {
    case "Stand":
      return [
        { x: 0.5, y: 0.1 },  // Head
        { x: 0.5, y: 0.2 },  // Neck
        { x: 0.5, y: 0.3 },  // Spine
        { x: 0.5, y: 0.45 }, // Pelvis
        { x: 0.5, y: 0.5 },  // Tailbone
        { x: 0.6, y: 0.2 },  // Right shoulder
        { x: 0.65, y: 0.35 }, // Right elbow
        { x: 0.4, y: 0.2 },  // Left shoulder
        { x: 0.35, y: 0.35 }, // Left elbow
        { x: 0.7, y: 0.5 },  // Right hand
        { x: 0.7, y: 0.5 },  // Right fingers
        { x: 0.3, y: 0.5 },  // Left hand
        { x: 0.3, y: 0.5 },  // Left fingers
        { x: 0.55, y: 0.6 }, // Right hip
        { x: 0.55, y: 0.75 }, // Right knee
        { x: 0.55, y: 0.9 }, // Right ankle
        { x: 0.45, y: 0.6 }, // Left hip
        { x: 0.45, y: 0.75 }, // Left knee
        { x: 0.45, y: 0.9 }  // Left ankle
      ];
    case "Sit":
      return [
        { x: 0.5, y: 0.2 },  // Head
        { x: 0.5, y: 0.3 },  // Neck
        { x: 0.5, y: 0.4 },  // Spine
        { x: 0.5, y: 0.5 },  // Pelvis
        { x: 0.5, y: 0.5 },  // Tailbone
        { x: 0.6, y: 0.3 },  // Right shoulder
        { x: 0.65, y: 0.4 }, // Right elbow
        { x: 0.4, y: 0.3 },  // Left shoulder
        { x: 0.35, y: 0.4 }, // Left elbow
        { x: 0.7, y: 0.5 },  // Right hand
        { x: 0.7, y: 0.5 },  // Right fingers
        { x: 0.3, y: 0.5 },  // Left hand
        { x: 0.3, y: 0.5 },  // Left fingers
        { x: 0.55, y: 0.5 }, // Right hip
        { x: 0.6, y: 0.7 },  // Right knee
        { x: 0.5, y: 0.9 },  // Right ankle
        { x: 0.45, y: 0.5 }, // Left hip
        { x: 0.4, y: 0.7 },  // Left knee
        { x: 0.5, y: 0.9 }   // Left ankle
      ];
    case "Kneel":
      return [
        { x: 0.5, y: 0.2 },  // Head
        { x: 0.5, y: 0.3 },  // Neck
        { x: 0.5, y: 0.4 },  // Spine
        { x: 0.5, y: 0.5 },  // Pelvis
        { x: 0.5, y: 0.55 }, // Tailbone
        { x: 0.6, y: 0.3 },  // Right shoulder
        { x: 0.7, y: 0.4 },  // Right elbow
        { x: 0.4, y: 0.3 },  // Left shoulder
        { x: 0.3, y: 0.4 },  // Left elbow
        { x: 0.75, y: 0.5 }, // Right hand
        { x: 0.8, y: 0.5 },  // Right fingers
        { x: 0.25, y: 0.5 }, // Left hand
        { x: 0.2, y: 0.5 },  // Left fingers
        { x: 0.55, y: 0.55 }, // Right hip
        { x: 0.55, y: 0.75 }, // Right knee
        { x: 0.7, y: 0.9 },  // Right ankle
        { x: 0.45, y: 0.55 }, // Left hip
        { x: 0.45, y: 0.75 }, // Left knee
        { x: 0.3, y: 0.9 }   // Left ankle
      ];
    case "Sleep":
      return [
        { x: 0.1, y: 0.5 },  // Head
        { x: 0.2, y: 0.5 },  // Neck
        { x: 0.4, y: 0.5 },  // Spine
        { x: 0.6, y: 0.5 },  // Pelvis
        { x: 0.7, y: 0.5 },  // Tailbone
        { x: 0.2, y: 0.4 },  // Right shoulder
        { x: 0.3, y: 0.35 }, // Right elbow
        { x: 0.2, y: 0.6 },  // Left shoulder
        { x: 0.3, y: 0.65 }, // Left elbow
        { x: 0.4, y: 0.3 },  // Right hand
        { x: 0.45, y: 0.25 }, // Right fingers
        { x: 0.4, y: 0.7 },  // Left hand
        { x: 0.45, y: 0.75 }, // Left fingers
        { x: 0.6, y: 0.45 }, // Right hip
        { x: 0.75, y: 0.4 }, // Right knee
        { x: 0.9, y: 0.4 },  // Right ankle
        { x: 0.6, y: 0.55 }, // Left hip
        { x: 0.75, y: 0.6 }, // Left knee
        { x: 0.9, y: 0.6 }   // Left ankle
      ];
    default:
      return Array(19).fill({ x: 0.5, y: 0.5 });
  }
}
