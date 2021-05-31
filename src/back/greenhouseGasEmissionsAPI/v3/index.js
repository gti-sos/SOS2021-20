// Student: Jesús Guerra Adame 
// Resource: greenhousegasemissions-stats


//Define API endpoint
var BASE_API_PATH = "/api/v3";

const request = require("request");


//Servidor proxy para integración con grupo 23 HDI-stats

   app.use("/v1/integration/hdi-stats", function(req, res) {
        var apiServerHost = "https://sos2021-23.herokuapp.com/api/v1/hdi-stats";
    
        var url = apiServerHost + req.url;
        console.log(`piped: ${req.url} -> ${url}`);
        req.pipe(request(url)).pipe(res);
      });

//Servidor proxy para integración con grupo 04 poverty_risks

      app.use("/v1/integration/poverty_risks", function(req, res) {
        var apiServerHost = "https://sos2021-04.herokuapp.com/api/v1/poverty_risks";
    
        var url = apiServerHost + req.url;
        console.log(`piped: ${req.url} -> ${url}`);
        req.pipe(request(url)).pipe(res);
      });

