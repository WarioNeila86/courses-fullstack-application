const express = require('express');
const app = express();
const courseRouter = require('./api/server/routes/course-routes');

// recognize the incoming request object as a JSON Object - this method is called as a middleware
app.use(express.json());
// Add /api/courses router to middleware chain
app.use('/api/courses', courseRouter);

// GET request for the root path of the server will show a Hello World message
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// read PORT from env variable PORT or use port 3000 as default
const port = process.env.PORT || 3000;

// start the server listening at a given port
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});