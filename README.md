
# 🎥 File Compression & Decompression Portal

A powerful and intuitive full-stack web application that enables users to **compress** and **decompress** files using popular algorithms like **Huffman Coding**, **Run-Length Encoding (RLE)**, and **LZ77**.

## 📌 Project Description

This platform provides an interactive interface to reduce file sizes or restore them, using intelligent compression algorithms. Designed for educational, research, and utility purposes, the system visualizes compression stats and supports file downloads after processing.

---

## ✨ Features

- 📤 Upload files (`.txt`, `.png`, `.csv`, etc.)
- ⚙️ Select from 3 compression algorithms: Huffman, RLE, LZ77
- 📦 Compress & 🔁 Decompress files
- 📉 View compression stats:
  - Original size
  - Compressed size
  - Compression ratio
  - Processing time
- ⬇️ Download processed files
- 📚 Learn how each algorithm works (with visual cues)
- 🌐 Fully responsive UI built with modern React stack

---

## 🧰 Tech Stack Used

| Layer        | Technology                            |
|--------------|----------------------------------------|
| Frontend     | React + Vite + TailwindCSS + Lucide Icons |
| Backend      | Flask + Python + Flask-CORS           |
| Algorithms   | Custom-built implementations of Huffman, RLE, LZ77 |
| Deployment   | Vercel (Frontend) + Render (Backend)  |
| State Mgmt   | React `useState`                      |

---

## 🚀 Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/compression-portal.git
cd compression-portal
```

### 2. 🔧 Backend Setup (Flask)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

By default, backend runs at: `http://localhost:5000`

> 🔒 Ensure `uploads/`, `compressed/`, and `decompressed/` folders are auto-created or manually created if needed.

---

### 3. 🎨 Frontend Setup (React)

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```

By default, frontend runs at: `http://localhost:5173`

---

## 🌐 Deployed Demo

🚀 Live: [View Live Project](https://compression-portal.vercel.app) 

## 🎥 Video Demo

🚀 Live: [Video Demo of Multi ALgo Compressor](https://drive.google.com/drive/folders/1dcEHLzOtGOtZkuRXhQIqiMZHS1LU--YE)  

## Screnshots of Project
![multi algo 1](https://github.com/user-attachments/assets/5fc6aca0-a410-4db9-a4ed-dcd784a5445f)

![multi algo 2](https://github.com/user-attachments/assets/d21f3218-f44a-481e-8874-f21866dd6f0a)




---

## 📁 Folder Structure

```
multi-algo-compressor/
├── backend/
│   ├── app.py
│   ├── algorithms/
│   ├── requirements.txt
│   ├── uploads/
│   ├── compressed/
│   └── decompressed/
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── venv/ (excluded via .gitignore)
```
