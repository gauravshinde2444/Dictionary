const express = require('express')
const axios = require("axios");
const app = express()
const path = require("path")
const port = 4040
require("dotenv").config();

app.get('/', (req, res) => {
	return res.sendFile(path.join('public/index.html'), {root: __dirname})
})

app.get('/searchword', (req, res) => {
	
	let daata = [];
	const options = {
	  method: 'GET',
	  url: process.env.MYAPI,
	  params: {term: req.query.entry},
	  headers: {
		'X-RapidAPI-Key': process.env.MYAPIKEY,
		'X-RapidAPI-Host': process.env.MYAPIHOST
	  }
	};

	axios.request(options).then(function (response) {
		daata = response.data;
		//console.log(daata);
		res.json(daata);
	}).catch(function (error) {
		console.error(error);
	});

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} - http://localhost:4040`)
})