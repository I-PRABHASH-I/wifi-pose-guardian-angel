
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/FileUpload";
import PoseResult, { PoseType } from "@/components/PoseResult";
import SkeletonVisualization from "@/components/SkeletonVisualization";
import { predictFromCSV } from "@/lib/api";

interface Point {
  x: number;
  y: number;
}

const Index = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [humanPresent, setHumanPresent] = useState<boolean | null>(null);
  const [pose, setPose] = useState<PoseType | null>(null);
  const [joints, setJoints] = useState<Point[] | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid file",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Call the API (currently mocked in api.ts)
      const result = await predictFromCSV(file);
      
      // Update state with results
      setHumanPresent(result.human_present);
      setPose(result.pose_class);
      setJoints(result.keypoints);
      
      toast({
        title: "Prediction complete",
        description: `Detected pose: ${result.pose_class}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction failed",
        description: "An error occurred while processing the file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 border-b border-border">
        <div className="container">
          <h1 className="text-3xl font-bold text-primary">WiFi Pose Guardian</h1>
          <p className="text-muted-foreground">Privacy-preserving human pose detection through WiFi sensing</p>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 animate-fade-up">
            <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
          </div>
          
          <div className="md:col-span-1 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <PoseResult humanPresent={humanPresent} pose={pose} />
          </div>
          
          <div className="md:col-span-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <SkeletonVisualization joints={joints} pose={pose} />
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>WiFi Pose Guardian — Privacy-preserving human monitoring</p>
          <p className="mt-2">Using Channel State Information (CSI) data for non-invasive detection</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
