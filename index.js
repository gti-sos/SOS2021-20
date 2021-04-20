// Create constructor function
var express = require("express");

// Create application with required modules
var app = express();

// Instantiate parser for JSON
var bodyParser = require("body-parser");

//Allow to parse the response body and get the JSON
app.use(bodyParser.json());

// Path instantiation
var path = require('path');

// Define listen port
var port = process.env.PORT || 10000;

//Define API endpoint
var BASE_API_PATH = "/api/v1";

// Run the application on the defined port
app.listen(port, () => {
    console.log("Server Up and listening on port " + port);
});


//Project home page
app.use("/", express.static("./public"));

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



//                         INDIVIDUAL API ENDPOINTS                                  //
//###################################################################################//
// Student: Jorge Marín Cordero 
// Resource: foundsresearchsources-stats

var foundsResearchSourcesAPI = require("./foundsResearchSourcesAPI");
foundsResearchSourcesAPI.init(app);

//###################################################################################//

//ALVARO CARO JIMÉNEZ
var renewablepowercapacities = require("./renewablepowercapacitiesAPI");
renewablepowercapacities.init(app);



//###################################################################################//

//JESÚS GUERRA ADAME
//5.1 GET /api/v1/YYYY
app.get(BASE_API_PATH + "/greenhousegasemissions-stats", (req, res) => {

    res.send(JSON.stringify(jgaData, null, 2));//OBJECTO //PASO OBJETO A JSON (JSON.stringbyfi) el null

});


var jgaData = [];

//5.2 GET /api/v1/yyyy/loadInitialData
app.get(BASE_API_PATH + "/greenhousegasemissions-stats/loadInitialData", (req, res) => {

    var jga_initialData = [

        //PRIMER OBJETO
        {
            "country": "spain",
            "year": 2014,
            "carbon-dioxide": 268.71585,
            "methane": 1.51641,
            "nitrous-oxide": 0.06049
        },//SEGUNDO OBJETO
        {
            "country": "belgium",
            "year": 2015,
            "carbon-dioxide": 105.3731,
            "methane": 0.32512,
            "nitrous-oxide": 0.02038
        }

    ];

    for (var item in jga_initialData) {
        jgaData.push(jga_initialData[item]);
    }

    res.status(200).send("Data created sucessfully!!");



    //Lanzamos el código 200 indicando que se han cargado los datos iniciales de forma satisfactoria
    //(Lo indicamos con el 200 por consola, y con un pequeño html para el usuario de forma gráfica)


});

//6.1 GET /API/V1/greenhousegasemissions-stats
//REALIZADO EN EL 5.1

//6.2 POST /API/V1/greenhousegasemissions-stats
app.post(BASE_API_PATH + "/greenhousegasemissions-stats", (req, res) => {

    var nuevoDato = req.body; //guardo en nuevoDato un objeto que esta en param
    //para ver el contenido del objeto se hace JSON.stringify(nombreObjeto)
    console.log(`nuevo contacto creado ${JSON.stringify(nuevoDato, null, 2)}`);

    res.sendStatus(201);

    jgaData.push(nuevoDato);

});


//6.3 GET /api/v1/greenhousegasemissions-stats/country/year
app.get(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", (req, res) => { //Cuando llamen a /api/v1/education_expenditures/(pais)	
    var datos = jgaData.filter(function (valorRecibido) {
        return valorRecibido.country == String(req.params.country) && valorRecibido.year == String(req.params.year);
    });

    //Respondemos a la petición enviando el recurso, filtrado, y en JSON
    res.status(200).send(JSON.stringify(datos, null, 2));
});

//6.4 DELETE ../country/year
app.delete(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = parseInt(req.params.year);

    for (var i = 0; i < jgaData.length; i++) {
        if (jgaData[i]["country"] === country && jgaData[i]["year"] === year) {
            jgaData.splice(i, 1);
            console.log("Recurso eliminado");
            return res.sendStatus(200);

        }
    }

    return res.sendStatus(404);
});


//6.5 PUT ../sevilla/2013 actualizar ese registro
app.put(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", function (req, res) {

    var sw = false;
    for (var x in jgaData) {

        if (jgaData[x].country == String(req.params.country) && jgaData[x].year == String(req.params.year)) {

            var data = req.body;
            jgaData[x] = data;
            sw = true;
            break;
        }
    }

    if (!sw) {
        res.status(404).send("Recurso no encontrado");
        console.log("Recurso no actualizado");
    } else {
        res.status(200).send("Recurso actualizado");
        console.log("Recurso actualizado");
    }
});


//6.6 POST /sevilla/2013 error met no permitido
app.post(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", function (req, res) {

    res.status(405).send("El metodo NO esta permitido para esta operacion");
    console.log("El metodo NO esta permitido para esta operacion");
});

//6.7 POST /sevilla error met no permitido
app.put(BASE_API_PATH + "/greenhousegasemissions-stats", function (req, res) {

    res.status(405).send("El metodo NO esta permitido para esta operacion");
    console.log("El metodo NO esta permitido para esta operacion");
});

//

//6.8 DELETE /api/v1/stats borra todo los recursos
app.delete(BASE_API_PATH + "/greenhousegasemissions-stats", (req, res) => {
    jgaData = [];
    res.status(200).send("datos del recurso eliminados");
    console.log("datos del recurso eliminados");
});



//###################################################################################//

// Manage bad requests
app.all('*', function (req, res) {
    res.sendStatus(400);
});