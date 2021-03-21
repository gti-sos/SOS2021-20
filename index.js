
// Load cool assci faces module
var cool = require("cool-ascii-faces");

// Create constructor function
var express = require("express");

// Create application
var app = express();

// Path instantiation
var path = require('path');

// Define listen port
var port = process.env.PORT || 10000;

// Declare endpoints

// Returns the index page
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Returns a ASSCII funny face
app.get("/cool", (request, response) => {
    response.send(cool());
    // Get the ip address of the client
    var remote_ip = request.ip
    console.log("New request from " + remote_ip);

});



// Run the application on the defined port
app.listen(port, () => {
    console.log("Server Up and listening on port " + port);
});