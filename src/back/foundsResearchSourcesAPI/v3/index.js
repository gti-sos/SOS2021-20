// Student: Jorge Marín Cordero 
// Resource: foundsresearchsources-stats

//Define API endpoint
var BASE_API_PATH = "/api/v3";
var JMC_ENDPOINT = "/jmc/external";

//Create database
var Datastore = require("nedb");
var foundsResearchSourcesDB = new Datastore();
var DATABASE_ERR_MSSG = "Database error in foundsresearchsources-stats API:\n";

//Instantiate paperwork for JSON validation
var paperwork = require("paperwork");

var request = require('request');


module.exports.init = (app) => {

    //---------------- External APIs --------------------//
    
    // Bikesharing JC Decaux Seville
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/bikes", function (req, res) {
        request.get("https://api.jcdecaux.com/vls/v1/stations?contract=Seville&apiKey=" + process.env.JC_DECAUX_KEY , (error, resp, body) => {
            if (error) {
                return console.dir(error);
            }
            var bikeInfo = JSON.parse(body)
            let mBik = bikeInfo.map((d) => {
                let res = {
                    name: d.name,
                    value: d["bike_stands"]
                };
                return res;
            });
            return res.send(mBik)
        });


    });

};
