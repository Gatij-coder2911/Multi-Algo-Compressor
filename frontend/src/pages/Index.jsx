import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { Download } from "lucide-react";
import Compression from "../components/Compression";
import AlgorithmInfo from "../components/AlgorithmInfo";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Index = () => {
const [uploadedFile, setUploadedFile] = useState(null);
const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
 const [compressionStats, setCompressionStats] = useState({
    originalSize: 0,
    compressedSize: 0,
    compressionRatio: 0,
    processingTime: 0,
  });
const [processedFile, setProcessedFile] = useState(null);
const [isLoading, setIsLoading] = useState(false);

 
              /* HandleCompress */

const handleCompress = async() => {
    if(!uploadedFile || !selectedAlgorithm){
        alert("Please select a file and algorithm first!");
      return;
    }
  const formData = new FormData();
  formData.append("file", uploadedFile);
  formData.append("operation", "compress");
  formData.append("algorithm", selectedAlgorithm);

   try {
    setIsLoading(true);
    const response = await fetch(`${BACKEND_URL}/process`, {
      method: "POST",
      body: formData,
    });
  if (!response.ok) throw new Error("Compression failed");

  // const blob = await response.json();
  //      const originalSize = uploadedFile.size;
  //      const compressedSize = blob.size ;
  //      const ratio = ((originalSize - compressedSize) / originalSize) * 100;
  //      const processtime = blob.time;

  const data=await response.json()

    setCompressionStats({
      originalSize: data.original_size_bytes,
      compressedSize: data.output_size_bytes,
      compressionRatio: data.compression_ratio,
      processingTime: data.processing_time_sec
    });
   setProcessedFile({
      name: data.output_filename,
      url: data.download_url,
      type: "compressed",
    });
  }catch (error) {
          alert(error.message);
  }finally{
    setIsLoading(false);
  }
};


const handleDecompress = async() => {
    if (!uploadedFile || !selectedAlgorithm) {
      alert("Please select a file and algorithm first!");
      return;
    }
  const formData = new FormData();
  formData.append("file",uploadedFile);
  formData.append("operation","decompress");
  formData.append("algorithm",selectedAlgorithm);

  try{ 
    setIsLoading(true);
    const response = await fetch(`${BACKEND_URL}/process`,
      {
        method:"POST",
        body:formData,

      }
    );
if (!response.ok) throw new Error("Decompression failed");

    const data=await response.json();

    setProcessedFile({
      name: data.output_filename,
      url: data.download_url,
      type: "decompressed",
    });

    setCompressionStats({
      originalSize: data.original_size_bytes,
      compressedSize: data.output_size_bytes,
      compressionRatio: data.compression_ratio,
      processingTime: data.processing_time_sec
    });
  } catch (err) {
    console.error("Error decompressing file:", err);
    alert("Decompression failed");
  } finally{
    setIsLoading(false);
  }
}

const handleDownload = () =>{
    if(!processedFile || !processedFile.url) return ;
    
    const link = document.createElement('a');
    link.href = processedFile.url;
    link.download = processedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
};



return (
  <>
    {isLoading && (
      <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-xl font-medium text-gray-700">Processing...</p>
      </div>
    )}
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
            { /* Header Section */}
            <div className="text-center space-y-4 px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
                     Data Compression & Decompression Portal
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Compress and decompress files using smart algorithms like Huffman, RLE and LZ77.
                </p>
            </div>
            { /* Main Section */}
            <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
                {/* {left Coloum} */}
                 <div className="space-y-6">
                    <FileUpload
                      uploadedFile={uploadedFile}
                      onFileUpload={setUploadedFile}
                    />


                    {/* Algorithm Selection & Controls */}
                    <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
                        <CardHeader>
                           <CardTitle className="text-xl font-semibold">Algorithm & Controls</CardTitle>
                           <CardDescription>Select compression algorithm and execute operations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Algorithm Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="algorithm" className="text-sm font-medium">
                                    Select Algorithm
                                </Label>
                                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                                 <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Choose compression algorithm" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="huffman">Huffman Coding</SelectItem>
                                  <SelectItem value="rle">Run-Length Encoding (RLE)</SelectItem>
                                  <SelectItem value="lz77">LZ77</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <Button
                                  onClick={handleCompress}
                                   size="lg"
                                   className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                                   disabled={!uploadedFile || !selectedAlgorithm}
                                >
                                    Compress
                                </Button>
                                <Button
                                  onClick={handleDecompress}
                                   variant="outline"
                                   size="lg"
                                   className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                                   disabled={!uploadedFile || !selectedAlgorithm}
                                >
                                    Decompress
                                </Button>
                            </div>

                            {processedFile && (
                                 <div className="pt-4 border-t border-gray-200">
                                    <Button
                                       onClick={handleDownload}
                                       size="lg"
                                       className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
                                       >
                                        <Download className="h-5 w-5 mr-2"/>
                                        Download {processedFile.type === "compressed" ? "Compressed" : "Decompressed"} File
                                    </Button>
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                      Ready to download: {processedFile.name}
                                    </p>
                                 </div>
                            )}
                        </CardContent>
                    </Card>
                 </div>

                 {/* Right Column */}
                 <div className=" space-y-6">
                   {/* Compression Stats */}
                   <Compression
                     originalSize={compressionStats.originalSize}
                     compressedSize={compressionStats.compressedSize}
                     compressionRatio={compressionStats.compressionRatio}
                     processingTime={compressionStats.processingTime}
                   />    
                 </div>
            </div>
            {/* Full Width Algorithm Info */}
            <div className="w-full">
               <AlgorithmInfo/>
            </div>
        </div>

    </div>
    </>
 );
};

export default Index ;