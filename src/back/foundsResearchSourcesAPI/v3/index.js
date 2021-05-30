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

    function loadInitialData() {
        request.get("https://sos2021-01.herokuapp.com/api/v2/life-stats/loadInitialData", (error, resp, body) => {
            console.log(resp.status);
        });
    }

    // Integration with Group 1
    app.use('/api/v2/life-stats', function (req, res) {
        loadInitialData();
        var url = 'https://sos2021-01.herokuapp.com' + req.baseUrl + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
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
    var data=[];
    function loadAemetData() {
        var today = new Date();
        var startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-01';
        var endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        fetch("https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/"
            + startDate + "T00%3A00%3A00UTC/fechafin/" + endDate + "T00%3A00%3A00UTC/estacion/5783?api_key="
            + process.env.AEMET_KEY)
            .then((res) => res.json())
            .then((res) => {
                fetch(res.datos)
                    .then((res2) => res2.json())
                    .then((res2) => {
                        data = res2
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

    // Trackcorona OpenData Covid-19 disease stats ()
    app.use('/api/v3/integrations/covid', function (req, res) {
        var url = 'https://www.trackcorona.live/api/countries'; 
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });
    app.get(BASE_API_PATH + "/weather", function (req, res) {
        return res.send(data);
    })
    loadAemetData();
};
