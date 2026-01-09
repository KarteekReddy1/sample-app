const http = require('http');

const server = http.createServer((req, res) => {

  // Health check endpoint for Kubernetes & ALB
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  // Application response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from EKS via Jenkins CI/CD 🚀\n');

});

server.listen(3000, () => {
  console.log('App running on port 3000');
});
