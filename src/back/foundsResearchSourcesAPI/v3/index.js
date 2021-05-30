// Student: Jorge Marín Cordero 
// Resource: foundsresearchsources-stats

//Define API endpoint
var BASE_API_PATH = "/api/v3/integrations";

const fetch = require('node-fetch');
const { get } = require('request');
var request = require('request');
const { dataset_dev } = require('svelte/internal');


module.exports.init = (app) => {

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
                        console.log(res2);
                        return res2;
                    })
                    .catch((error) => {
                        console.log(error);
                        return {};
                    })
            })
            .catch((error2) => {
                console.log(error2);
                return {};
            });

    }

    app.get(BASE_API_PATH + "/weather", function (req, res) {

        return res.send(loadAemetData());
    })
};
