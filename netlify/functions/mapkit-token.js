const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Read the private key
    const privateKeyPath = path.join(__dirname, '../../AuthKey_2NFLGX88B9.p8');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    // MapKit JS configuration
    const teamId = 'YSTHT53U6R';
    const keyId = '2NFLGX88B9';
    const origin = event.headers.origin || event.headers.referer || 'https://clinkn.com';

    // Generate JWT token
    const now = Math.floor(Date.now() / 1000);
    const token = jwt.sign(
      {
        iss: teamId,
        iat: now,
        exp: now + 3600 // 1 hour expiration
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ token })
    };
  } catch (error) {
    console.error('Error generating MapKit token:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate token', message: error.message })
    };
  }
};
