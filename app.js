// Server
// Dependencies
// Using dotenv as configuration deps.
require('dotenv').config();

const express = require("express"),
      bodyParser = require('body-parser'),
      fs = require("fs");


// Initiate your server application
const app = express(),
      port = process.env.PORT || 3333;

//Add body-parser to process data attached to body on http request
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

// Enable Cross Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


// Endpoint example
// req for request, res for response;
// Request is the data that client app sent to the Server *Payload
// Response is the data which will be sent to the client app.
app.get('/client/:index',function (req,res) {
    fs.readFile(__dirname + '/people.json','utf-8',function (err,data) {
        var people = JSON.parse(data);
        var person = people[req.params.index];
        res.send(person);
    });
});


app.delete('/client/:index',function (req,res) {
    fs.readFile(__dirname + '/people.json','utf-8',function (err,data) {
        var people = JSON.parse(data);
        people.splice(req.params.index,1);
        res.send(people);
    });
});


app.put('/client/:index',function (req,res) {
    fs.readFile(__dirname + '/people.json','utf-8',function (err,data) {
        var people = JSON.parse(data);
        people[req.params.index] = req.body;
        res.send(people);
    });
});


app.post('/client',function (req,res) {
    fs.readFile(__dirname + '/people.json','utf-8',function (err,data) {
        var people = JSON.parse(data);
        people.push(req.body);
        res.send(people);
    });
});


app.get('/client',function(req,res) {
  fs.readFile(__dirname + '/people.json','utf-8',function (err,data) {
      res.send(JSON.parse(data));
  });
});


app.get('/',function(req,res) {
  fs.readFile(__dirname + '/people.json','utf-8',function (err,data) {
      res.send(JSON.parse(data));
  });
});


// Start your server on specified port
app.listen(port);


// If you see this, you are all set.
console.log("Welcome to "+port+" Baker Street!");
