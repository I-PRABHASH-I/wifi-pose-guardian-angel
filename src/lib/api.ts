
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

// Generate mock keypoints for visualization
function generateMockKeypoints(pose: PoseType): Point[] {
  const keypoints: Point[] = [];
  const basePositions = {
    Stand: { x: 300, y: 150 },
    Sit: { x: 300, y: 200 },
    Kneel: { x: 300, y: 180 },
    Sleep: { x: 300, y: 250 }
  };
  
  const base = basePositions[pose];
  
  // Generate 17 keypoints (standard human pose estimation)
  for (let i = 0; i < 17; i++) {
    keypoints.push({
      x: base.x + (Math.random() - 0.5) * 100,
      y: base.y + (Math.random() - 0.5) * 150
    });
  }
  
  return keypoints;
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
