const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
require('dotenv').config();

const {PORT} = process.env

conn.sync({ force: false }).then(() => {
  console.log(PORT);
  server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
