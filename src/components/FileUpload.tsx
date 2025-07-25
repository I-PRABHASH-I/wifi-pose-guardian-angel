
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onSampleData: () => void;
  isProcessing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onSampleData, isProcessing }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload CSI Data</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Upload a CSV file containing WiFi Channel State Information (CSI) data.
        The file should contain a 200×128 tensor.
      </p>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="dropzone-file" 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-center">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">.CSV file only</p>
            </div>
            <input 
              id="dropzone-file" 
              type="file" 
              className="hidden" 
              accept=".csv" 
              onChange={handleFileChange}
            />
          </label>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedFile && (
            <div className="flex-1 text-sm truncate">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </div>
          )}
          <Button 
            onClick={onSampleData}
            disabled={isProcessing} 
            variant="outline"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                Loading
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </span>
            ) : (
              "Sample Data"
            )}
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isProcessing} 
            className="ml-auto"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                Processing
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Predict <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;
