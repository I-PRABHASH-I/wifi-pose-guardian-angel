
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; 

export type PoseType = "Stand" | "Sit" | "Kneel" | "Sleep";

interface PoseResultProps {
  humanPresent: boolean | null;
  pose: PoseType | null;
  // Add optional confidence values for each pose type
  poseConfidence?: {
    Stand?: number;
    Sit?: number;
    Kneel?: number;
    Sleep?: number;
  };
}

const PoseResult: React.FC<PoseResultProps> = ({ 
  humanPresent, 
  pose, 
  poseConfidence = {} 
}) => {
  const getPoseColor = (pose: PoseType | null): string => {
    switch (pose) {
      case "Stand":
        return "bg-blue-600 hover:bg-blue-700";
      case "Sit":
        return "bg-purple-600 hover:bg-purple-700";
      case "Kneel":
        return "bg-pink-600 hover:bg-pink-700";
      case "Sleep":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  const getPoseColorVariable = (pose: PoseType): string => {
    switch (pose) {
      case "Stand": return "hsl(var(--pose-stand))";
      case "Sit": return "hsl(var(--pose-sit))";
      case "Kneel": return "hsl(var(--pose-kneel))";
      case "Sleep": return "hsl(var(--pose-sleep))";
      default: return "hsl(var(--muted))";
    }
  };

  // Available pose types in order
  const poseTypes: PoseType[] = ["Stand", "Sit", "Kneel", "Sleep"];

  return (
    <Card className="p-6 shadow-md h-full">
      <h2 className="text-2xl font-semibold mb-6">Detection Results</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Human Presence</h3>
          <div className="flex items-center">
            {humanPresent === null ? (
              <Badge variant="outline" className="text-lg py-1 px-3">
                No data
              </Badge>
            ) : (
              <Badge 
                variant={humanPresent ? "default" : "destructive"}
                className={`text-lg py-1 px-3 ${humanPresent ? "bg-info animate-pulse-gentle" : ""}`}
              >
                {humanPresent ? "Present" : "Not Detected"}
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Detected Pose</h3>
          <div className="flex items-center">
            {pose === null ? (
              <Badge variant="outline" className="text-lg py-1 px-3">
                No data
              </Badge>
            ) : (
              <Badge className={`text-lg py-1 px-3 ${getPoseColor(pose)}`}>
                {pose}
              </Badge>
            )}
          </div>
        </div>

        {/* Add confidence levels section */}
        {Object.keys(poseConfidence).length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Pose Confidence</h3>
            <div className="space-y-3">
              {poseTypes.map((poseType) => (
                <div key={poseType} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{poseType}</span>
                    <span>{`${Math.round((poseConfidence[poseType] || 0) * 100)}%`}</span>
                  </div>
                  <Progress 
                    value={(poseConfidence[poseType] || 0) * 100} 
                    className="h-2"
                    style={{ 
                      '--progress-background': getPoseColorVariable(poseType)
                    } as React.CSSProperties} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PoseResult;
