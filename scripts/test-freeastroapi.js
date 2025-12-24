// Test FreeAstroAPI depuis Node.js
import fetch from 'node-fetch';

async function testFreeAstroAPI() {
  const response = await fetch('https://api.freeastroapi.com/natal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      year: 1990,
      month: 6,
      day: 21,
      hour: 12,
      minute: 0,
      city: 'Paris',
      lat: 48.8566,
      lng: 2.3522
    })
  });
  const data = await response.json();
  console.log('API response:', data);
}

testFreeAstroAPI().catch(console.error);
