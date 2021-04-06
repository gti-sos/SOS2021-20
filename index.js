
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



//=============================================================================================================================

// Define endpoints

//DATOS JESÚS
var loadInitialData = [
	{
	"country": "spain",
	"year": 2014,
	"carbon-dioxide": 268.71585,
	"methane": 1.51641,
    "nitrous-oxide": 0.06049
	},
	{
	"country": "belgium",
	"year": 2015,
	"carbon-dioxide": 105.3731,
	"methane": 0.32512,
    "nitrous-oxide": 0.02038
	}
	
];

//5.2 Ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos
app.get(BASE_API_PATH+"/greenhousegasemissions-stats/loadInitialData", (req,res)=>{
	res.send(JSON.stringify(loadInitialData,null,2));
});


//6.1 GET a la lista de recursos (p.e. “/api/v1/stats”)
app.get(BASE_API_PATH+"/stats", (req,res)=>{
	res.send(JSON.stringify(loadInitialData,null,2));
});


//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”)
app.post(BASE_API_PATH+"/stats", (req,res)=>{
	var newStat = req.body;
	console.log('new stat to be added:' +JSON.stringify(newStat,null,2));
	loadInitialData.push(newStat);
	res.sendStatus(201);
});

//6.3 GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”)
app.get(BASE_API_PATH+"/stats/:country/:year", (req,res)=>{
	var countryLabel = req.params.country;
	var yearLabel = req.params.year;
	var filtered = _.where(loadInitialData, {country: "spain" , year: 2014});
	res.send(JSON.stringify(filtered,null,2)); //'Helo GET:/stats/spain/2014'+ countryLabel + yearLabel
});

//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”)
app.delete(BASE_API_PATH+"/stats/:country/:year", (req,res)=>{
	var yearLabel = req.params.year;
	loadInitialData.delete(yearLabel);
	res.send('eliminado');
});

//6.5 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”)
app.delete(BASE_API_PATH+'/stats/spain/', (req,res)=>{
	res.send('Delete method')
	

});

//=============================================================================================================================






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
    response.send("<html><body><div><h3>Info:</h3><p>Esta fuente de datos muestra información acerca de las emisiones de gases que favorecen el efecto invernadero en Europa entre los años 2014 y 2018</p></div><table><thead><tr><th>country</th><th>year</th><th>carbon dioxide</th><th>methane</th><th>nitrous oxide</th></tr></thead><tbody><tr><td>spain</td><td>2014</td><td>268.71585</td><td>1.51641</td><td>0.06049</td></tr><tr><td>belgium</td><td>2015</td><td>105.3731</td><td>0.32512</td><td>0.02038</td></tr><tr><td>germany</td><td>2016</td><td>826.99377</td><td>2.22042</td><td>0.1278</td></tr><tr><td>italy</td><td>2017</td><td>362.64015</td><td>1.74639</td><td>0.06071</td></tr><tr><td>france</td><td>2018</td><td>349.36757</td><td>2.24392</td><td>0.13534</td></tr></tbody></table></body></html>"
    )
});

// Information about the project renewablepowercapacities-stats
app.get("/info/renewablepowercapacities-stats", (request, response) => {
    response.send("<html><body><div><h3>Info:</h3><p>Esta fuente de datos proporciona la información relativa a la cantidad en MegaVatios generados por energias renovables en diferentes paises de la unión europea entre los años 2014 y 2018. </p><table border='1'><thead><tr><th>country</th><th>year</th><th>solar production in megawatts</th><th>hydraulic production in megawatts</th><th>wind power production in megawatts</th></tr></thead><tbody><tr><td>Germany</td><td>2018</td><td>14586736</td><td>16799700</td><td>15060000</td></tr><tr><td>Belgium</td><td>2018</td><td>4.000,000</td><td>1.417,500</td><td>3.267,900</td></tr><tr><td>Bulgaria</td><td>2018</td><td>1.032,679</td><td>3.379,000</td><td>698,920</td></tr><tr><td>Czechia</td><td>2018</td><td>2.075,072</td><td>2.264,019</td><td>316,200</td></tr><tr><td>Denmark</td><td>2018</td><td>998000</td><td>7153</td><td>6.115,008</td></tr><tr><td>Estonia</td><td>2018</td><td>31,900</td><td>7,300</td><td>310,000</td></tr></tbody></table></div></body></html>"
    )
});


// Run the application on the defined port
app.listen(port, () => {
    console.log("Server Up and listening on port " + port);
});

