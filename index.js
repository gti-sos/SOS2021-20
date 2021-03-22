
// Usage express module 
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

// Define endpoints

// Returns the index page
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Information about the project foundsresearchsources-stats
app.get("/info/foundsresearchsources-stats", (request, response) => {
    response.send("<html><body><div><h3>Info:</h3><p>Esta fuente de datos devuelve la información relativa al porcentaje de aportación de fondos para la investigación y desarrollo por parte de los diferentes organismos de cada pais en el conjunto de los paises de la unión europea entre los años 2014 y 2018 </p></div><table><thead><tr><th>country<br></th><th>year</th><th>percentage of government funding</th><th>percentage of private financing</th><th>percentage of private financing</th></tr></thead><tbody><tr><td>Belgium</td><td>2015</td><td>22.5</td><td>58.6</td><td>0.4</td></tr><tr><td>Denmark</td><td>2015</td><td>30.2</td><td>59.1</td><td>4.4</td></tr><tr><td>Germany</td><td>2015</td><td>27.9</td><td>65.7</td><td>0.3</td></tr><tr><td>Ireland</td><td>2015</td><td>26.1</td><td>48.7</td><td>0.6</td></tr><tr><td>Greece</td><td>2015</td><td>53.1</td><td>31.4</td><td>0.4</td></tr></tbody></table></body></html>" 
    )
});

// Information about the project greenhousegasemissions-stats
app.get("/info/greenhousegasemissions-stats", (request, response) => {
    response.send("<html><body><div><h3>Info:</h3><p>AQUI TU INFO</p></div><table><thead><tr><th>country</th><th>year</th><th>carbon dioxide</th><th>methane</th><th>nitrous oxide</th></tr></thead><tbody><tr><td>spain</td><td>2014</td><td>268.71585</td><td>1.51641</td><td>0.06049</td></tr><tr><td>belgium</td><td>2015</td><td>105.3731</td><td>0.32512</td><td>0.02038</td></tr><tr><td>germany</td><td>2016</td><td>826.99377</td><td>2.22042</td><td>0.1278</td></tr><tr><td>italy</td><td>2017</td><td>362.64015</td><td>1.74639</td><td>0.06071</td></tr><tr><td>france</td><td>2018</td><td>349.36757</td><td>2.24392</td><td>0.13534</td></tr></tbody></table></body></html>"
    )
});




// Run the application on the defined port
app.listen(port, () => {
    console.log("Server Up and listening on port " + port);
});

