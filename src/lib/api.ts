
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

// Configuration for API endpoint
const API_CONFIG = {
  baseUrl: 'http://localhost:5000',  // Flask server URL
};

// Function to send the CSV to the Flask backend for prediction
export async function predictFromCSV(file: File): Promise<PredictionResult> {
  try {
    // Create form data to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Send request to the Flask API
    const response = await fetch(`${API_CONFIG.baseUrl}/infer`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Parse and return the prediction result
    const result = await response.json();
    return result as PredictionResult;
  } catch (error) {
    console.error('Error predicting from CSV:', error);
    throw error;
  }
}
