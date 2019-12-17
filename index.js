const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.post('/parse', require(path.join(__dirname, '/src/routes/parse')));

app.listen(8080);
