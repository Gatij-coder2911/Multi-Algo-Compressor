import { Cpu, Repeat, RefreshCw, Sparkles, Info } from "lucide-react";
import { motion } from "framer-motion";

const AlgorithmInfo = () => {
  const algorithms = [
    {
      name: "Huffman Coding",
      icon: <Cpu className="h-8 w-8 text-blue-600" />,
      color: "bg-blue-50",
      border: "border-blue-200",
      description:
        "Assigns shorter binary codes to frequent characters using a binary tree. Ideal for compressing text with variable frequency patterns.",
      useCase: "📄 Text files, structured logs",
      efficiency: "🔵 High efficiency for variable frequency data",
    },
    {
      name: "Run-Length Encoding (RLE)",
      icon: <Repeat className="h-8 w-8 text-green-600" />,
      color: "bg-green-50",
      border: "border-green-200",
      description:
        "Replaces repeated values with one value and count. Performs best on uniform data or repeated patterns.",
      useCase: "🖼 BMP images, monochrome scans",
      efficiency: "🟢 Simple, fast for repetitive content",
    },
    {
      name: "LZ77",
      icon: <RefreshCw className="h-8 w-8 text-purple-600" />,
      color: "bg-purple-50",
      border: "border-purple-200",
      description:
        "Uses a sliding window to find and replace duplicate byte sequences with references. Ideal for large binary or structured files.",
      useCase: "📦 ZIP files, CSVs, executables",
      efficiency: "🟣 Excellent for long structured data",
    },
  ];

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <Sparkles className="text-yellow-500" /> How the Algorithms Work
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
          Learn how each compression algorithm helps reduce file size for different types of data.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {algorithms.map((algo, index) => (
          <motion.div
            key={algo.name}
            className={`p-6 rounded-xl shadow-lg border ${algo.border} ${algo.color}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center gap-4 mb-4">
              {algo.icon}
              <h3 className="text-xl font-semibold text-gray-800">{algo.name}</h3>
            </div>
            <p className="text-gray-700 text-sm mb-3">{algo.description}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Use Case:</span> {algo.useCase}</p>
              <p><span className="font-medium">Efficiency:</span> {algo.efficiency}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10 text-gray-500 text-xs flex justify-center items-center gap-1">
        <Info className="w-4 h-4" />
        <span>Choose the best algorithm based on your file’s structure and type.</span>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
