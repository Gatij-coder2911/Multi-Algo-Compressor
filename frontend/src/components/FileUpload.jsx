import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X } from "lucide-react";



const FileUpload = ({uploadedFile , onFileUpload}) => {
  const [isUploading,setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  setError("");
  if(file){
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(()=>{
      setUploadProgress((prev)=>{
        if(prev>=100){
          clearInterval(interval);
          setIsUploading(false);
          console.log(file);
          onFileUpload(file);
          return 100;
        }
        return prev+10;
      })
    },100);
  }
};

const removeFile = () => {
  onFileUpload(null)
  setUploadProgress(0)
  setError("")
};
return(
        <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">File Upload</CardTitle>
            <CardDescription>Select a file to compress or decompress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

             {/* {Upload Button} */}
             <div className="relative">
               <input
                type="file"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={isUploading}
               />
             <Button
                variant="outline"
                className="w-full h-20 border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 transition-colors"
                disabled={isUploading}
              > 
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-6 w-6 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {isUploading ? "Uploading...." : "Click to Upload File"}
                </span>
              </div>
              </Button>
            </div>

            {/* Progress Bar */}
            { isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Uploading....</span>
                    <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                </div> 
                )}

                {/* File Preview */}
             {uploadedFile && !isUploading && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                      <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
                      <p className="text-xs text-green-600">Size: {(uploadedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-green-700 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
             </div>
             )}

             {/* Error Message */}
             {
              error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                   <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

          </CardContent>
        </Card>
    );
};

export default FileUpload;