const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const taskRoute = require('./routes/Task.routes');

app.use('/tasks', taskRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('Connected');
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
