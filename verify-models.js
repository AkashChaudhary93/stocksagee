const https = require('https');

// Read key from .env.local manually since we aren't in a full env context
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GOOGLE_API_KEY=(.+)/);

    if (!match) {
        console.error('Could not find GOOGLE_API_KEY in .env.local');
        process.exit(1);
    }

    const apiKey = match[1].trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                if (json.error) {
                    console.error('API Error:', JSON.stringify(json.error, null, 2));
                } else {
                    console.log('Available Models:');
                    json.models.forEach(m => {
                        if (m.supportedGenerationMethods.includes('generateContent')) {
                            console.log(`- ${m.name}`);
                        }
                    });
                }
            } catch (e) {
                console.error('Error parsing JSON:', e);
                console.log('Raw response:', data);
            }
        });
    }).on('error', (e) => {
        console.error('Request error:', e);
    });

} catch (e) {
    console.error('Error reading .env.local:', e);
}
