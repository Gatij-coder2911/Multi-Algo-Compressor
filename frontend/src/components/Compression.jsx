import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CompressionStats = ({
  originalSize = 0,
  compressedSize = 0,
  compressionRatio = 0,
  processingTime = 0
}) => {
  const formatSize = (bytes) => {
    if (!bytes) return "--";
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  const formatRatio = (ratio) => {
    if (!ratio) return "--%";
    return `${ratio.toFixed(1)}%`;
  };

  const formatTime = (time) => {
    if (!time) return "-- ms";
    return `${time} ms`;
  };

  return (
    <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Compression Statistics</CardTitle>
        <CardDescription>Performance metrics and file information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Original Size */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm font-medium text-gray-600 mb-1">Original Size</p>
            <p className="text-2xl font-bold text-gray-800">
              {formatSize(originalSize)}
            </p>
          </div>

          {/* Compressed Size */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700 mb-1">Processed Size</p>
            <p className="text-2xl font-bold text-green-600">
              {formatSize(compressedSize)}
            </p>
          </div>

          {/* Compression Ratio */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-1">Compression Ratio</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatRatio(compressionRatio)}
            </p>
          </div>

          {/* Processing Time */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-purple-700 mb-1">Processing Time</p>
            <p className="text-2xl font-bold text-purple-600">
              {formatTime(processingTime)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompressionStats;
