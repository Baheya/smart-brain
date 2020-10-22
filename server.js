const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();
const publicPath = path.join(__dirname, 'build');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
