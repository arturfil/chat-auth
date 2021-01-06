const e = require('cors');
const express = require('express');
const path = require('path');

require('dotenv').config();

// DB connection
const { dbConnection } = require('./database/config');
dbConnection();

// Express Middlewares
const app = express();
app.use(express.json());

// parse
app.use('/api/auth/', require('./routes/auth'));

// Socket Middlewares
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Public path resolver
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Port assignment
const port = process.env.PORT;

// Open port socket listener
server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`Server running on port ${port}`);
})