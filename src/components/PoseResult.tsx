
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type PoseType = "Stand" | "Sit" | "Kneel" | "Sleep";

interface PoseResultProps {
  humanPresent: boolean | null;
  pose: PoseType | null;
}

const PoseResult: React.FC<PoseResultProps> = ({ humanPresent, pose }) => {
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
      </div>
    </Card>
  );
};

export default PoseResult;
