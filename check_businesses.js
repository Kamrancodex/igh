
const http = require('http');

http.get('http://localhost:3000/api/businesses', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    try {
        const businesses = JSON.parse(data);
        businesses.forEach(b => {
            console.log(`Name: ${b.name}, Image: ${b.image}`);
        });
    } catch (e) {
        console.error(e.message);
    }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
