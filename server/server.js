const app = require('./app');
const { logger } = require('./logger');

// read PORT from env variable PORT or use port 3000 as default
const port = process.env.PORT || 4000;

// start the server listening at a given port
app.listen(port, () => logger.info(`Listening on ${port}...`));
