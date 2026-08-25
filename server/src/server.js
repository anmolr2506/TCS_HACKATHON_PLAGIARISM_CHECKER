const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000;

http.createServer(app).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
