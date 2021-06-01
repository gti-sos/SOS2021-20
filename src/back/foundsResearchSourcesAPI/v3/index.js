// Student: Jorge Marín Cordero 
// Resource: foundsresearchsources-stats

//Define API endpoint
var BASE_API_PATH = "/api/v3/integrations";

const fetch = require('node-fetch');
const { get } = require('request');
var request = require('request');
const { dataset_dev } = require('svelte/internal');


module.exports.init = (app) => {

    //----------------- Integrations --------------------//

    //-------------------- SOS APIs ---------------------//

    // Integration with Group 4 (Proxy)
    app.use('/api/v1/education_expenditures', function (req, res) {
        var url = 'https://sos2021-04.herokuapp.com' + req.baseUrl + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });

    // Integration with Group 1
    var group1Data = [];
    function loadGroup1Data() {
        fetch("https://sos2021-01.herokuapp.com/api/v2/life-stats/loadInitialData")
            .then((res) => {
                fetch("https://sos2021-01.herokuapp.com/api/v2/life-stats")
                    .then((res2) => res2.json())
                    .then((res2) => {
                        group1Data = res2
                    })
                    .catch((error) => {
                        console.log(error);
                        ;
                    })
            })
            .catch((error2) => {
                console.log(error2);
            });

    }
    app.get(BASE_API_PATH + "/life-stats", function (req, res) {
        return res.send(group1Data)
    });

    //---------------- External APIs --------------------//

    // Bikesharing JC Decaux Seville
    app.get(BASE_API_PATH + "/bikes", function (req, res) {
        request.get("https://api.jcdecaux.com/vls/v1/stations?contract=Seville&apiKey=" + process.env.JC_DECAUX_KEY, (error, resp, body) => {
            if (error) {
                return res.sendStatus(404);
            }

            return res.send(JSON.parse(body));
        });


    });

    // AEMET OpenData, Station Seville, Airport (E317)
    var weatherData = [];
    function loadAemetData() {
        var today = new Date();
        var endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        fetch("https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/"
            + String(parseInt(today.getFullYear()) - 2) + "-01-01T00%3A00%3A00UTC/fechafin/" + endDate + "T00%3A00%3A00UTC/estacion/5783?api_key="
            + process.env.AEMET_KEY)
            .then((res) => res.json())
            .then((res) => {
                fetch(res.datos)
                    .then((res2) => res2.json())
                    .then((res2) => {
                        weatherData = res2
                    })
                    .catch((error) => {
                        console.log(error);
                        ;
                    })
            })
            .catch((error2) => {
                console.log(error2);
            });

    }
    app.get(BASE_API_PATH + "/weather", function (req, res) {
        return res.send(weatherData);
    })

    // Trackcorona OpenData Covid-19 disease stats ()
    app.use('/api/v3/integrations/covid', function (req, res) {
        var url = 'https://www.trackcorona.live/api/countries';
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });




    if (process.env.AEMET_KEY != undefined) {
        loadAemetData();
    };
    loadGroup1Data();

};
