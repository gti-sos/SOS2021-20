// Student: Jesús Guerra Adame 
// Resource: greenhousegasemissions-stats

const request = require("request");
//Define API endpoint
var BASE_API_PATH = "/api/v3";



//Create database
var Datastore = require("nedb");
var greenhousegasemissionsDB = new Datastore();
var DATABASE_ERR_MSSG = "Database error in greenhousegasemissions-stats API:\n";

//Instantiate paperwork for JSON validation
var paperwork = require("paperwork");

//Define validation schema
var greenhouseGasEmissionsSchema = {

    "country": String,
    "year": Number,
    "carbon_dioxide": Number,
    "methane": Number,
    "nitrous_oxide": Number


};


//Initial data for greenhousegasemissions-stats
var jga_initialData = [
    
    {
        "country": "spain",
        "year": 2014,
        "carbon_dioxide": 268715.85,
        "methane": 1516.41,
        "nitrous_oxide": 60.49,
    },
    {
        "country": "belgium",
        "year": 2014,
        "carbon_dioxide": 100861.37,
        "methane": 324.78,
        "nitrous_oxide": 20.86,
    },
    {
        "country": "italy",
        "year": 2014,
        "carbon_dioxide": 356890.98,
        "methane": 1756.25,
        "nitrous_oxide": 60.09,
    },
    {
        "country": "germany",
        "year": 2014,
        "carbon_dioxide": 817208.15,
        "methane": 2279.78,
        "nitrous_oxide": 128.46,
    },
    {
        "country": "spain",
        "year": 2015,
        "carbon_dioxide": 285789.74,
        "methane": 39191.8,
        "nitrous_oxide": 61.25,
    },
    {
        "country": "belgium",
        "year": 2015,
        "carbon_dioxide": 105373.1,
        "methane": 325.12,
        "nitrous_oxide": 20.38,
    },
    {
        "country": "italy",
        "year": 2015,
        "carbon_dioxide": 369661.74,
        "methane": 1755.41,
        "nitrous_oxide": 60.19,
    },
    {
        "country": "germany",
        "year": 2015,
        "carbon_dioxide": 820306.73,
        "methane": 2270.84,
        "nitrous_oxide": 130.53,
    },
    {
        "country": "spain",
        "year": 2016,
        "carbon_dioxide": 276468.5,
        "methane": 1566.11,
        "nitrous_oxide": 60.49,
    },
    {
        "country": "belgium",
        "year": 2016,
        "carbon_dioxide": 104184.36,
        "methane": 324.08,
        "nitrous_oxide": 19.46,
    },
    {
        "country": "italy",
        "year": 2016,
        "carbon_dioxide": 366857.64,
        "methane": 1736.04,
        "nitrous_oxide": 61.01,
    },
    {
        "country": "germany",
        "year": 2016,
        "carbon_dioxide": 826993.77,
        "methane": 2220.42,
        "nitrous_oxide": 127.8,
    },
    

];
greenhousegasemissionsDB.insert(jga_initialData);


