const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const Web3 = require('web3');
const truffle_connect = require('./truffle-connect');

// Database connections
const port = +process.argv.slice(2)[0];
const db_port = port+1;
const database = 'mongodb://localhost:'+db_port+'/database';

mongoose.connect(database, {useNewUrlParser: true});
mongoose.connection.on('connected', function() {
    console.log('Connected to '+database); 
});
mongoose.connection.on('error', function(err) {
    console.log(err);
});

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.json());

const candidate = require('./routes/candidate-routes');
const vote = require('./routes/vote-routes');
const blockchain = require('./routes/blockchain');
app.use('/candidate', candidate);
app.use('/vote', vote);
app.use('/blockchain', blockchain);

server.listen(port, function() {
    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    console.log('Server on '+port);
});

app.get('/', function(req, res) {
    res.send('Invalid');
});

// Socket

//module.exports.socket_client = socket_client;