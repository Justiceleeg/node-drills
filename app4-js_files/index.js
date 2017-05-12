const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data')
const port = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/api/data', function(req, res, next){
  res.status(200).json(data)
})

app.post('/api/data', function(req, res, next){
  const newData = req.body;
  data.push(newData);
  res.status(200).json(newData);
})

app.listen(port, () => {console.log(`Listening on port ${port}`)})
