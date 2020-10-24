const express = require('express');
const app = express();

// handle get request to our server
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify([1, 2, 3]));
});

// make our app listen at a given port
app.listen(3000, () => {
    console.log('Listening on 3000...');
});