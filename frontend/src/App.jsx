import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [healthData, setHealthData] = useState(null);
  const [status, setStatus] = useState('checking'); // 'connected' | 'disconnected' | 'checking'
  const [latency, setLatency] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const checkHealth = async () => {
    setStatus('checking');
    setErrorMsg(null);
    const startTime = performance.now();

    try {
      // Fetch from relative /api/health (proxied by Vite) or fallback to direct port 5000
      const res = await fetch('/api/health');
      const endTime = performance.now();

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      setHealthData(data);
      setStatus('connected');
      setLatency(Math.round(endTime - startTime));
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err) {
      console.warn('Proxy health check failed, trying direct endpoint...', err);
      // Fallback direct call if proxy isn't active
      try {
        const startTimeDirect = performance.now();
        const resDirect = await fetch('http://localhost:5000/api/health');
        const endTimeDirect = performance.now();

        if (!resDirect.ok) {
          throw new Error(`Server responded with status: ${resDirect.status}`);
        }

        const dataDirect = await resDirect.json();
        setHealthData(dataDirect);
        setStatus('connected');
        setLatency(Math.round(endTimeDirect - startTimeDirect));
        setLastChecked(new Date().toLocaleTimeString());
      } catch (directErr) {
        setStatus('disconnected');
        setHealthData(null);
        setErrorMsg(directErr.message || 'Failed to connect to backend server');
        setLastChecked(new Date().toLocaleTimeString());
      }
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const stackItems = [
    { role: 'Frontend', name: 'React + Vite', desc: 'Interactive dashboard & submission interface' },
    { role: 'Backend', name: 'Node.js + Express', desc: 'REST API orchestration & business logic' },
    { role: 'Engine', name: 'Python 3', desc: 'Core analytical engine with NumPy & Pandas' },
    { role: 'OCR', name: 'Tesseract OCR', desc: 'Text extraction from scanned documents & images' },
    { role: 'Database', name: 'PostgreSQL', desc: 'Relational storage for documents & similarity reports' },
    { role: 'AI Model', name: 'Ollama (Gemma 3 4B)', desc: 'Semantic reasoning, paraphrasing & AI synthesis' },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <div className="badge-wrapper">
          <span className="badge-dot"></span>
          <span>Hackathon Initial Setup • Step 1</span>
        </div>
        <h1 className="title">AI-Based Plagiarism Checker</h1>
        <p className="subtitle">
          Intelligent multi-layer document similarity, OCR, and semantic verification system.
        </p>
      </header>

      <main className="main-content">
        {/* Backend Connection Status Card */}
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
                <line x1="6" x2="6.01" y1="6" y2="6"/>
                <line x1="6" x2="6.01" y1="18" y2="18"/>
              </svg>
              Backend API Status
            </h2>
            <div className={`status-pill ${status}`}>
              <span className="status-pulse"></span>
              <span>
                {status === 'connected' && 'Connected (OK)'}
                {status === 'disconnected' && 'Disconnected'}
                {status === 'checking' && 'Checking...'}
              </span>
            </div>
          </div>

          <div className="status-details-grid">
            <div className="detail-item">
              <div className="detail-label">Endpoint</div>
              <div className="detail-value">GET /api/health</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Backend Port</div>
              <div className="detail-value">http://localhost:5000</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Response Time</div>
              <div className="detail-value">{latency !== null ? `${latency} ms` : '—'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Last Checked</div>
              <div className="detail-value">{lastChecked || '—'}</div>
            </div>
          </div>

          <div className="response-preview">
            <div className="response-preview-header">Health Check Response Payload:</div>
            <div className="code-block">
              {status === 'checking' && '// Requesting backend status...'}
              {status === 'connected' && JSON.stringify(healthData, null, 2)}
              {status === 'disconnected' && `// Connection Failed: ${errorMsg}\n// Please ensure the backend server is running on port 5000.`}
            </div>
          </div>

          <div className="actions-row">
            <button
              className="btn"
              onClick={checkHealth}
              disabled={status === 'checking'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 21h5v-5"/>
              </svg>
              {status === 'checking' ? 'Testing Connection...' : 'Re-check Connection'}
            </button>
          </div>
        </section>

        {/* Technology Architecture Matrix */}
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
              Fixed Technology Stack
            </h2>
          </div>

          <div className="stack-grid">
            {stackItems.map((item, idx) => (
              <div key={idx} className="stack-card">
                <div className="stack-badge">{item.role}</div>
                <div className="stack-name">{item.name}</div>
                <div className="stack-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        TCS Hackathon Project • AI-Based Plagiarism Checker • Foundation Layer Initialized
      </footer>
    </div>
  );
}

export default App;
