# AI-Based Plagiarism Checker

A modular, multi-tier AI plagiarism and document similarity detection platform designed for hackathons and academic integrity workflows.

---

## 🏛️ System Architecture & Communication Flow

```
+-------------------------------------------------------------+
|                   React Frontend (Port 5173)                |
|  - File Upload (PDF/Image/Text)                             |
|  - Real-time Status Dashboard                               |
|  - Plagiarism Similarity Breakdown & Visualization          |
+------------------------------+------------------------------+
                               |
                               | (HTTP / REST API)
                               v
+-------------------------------------------------------------+
|               Node.js + Express Backend (Port 5000)         |
|  - Route Orchestration & File Handling                      |
|  - Invokes Python Analysis Engine subprocess / workers      |
|  - PostgreSQL Database Operations & Persistence             |
+------------------------------+------------------------------+
                               |
                               | (Subprocess / IPC)
                               v
+-------------------------------------------------------------+
|                    Python Analysis Engine                   |
|  +-------------------------------------------------------+  |
|  | - Text Tokenization & Numerical Vectors (NumPy/Pandas) |  |
|  | - Tesseract OCR (Optical Character Recognition)       |  |
|  | - Ollama LLM Inference (Gemma 3 4B / DeepSeek-R1)     |  |
|  +-------------------------------------------------------+  |
+------------------------------+------------------------------+
                               |
                               | (Structured Results)
                               v
+-------------------------------------------------------------+
|               PostgreSQL Relational Database                |
|  - Documents, Content Hashes, Similarity Reports            |
+-------------------------------------------------------------+
```

---

## 📁 Project Folder Structure

```
TCS_HACKATHON_PLAGIARISM_CHECKER/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/
│   │   │   └── health.js     # Health check route (GET /api/health)
│   │   ├── app.js            # Express application setup & middleware
│   │   └── server.js         # HTTP server entrypoint
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   └── package.json
├── frontend/                 # React + Vite UI dashboard
│   ├── public/
│   ├── src/
│   │   ├── App.css           # Styling & status UI
│   │   ├── App.jsx           # Main React component with health check
│   │   ├── index.css         # Global modern dark design system
│   │   └── main.jsx          # React DOM entry
│   ├── index.html
│   ├── vite.config.js
│   ├── .gitignore
│   └── package.json
├── python_engine/            # Python analytical core
│   ├── core/
│   │   └── __init__.py
│   ├── .gitignore
│   ├── main.py               # Engine entry point & CLI health check
│   └── requirements.txt      # Pandas, NumPy, and future AI/OCR deps
├── database/
│   └── schema.sql            # PostgreSQL schema placeholder & tables
├── sample_data/              # Test datasets for OCR & plagiarism checks
│   └── README.md
├── .gitignore
└── README.md
```

---

## 🛠️ Prerequisites

- **Node.js**: v18+ (tested with v25.8+)
- **Python**: v3.10+ (tested with v3.14+)
- **PostgreSQL**: v14+ (optional for Step 1)
- **Ollama**: (planned for AI semantic analysis in upcoming steps)

---

## 🚀 Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Python Engine Setup
```bash
cd python_engine
pip install -r requirements.txt
```

---

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start
# Server starts at http://localhost:5000
```

### Start Frontend Client
```bash
cd frontend
npm run dev
# Frontend runs at http://localhost:5173
```

---

## 🧪 Testing the Health Check Endpoint

### Via cURL / Terminal:
```bash
curl http://localhost:5000/api/health
```

**Expected JSON Response:**
```json
{
  "status": "ok",
  "service": "AI-Based Plagiarism Checker API",
  "version": "1.0.0",
  "timestamp": "2026-08-25T09:00:00.000Z",
  "uptime": 12.34
}
```

### Via Browser:
Open [http://localhost:5173](http://localhost:5173) in your browser. The dashboard will automatically ping the backend and display a live **"Connected (OK)"** status badge and response payload.
