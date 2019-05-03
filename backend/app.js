const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

const db_name = "mean-course";
mongoose.connect("mongodb://127.0.0.1:27017/" + db_name, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(() => {
    console.log('Failed to connect DB');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
