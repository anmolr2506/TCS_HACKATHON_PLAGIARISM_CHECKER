# Plagiarism Checker Sample Dataset

This directory contains a controlled, deterministic dataset for testing the plagiarism detection engine.

## File Breakdown

### Source Documents
- **`source1.txt`**: Academic excerpt on Transformers and Attention Mechanisms (Deep Learning / NLP).
- **`source2.txt`**: Academic excerpt on Distributed Consensus and Raft Protocol (Distributed Systems).
- **`source3.txt`**: Academic excerpt on Oceanic Carbon Sequestration (Environmental Science).
- **`source4.txt`**: Academic excerpt on Public Key Infrastructure and RSA Encryption (Cryptography & Cybersecurity).

---

### Test Submissions

#### 1. `submission_original.txt`
- **Expected Plagiarism Score**: 0%
- **Content Description**: Completely original text on quantum physics and quantum cryptography. None of the sentences or passages exist in `source1.txt` through `source4.txt`.

#### 2. `submission_plagiarized.txt`
- **Expected Plagiarism Score**: ~100% (High match)
- **Sentence Mapping**:
  - **Sentence 1**: `"Transformers rely on multi-head attention mechanisms to process sequential text data concurrently rather than sequentially."` (Exact copy from `source1.txt`, Sentence 1)
  - **Sentence 2**: `"By computing pairwise dot-product attention scores across token embeddings, the model dynamic weight vectors capture long-range syntactic and semantic dependencies."` (Exact copy from `source1.txt`, Sentence 2)
  - **Sentence 3**: `"Public Key Infrastructure utilizes asymmetric cryptographic key pairs for secure data encryption and digital identity verification."` (Exact copy from `source4.txt`, Sentence 1)
  - **Sentence 4**: `"RSA encryption relies on the computational difficulty of factoring the product of two large prime numbers."` (Exact copy from `source4.txt`, Sentence 2)

#### 3. `submission_mixed.txt`
- **Expected Plagiarism Score**: Partial (~40% - 60% depending on fuzzy/ngram vs exact matching)
- **Sentence Analysis**:
  - **Sentence 1** (*Slightly Modified / Paraphrased* from `source1.txt`):
    - *Submission*: `"Transformers utilize multi-head attention systems to process sequential textual data in parallel instead of sequentially."`
    - *Original*: `"Transformers rely on multi-head attention mechanisms to process sequential text data concurrently rather than sequentially."`
  - **Sentence 2** (*Exact Copy* from `source3.txt`):
    - *Submission*: `"Oceanic carbon sequestration plays a vital role in regulating atmospheric carbon dioxide concentration levels."`
  - **Sentence 3** (*Completely Original*):
    - *Submission*: `"Machine learning algorithms require extensive pre-processing and feature selection to optimize overall predictive performance."`
  - **Sentence 4** (*Slightly Modified / Paraphrased* from `source2.txt`):
    - *Submission*: `"Protocols for distributed consensus maintain data consistency over multiple nodes even during network partitioning events."`
    - *Original*: `"Distributed consensus protocols ensure data consistency across multiple node replicas even during network partitions."`
  - **Sentence 5** (*Exact Copy* from `source4.txt`):
    - *Submission*: `"Digital certificates issued by Certificate Authorities establish trust chains and mitigate man-in-the-middle exploits."`
  - **Sentence 6** (*Completely Original*):
    - *Submission*: `"Regularization techniques such as dropout prevent neural networks from overfitting on noisy training sets."`
