// Student: Jesús Guerra Adame 
// Resource: greenhousegasemissions-stats


const request = require("request");
var unirest = require("unirest");

module.exports.init = (app) => {
//Servidor proxy para integración con grupo 23 HDI-stats
  
    app.use("/v3/integration/hdi-stats/loadInitialData", function(req, res) {
      var apiServerHost = "https://sos2021-23.herokuapp.com/api/v1/hdi-stats/loadInitialData";

      var url = apiServerHost + req.url;
      console.log(`piped: ${req.url} -> ${url}`);
      req.pipe(request(url)).pipe(res);
    });


   app.use("/v3/integration/hdi-stats", function(req, res) {
        var apiServerHost = "https://sos2021-23.herokuapp.com/api/v1/hdi-stats";
    
        var url = apiServerHost + req.url;
        console.log(`piped: ${req.url} -> ${url}`);
        req.pipe(request(url)).pipe(res);
      });

//Servidor proxy para integración con grupo 04 poverty_risks
      app.use("/v3/integration/poverty_risks/loadInitialData", function(req, res) {
        var apiServerHost = "https://sos2021-04.herokuapp.com/api/v1/poverty_risks/loadInitialData";

        var url = apiServerHost + req.url;
        console.log(`piped: ${req.url} -> ${url}`);
        req.pipe(request(url)).pipe(res);
      });



      app.use("/v3/integration/poverty_risks", function(req, res) {
        var apiServerHost = "https://sos2021-04.herokuapp.com/api/v1/poverty_risks";
    
        var url = apiServerHost + req.url;
        console.log(`piped: ${req.url} -> ${url}`);
        req.pipe(request(url)).pipe(res);
      });

//USO API OTT DETAILS

    var OTTdata = [];
    var req = unirest("GET", "https://ott-details.p.rapidapi.com/advancedsearch");

    req.query({
      "start_year": "2020",
      "end_year": "2020",
      "min_imdb": "6",
      "max_imdb": "9",
      "language": "spanish",
      "type": "show",
      "page": "1"
    });

    req.headers({
      "x-rapidapi-key": "0e378a889fmshc5a3a6fb5b77ba7p1f3286jsne3d159442600",
      "x-rapidapi-host": "ott-details.p.rapidapi.com",
      "useQueryString": true
    });


    req.end(function (res) {
      OTTdata = res.body;
    });
 
    app.get("/v3/integration/OTTdetails", function (req, res){
      return res.send(OTTdata);
  });

  //USO API PERIODIC TABLE OF ELEMENTS
var ptoe = [];
var req = unirest("GET", "https://periodic-table-of-elements.p.rapidapi.com/elements");

req.headers({
	"x-rapidapi-key": "0e378a889fmshc5a3a6fb5b77ba7p1f3286jsne3d159442600",
	"x-rapidapi-host": "periodic-table-of-elements.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	ptoe = res.body;
	//console.log(res.body);
  //console.log(ptoe);
});

app.get("/v3/integration/periodictable", function (req, res){
  return res.send(ptoe);
 
});


};


