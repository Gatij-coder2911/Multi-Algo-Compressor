from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import time
from werkzeug.utils import secure_filename

from algorithms.huffman import HuffmanCoding
from algorithms.rle import RLE
from algorithms.lz77 import LZ77

UPLOAD_FOLDER = 'uploads'
COMPRESSED_FOLDER = 'compressed'
DECOMPRESSED_FOLDER = 'decompressed'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(COMPRESSED_FOLDER, exist_ok=True)
os.makedirs(DECOMPRESSED_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 MB

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://multi-algo-compressor.vercel.app"]}}, supports_credentials=True)

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message':"Hello world"})

@app.route('/process', methods=['POST'])
def process_file():
    client_ip = request.remote_addr
    print(f"Incoming request from IP: {client_ip}")
    file = request.files.get('file')
    operation = request.form.get('operation')  # "compress" or "decompress"
    algo = request.form.get('algorithm')       # "huffman", "rle", "lz77"

    if not file or not operation or not algo:
        return jsonify({"error": "Missing file, operation or algorithm"}), 400
    else:
        print("Successful")

    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(input_path)

    original_size = os.path.getsize(input_path)
    start_time = time.time()

    output_path = ""
    output_name = ""
    operation_performed = ""

    # Initialize the appropriate algorithm
    if algo == "huffman":
        compressor = HuffmanCoding()
        ext = ".huff"
    elif algo == "rle":
        compressor = RLE()
        ext = ".rle"
    elif algo == "lz77":
        compressor = LZ77()
        ext = ".lz77"
    else:
        return jsonify({"error": "Unsupported algorithm"}), 400

    # Perform Compression or Decompression
    if operation == "compress":
        output_name = filename + ext
        output_path = os.path.join(COMPRESSED_FOLDER, output_name)
        compressor.compress_file(input_path, output_path)
        final_size = os.path.getsize(output_path)
        operation_performed = f"Compressed using {algo.upper()}"
    elif operation == "decompress":
        base_name = os.path.splitext(filename)[0]  # removes .huff/.rle/.lz77
        original_name, original_ext = os.path.splitext(base_name)
        final_filename = f"{original_name}_{algo}_restored{original_ext}"
        output_path = os.path.join(DECOMPRESSED_FOLDER, final_filename)
        output_path = compressor.decompress_file(input_path, output_path)

        output_name = os.path.basename(output_path) 
        final_size = os.path.getsize(output_path)    
        operation_performed = f"Decompressed using {algo.upper()}"
    else:
        return jsonify({"error": "Unsupported operation"}), 400

    compression_ratio = round(final_size / original_size, 4) if operation == "compress" and original_size != 0 else 0

    processing_time = round(time.time() - start_time, 4)

    flask_host = request.host_url.rstrip('/')
    download_url = f"{flask_host}/download/{'compressed' if operation == 'compress' else 'decompressed'}/{output_name}"


    return jsonify({
        "original_filename": filename,
        "output_filename": output_name,
        "original_size_bytes": original_size,
        "output_size_bytes": final_size,
        "compression_ratio": compression_ratio,
        "processing_time_sec": processing_time,
        "operation_performed": operation_performed,
        "download_url": download_url
    })


@app.route('/download/<folder>/<filename>', methods=['GET'])
def download_file(folder, filename):
    if folder not in ["compressed", "decompressed"]:
        return jsonify({"error": "Invalid folder"}), 400
    filepath = os.path.join(folder, filename)
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404
    return send_file(filepath, as_attachment=True)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

