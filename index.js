
// Load cool assci faces module
var cool = require("cool-ascii-faces");
const { response } = require("express");

// Create constructor function
var express = require("express");
const { request } = require("http");

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

// Information about the project foundsresearchsources-stats
app.get("/info/foundsresearchsources-stats", (request, response) => {
    response.send("<html><body><div><h3>Info:</h3><p>Esta fuente de datos devuelve la información relativa al porcentaje de aportación de fondos para la investigación y desarrollo por parte de los diferentes organismos de cada pais en el conjunto de los paises de la unión europea entre los años 2014 y 2018 </p></div><table><thead><tr><th>country<br></th><th>year</th><th>percentage of government funding</th><th>percentage of private financing</th><th>percentage of private financing</th></tr></thead><tbody><tr><td>Belgium</td><td>2015</td><td>22.5</td><td>58.6</td><td>0.4</td></tr><tr><td>Denmark</td><td>2015</td><td>30.2</td><td>59.1</td><td>4.4</td></tr><tr><td>Germany</td><td>2015</td><td>27.9</td><td>65.7</td><td>0.3</td></tr><tr><td>Ireland</td><td>2015</td><td>26.1</td><td>48.7</td><td>0.6</td></tr><tr><td>Greece</td><td>2015</td><td>53.1</td><td>31.4</td><td>0.4</td></tr></tbody></table></body></html>"
    )
});

// Run the application on the defined port
app.listen(port, () => {
    console.log("Server Up and listening on port " + port);
});

