
import { PoseType } from "@/components/PoseResult";

interface Point {
  x: number;
  y: number;
}

interface PredictionResult {
  human_present: boolean;
  pose_class: PoseType;
  keypoints: Point[];
  confidence?: {
    Stand: number;
    Sit: number;
    Kneel: number;
    Sleep: number;
  };
}

// Mock data for demo purposes
const MOCK_POSES: PoseType[] = ['Stand', 'Sit', 'Kneel', 'Sleep'];

// Generate realistic mock keypoints based on pose type
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
      // Default standing pose
      return Array(19).fill({ x: 0.5, y: 0.5 });
  }
}

// Function to simulate CSV prediction with mock data
export async function predictFromCSV(file: File): Promise<PredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate random prediction
  const randomPose = MOCK_POSES[Math.floor(Math.random() * MOCK_POSES.length)];
  const humanPresent = Math.random() > 0.1; // 90% chance of human being present
  
  return {
    human_present: humanPresent,
    pose_class: randomPose,
    keypoints: generateMockKeypoints(randomPose),
    confidence: {
      Stand: Math.random() * 0.4 + (randomPose === 'Stand' ? 0.6 : 0.1),
      Sit: Math.random() * 0.4 + (randomPose === 'Sit' ? 0.6 : 0.1),
      Kneel: Math.random() * 0.4 + (randomPose === 'Kneel' ? 0.6 : 0.1),
      Sleep: Math.random() * 0.4 + (randomPose === 'Sleep' ? 0.6 : 0.1)
    }
  };
}

// Function to generate sample data without file upload
export async function generateSampleData(): Promise<PredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const poses: PoseType[] = ['Stand', 'Sit', 'Kneel', 'Sleep'];
  const selectedPose = poses[Math.floor(Math.random() * poses.length)];
  
  return {
    human_present: true,
    pose_class: selectedPose,
    keypoints: generateMockKeypoints(selectedPose),
    confidence: {
      Stand: Math.random() * 0.3 + (selectedPose === 'Stand' ? 0.7 : 0.1),
      Sit: Math.random() * 0.3 + (selectedPose === 'Sit' ? 0.7 : 0.1),
      Kneel: Math.random() * 0.3 + (selectedPose === 'Kneel' ? 0.7 : 0.1),
      Sleep: Math.random() * 0.3 + (selectedPose === 'Sleep' ? 0.7 : 0.1)
    }
  };
}
