var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var data = require('./data.js')

var app = express();

app.use(bodyParser.json());

app.get('/api/data', (req, res, next) => {
	data1 = Array.from(data);
	if(req.query){
		for( let i = 0; i < data1.length; i++){
			for(let key in req.query){
				if(data1[i][key] != req.query[key]){
					data1.splice(i--,1);
				}
			}
		}
		return res.status(200).json(data1)
	} else {

		return res.status(200).json(data)
	}
})

app.get('/api/data/:index', (req, res, next) => {
	const index = req.params.index;
	res.status(200).json(data[index]);
})

app.post('/api/data', (req, res, next) => {
	const newDataPoint = req.body;
	data.push(newDataPoint);
	res.status(200).json(newDataPoint);
})

app.put('/api/data/:index', (req, res, next) => {
	const i = req.params.index;
	var q = req.query;

	for (var key in q) {
		data[i][key] = q[key];
	}

	res.status(200).json(data[i]);
})

app.delete('/api/data/:index', (req, res, next) => {
	const index = req.params.index;
	const deletedData = data.splice(index,1);
	res.status(200).json(deletedData);
})

app.listen(port, function() {
	console.log('Listening on port',port);
})
