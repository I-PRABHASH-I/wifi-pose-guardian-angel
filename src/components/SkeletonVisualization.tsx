
import React from "react";
import { Card } from "@/components/ui/card";
import { PoseType } from "./PoseResult";

// Define the connections between skeleton joints
const SKELETON_CONNECTIONS = [
  // Head and torso connections
  [0, 1], [1, 2], [2, 3], [3, 4],  // Spine
  [1, 5], [5, 6],  // Right shoulder to right elbow
  [1, 7], [7, 8],  // Left shoulder to left elbow
  [6, 9], [9, 10], // Right elbow to right wrist
  [8, 11], [11, 12], // Left elbow to left wrist
  
  // Hip and leg connections
  [3, 13], [13, 14], [14, 15], // Right hip to ankle
  [3, 16], [16, 17], [17, 18], // Left hip to ankle
];

interface Point {
  x: number;
  y: number;
}

interface SkeletonVisualizationProps {
  joints: Point[] | null;
  pose: PoseType | null;
}

const SkeletonVisualization: React.FC<SkeletonVisualizationProps> = ({ joints, pose }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const width = 300;
  const height = 400;
  
  // Get color based on pose type
  const getPoseColor = (pose: PoseType | null): string => {
    switch (pose) {
      case "Stand":
        return "#2563eb"; // blue-600
      case "Sit":
        return "#9333ea"; // purple-600
      case "Kneel":
        return "#db2777"; // pink-600
      case "Sleep":
        return "#059669"; // green-600
      default:
        return "#4b5563"; // gray-600
    }
  };
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !joints) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set line style
    ctx.lineWidth = 3;
    ctx.strokeStyle = getPoseColor(pose);
    
    // Draw connections
    SKELETON_CONNECTIONS.forEach(([i, j]) => {
      if (i < joints.length && j < joints.length) {
        ctx.beginPath();
        // Scale the normalized coordinates to the canvas size
        ctx.moveTo(joints[i].x * width, joints[i].y * height);
        ctx.lineTo(joints[j].x * width, joints[j].y * height);
        ctx.stroke();
      }
    });
    
    // Draw joints
    joints.forEach((joint) => {
      ctx.beginPath();
      ctx.arc(joint.x * width, joint.y * height, 5, 0, 2 * Math.PI);
      ctx.fillStyle = getPoseColor(pose);
      ctx.fill();
    });
  }, [joints, pose]);
  
  // Create placeholder joints for demo when no real data is available
  const createPlaceholderJoints = (pose: PoseType | null): Point[] => {
    if (!pose) {
      // Default standing pose
      return Array(19).fill({ x: 0.5, y: 0.5 });
    }
    
    const baseSkeleton = Array(19).fill({ x: 0.5, y: 0.5 });
    
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
        return baseSkeleton;
    }
  };
  
  const displayJoints = joints || createPlaceholderJoints(pose);
  
  return (
    <Card className="p-6 shadow-md h-full">
      <h2 className="text-2xl font-semibold mb-6">Pose Skeleton</h2>
      
      <div className="flex items-center justify-center">
        <div className="relative border border-border rounded-md bg-secondary/20">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="mx-auto"
          />
          
          {!joints && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground text-center px-4 animate-skeleton-fade">
                {pose ? "Example skeleton. Upload data for actual prediction." : "No skeleton data available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SkeletonVisualization;
