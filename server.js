const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const Message = require('./server/models/messages');
const index = require('./server/routes/app');
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');
const documentsRoutes = require('./server/routes/documents');

mongoose.connect('mongodb+srv://emilybarker:EVWshxgBym7rAVMn@cmswdd430.1mzoqqp.mongodb.net/')
  .then(() => {
    console.log('Connected to database...');
  })
  .catch((err) => {
    console.error('Could not connect to Database:', err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.static(path.join(__dirname, 'dist/cms')));
app.use('/', index);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log("API running on localhost:" + port);
});
