const express = require('express');
const app = express();

// handle get request to our server
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify([1, 2, 3]));
});

// read PORT from env variable PORT, 3000 as default
const port = process.env.PORT || 3000;

// make our app listen at a given port
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});