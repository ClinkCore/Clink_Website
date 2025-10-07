const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Read the private key
    const privateKeyPath = path.join(__dirname, '../AuthKey_2NFLGX88B9.p8');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    // MapKit JS configuration
    const teamId = 'YSTHT53U6R';
    const keyId = '2NFLGX88B9';
    const origin = req.headers.origin || req.headers.referer || 'https://clinkn.com';

    // Generate JWT token
    const token = jwt.sign(
      {
        iss: teamId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        origin: origin
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

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating MapKit token:', error);
    res.status(500).json({ error: 'Failed to generate token', message: error.message });
  }
};
