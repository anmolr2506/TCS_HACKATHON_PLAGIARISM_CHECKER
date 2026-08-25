-- =============================================================================
-- AI-Based Plagiarism Checker - PostgreSQL Database Schema
-- =============================================================================

-- Enable UUID extension if supported
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Documents Table: Stores submitted documents and metadata
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_type VARCHAR(50), -- e.g., 'txt', 'pdf', 'png', 'jpg'
    extracted_text TEXT NOT NULL,
    content_hash VARCHAR(64), -- SHA-256 hash to detect exact duplicates
    ocr_applied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. Reference Corpus: Stores baseline documents for comparison
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reference_corpus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    source_url VARCHAR(512),
    corpus_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. Analysis Reports: Stores aggregate results from Python Analysis Engine & LLM
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analysis_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    overall_similarity_score NUMERIC(5, 2) NOT NULL, -- Percentage (0.00 to 100.00)
    exact_match_score NUMERIC(5, 2) DEFAULT 0.00,
    semantic_similarity_score NUMERIC(5, 2) DEFAULT 0.00,
    llm_analysis_verdict TEXT,
    primary_model_used VARCHAR(100) DEFAULT 'Gemma 3 4B (Ollama)',
    status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'processing', 'completed', 'failed'
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 4. Matched Segments: Stores granular plagiarized snippets
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS matched_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES analysis_reports(id) ON DELETE CASCADE,
    matched_text TEXT NOT NULL,
    source_reference VARCHAR(255),
    similarity_percentage NUMERIC(5, 2),
    start_char_index INTEGER,
    end_char_index INTEGER
);

-- -----------------------------------------------------------------------------
-- Indexes for Performance
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_documents_content_hash ON documents(content_hash);
CREATE INDEX IF NOT EXISTS idx_analysis_document_id ON analysis_reports(document_id);
CREATE INDEX IF NOT EXISTS idx_matched_report_id ON matched_segments(report_id);
