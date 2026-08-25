function app(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Plagiarism Checker API" }));
}

module.exports = app;
