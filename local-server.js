const http = require('http');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle MapKit token endpoint
    if (req.url === '/api/mapkit-token' || req.url === '/.netlify/functions/mapkit-token') {
        try {
            const privateKeyPath = path.join(__dirname, 'AuthKey_2NFLGX88B9.p8');
            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            
            const teamId = 'YSTHT53U6R';
            const keyId = '2NFLGX88B9';
            
            const token = jwt.sign(
                {
                    iss: teamId,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 3600,
                },
                privateKey,
                {
                    algorithm: 'ES256',
                    keyid: keyId,
                    header: {
                        kid: keyId,
                        typ: 'JWT',
                        alg: 'ES256'
                    }
                }
            );

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ token }));
            console.log('✅ Token generated successfully');
        } catch (error) {
            console.error('❌ Error generating token:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }

    // Serve static files
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Local server running at http://localhost:${PORT}/`);
    console.log(`📍 MapKit token endpoint: http://localhost:${PORT}/api/mapkit-token\n`);
});
