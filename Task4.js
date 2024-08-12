const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'largefile.txt'); // Replace with your large file path

    fs.stat(filePath, (err, stats) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': stats.size
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);

        readStream.on('error', (streamErr) => {
            res.statusCode = 400;
            res.end('Server error');
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});
