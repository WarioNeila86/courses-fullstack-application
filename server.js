const app = require('./app');

// read PORT from env variable PORT or use port 3000 as default
const port = process.env.PORT || 3000;

// start the server listening at a given port
app.listen(port, () => console.log(`Listening on ${port}...`));