module.exports.init = (app) => {

    //GET /api/v1/greenhousegasemissions-stats/loadInitialData"
    app.get(BASE_API_PATH + "/greenhousegasemissions-stats/loadInitialData", (req, res) => {

        if (greenhousegasemissionsDB.getAllData().length == 0) {
            greenhousegasemissionsDB.insert(jga_initialData);
            console.log("Dataset loaded sucessfully!!");
            res.status(200).send("Data loaded sucessfully!!");
        } else {
            res.sendStatus(409);
        }

    });

    //GET /api/v1/greenhousegasemissions-stats
    //GET /api/v1/greenhousegasemissions-stats?country=COUNTRY&year=YEAR&carbon-dioxide=CARBON-..
    app.get(BASE_API_PATH + "/greenhousegasemissions-stats", (req, res) => {
        let query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        // Pagination
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }

        // Search
        if (req.query.country) query["country"] = req.query.country;
        if (req.query.year) query["year"] = parseInt(req.query.year);
        if (req.query.carbon_dioxide) query["carbon_dioxide"] = parseFloat(req.query.carbon_dioxide);
        if (req.query.methane) query["methane"] = parseFloat(req.query.methane);
        if (req.query.nitrous_oxide) query["nitrous_oxide"] = parseFloat(req.query.nitrous_oxide);

        greenhousegasemissionsDB.find(query).sort({ country: 1, year: -1 }).skip(offset).limit(limit).exec((err, resources) => {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if(resources.length !=0){
                var resourcesToSend = resources.map((r) => {
                    return {
                        country: r.country,
                        year: r.year,
                        carbon_dioxide: r.carbon_dioxide,
                        methane: r.methane,
                        nitrous_oxide: r.nitrous_oxide
                    }
                });
                    if(resourcesToSend==1){
                    res.status(200).send(resourcesToSend[0]);
                    }else{
                    res.status(200).send(resourcesToSend);
                    }

                }else{
                res.sendStatus(404);
                }
            }
           
        });
    });


    //POST /api/v1/greenhousegasemissions-stats
    app.post(BASE_API_PATH +"/greenhousegasemissions-stats", paperwork.accept(greenhouseGasEmissionsSchema), function (req, res){
        var newResource = req.body;

        greenhousegasemissionsDB.find({
            country: newResource.country, 
            year: newResource.year
            
        }, function(err, resource) {

            if (err) {

                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);

            } else {

                if (resource.length == 0) {

                    greenhousegasemissionsDB.insert(newResource);
                    console.log("New resource added:\n " + JSON.stringify(newResource, null, 2));
                    res.sendStatus(201);

                } else {

                    console.log("The resource:\n" + JSON.stringify(newResource, null, 2) + "\nExist on database");
                    res.sendStatus(409);
                }


            }
        });
    });

    //GET /api/v1/greenhousegasemissions-stats/country/year
    app.get(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", (req, res) => {
        greenhousegasemissionsDB.find({ country: req.params.country, year: parseInt(req.params.year) }, (err, resource) => {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (resource.length != 0){
                var resourceToSend = resource.map((r) => {
                    return {
                        country: r.country,
                        year: r.year,
                        carbon_dioxide: r.carbon_dioxide,
                        methane: r.methane,
                        nitrous_oxide: r.nitrous_oxide
                    }
                });
                if (resourceToSend.length==1){
                    res.status(200).send(resourceToSend[0]);
                }else{
                    res.status(200).send(resourceToSend);
                }

                }else{
                    res.sendStatus(404);
                }
            }
        });

    });

    //DELETE /api/v1/greenhousegasemissions-stats/country/year
    app.delete(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", function(req, res) {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        greenhousegasemissionsDB.remove({ country: country, year: year }, {}, function (err, numRemoved) {
            if (err) {
                console.log(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (numRemoved == 0) {
                    res.sendStatus(404);
                } else {
                    console.log("Removed " + numRemoved + " registers from database");
                    res.status(200).send("Data deleted successfully!!");
                }
            }
        });


    });

    //PUT /api/v1/greenhousegasemissions-stats/country/year
    app.put(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", paperwork.accept(greenhouseGasEmissionsSchema), function (req, res){

        var country = req.params.country;
        var year = parseInt(req.params.year);
        var dataToUpdate = req.body;

        greenhousegasemissionsDB.update(
            {
                country: country,
                year: year
            },
            {
                $set: {
                    
                    carbon_dioxide: dataToUpdate.carbon_dioxide,
                    methane: dataToUpdate.methane,
                    nitrous_oxide: dataToUpdate.nitrous_oxide
                }
            }
            , {}, function(err, updateResource) {
                if (err) {
                    console.error("ERROR updating resource: " + err);
                    res.sendStatus(500);
                } else {
                    if (updateResource.length == 0) {
                        res.status(404).send("¡Resource not found!");
                    } else {
                        res.status(200).send("¡Resource updated successfully!");
                    }
                }

            });
    });


    //POST /api/v1/greenhousegasemissions-stats/country/year (NOT ALLOWED)
    app.post(BASE_API_PATH + "/greenhousegasemissions-stats/:country/:year", function (req, res) {
        res.status(405).send("Method not allowed!!");
    });

    //PUT /api/v1/greenhousegasemissions-stats(NOT ALLOWED)
    app.put(BASE_API_PATH + "/greenhousegasemissions-stats", function (req, res) {
        res.status(405).send("Method not allowed!!");
    });

    //DELETE /api/v1/greenhousegasemissions-stats
    app.delete(BASE_API_PATH + "/greenhousegasemissions-stats", function(req, res) {

        greenhousegasemissionsDB.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                console.log(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (numRemoved == 0) {
                    res.sendStatus(404);
                } else {
                    console.log("Removed " + numRemoved + " registers from database");
                    res.status(200).send("Data deleted successfully!!");
                }
            }
        });


    });

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

      
    
};
