require('dotenv').config();
const { createApp } = require('./app');
const { initDb } = require('./db/db');

const port = process.env.PORT || 5000;

initDb();

const app = createApp();
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
