// Student: Jorge Marín Cordero 
// Resource: foundsresearchsources-stats

//Define API endpoint
var BASE_API_PATH = "/api/v1";
var JMC_ENDPOINT = "/foundsresearchsources-stats";

//Create database
var Datastore = require("nedb");
var foundsResearchSourcesDB = new Datastore();
var DATABASE_ERR_MSSG = "Database error in foundsresearchsources-stats API:\n";

//Instantiate paperwork for JSON validation
var paperwork = require("paperwork");

//Define validation schema
var foundsResearchSourcesSchema = {

    "country": String,
    "year": Number,
    "percentage_of_government_funding": Number,
    "percentage_of_private_financing": Number,
    "percentage_of_non_profit_funding": Number


};

//Initial data for foundsresearchsources-stats
var jmcInitialData = [
    {
        "country": "belgium",
        "year": 2015,
        "percentage_of_government_funding": 22.5,
        "percentage_of_private_financing": 58.6,
        "percentage_of_non_profit_funding": 0.4,


    },
    {
        "country": "denmark",
        "year": 2015,
        "percentage_of_government_funding": 30.2,
        "percentage_of_private_financing": 59.1,
        "percentage_of_non_profit_funding": 4.4,


    },
    {
        "country": "germany",
        "year": 2015,
        "percentage_of_government_funding": 27.9,
        "percentage_of_private_financing": 65.7,
        "percentage_of_non_profit_funding": 0.3,


    },
    {
        "country": "ireland",
        "year": 2015,
        "percentage_of_government_funding": 26.1,
        "percentage_of_private_financing": 48.7,
        "percentage_of_non_profit_funding": 06,


    },
    {
        "country": "greece",
        "year": 2015,
        "percentage_of_government_funding": 53.1,
        "percentage_of_private_financing": 31.4,
        "percentage_of_non_profit_funding": 0.4,


    }

];

foundsResearchSourcesDB.insert(jmcInitialData);


module.exports.init = (app) => {

    //GET /api/v1/foundsresearchsources-stats/loadInitialData"
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/loadInitialData", function (req, res) {

        if (foundsResearchSourcesDB.getAllData().length == 0) {

            foundsResearchSourcesDB.insert(jmcInitialData);
            console.log("Dataset loaded sucessfully!!")
            res.status(200).send("Data created sucessfully!!");

        } else {

            res.sendStatus(409);
        }

    });

    //GET /api/v1/foundsresearchsources-stats
    //GET /api/v1/foundsresearchsources-stats?country=COUNTRY&year=YEAR&percentage_of_government_funding=PERC..
    app.get(BASE_API_PATH + JMC_ENDPOINT, function (req, res) {
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
        if (req.query.percentage_of_government_funding) query["percentage_of_government_funding"] = parseFloat(req.query.percentage_of_government_funding);
        if (req.query.percentage_of_private_financing) query["percentage_of_private_financing"] = parseFloat(req.query.percentage_of_private_financing);
        if (req.query.percentage_of_non_profit_funding) query["percentage_of_non_profit_funding"] = parseFloat(req.query.percentage_of_non_profit_funding);

        foundsResearchSourcesDB.find(query).sort({ country: 1, year: -1 }).skip(offset).limit(limit).exec(function (err, resources) {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (resources.length != 0) {
                    var resourcesToSend = resources.map(function (r) {
                        return {
                            country: r.country,
                            year: r.year,
                            percentage_of_government_funding: r.percentage_of_government_funding,
                            percentage_of_private_financing: r.percentage_of_private_financing,
                            percentage_of_non_profit_funding: r.percentage_of_non_profit_funding
                        }
                    });

                    // res.status(200).send(JSON.stringify(resourcesToSend, null, 2));
                    if(resourcesToSend.length==1){
                        res.status(200).send(resourcesToSend[0]);  
                    }else{
                        res.status(200).send(resourcesToSend);
                    }
                    
                } else {
                    res.sendStatus(404);
                }

            }

        });
    });


    //POST /api/v1/foundsresearchsources-stats
    app.post(BASE_API_PATH + JMC_ENDPOINT, paperwork.accept(foundsResearchSourcesSchema), function (req, res) {

        var newResource = req.body;

        foundsResearchSourcesDB.find({
            country: newResource.country,
            year: newResource.year
        }, function (err, resource) {

            if (err) {

                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);

            } else {

                if (resource.length == 0) {

                    foundsResearchSourcesDB.insert(newResource);
                    console.log("New resource added:\n" + JSON.stringify(newResource, null, 2));
                    res.sendStatus(201);

                } else {

                    console.log("The resource:\n" + JSON.stringify(newResource, null, 2) + "\nExist on database");
                    res.sendStatus(409);
                }


            }
        });
    });

    //GET /api/v1/foundsresearchsources-stats/country/year
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", function (req, res) {
        foundsResearchSourcesDB.find({ country: req.params.country, year: parseInt(req.params.year) }, function (err, resource) {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);

            } else {
                if (resource.length != 0) {
                    var resourceToSend = resource.map(function (r) {
                        return {
                            country: r.country,
                            year: r.year,
                            percentage_of_government_funding: r.percentage_of_government_funding,
                            percentage_of_private_financing: r.percentage_of_private_financing,
                            percentage_of_non_profit_funding: r.percentage_of_non_profit_funding
                        }
                    });
                    // res.status(200).send(JSON.stringify(resourceToSend, null, 2));
                    if(resourceToSend.length==1){
                        res.status(200).send(resourceToSend[0]);  
                    }else{
                        res.status(200).send(resourceToSend);
                    }
                    
                } else {
                    res.sendStatus(404);
                }
            }
        });

    });

    //DELETE /api/v1/foundsresearchsources-stats/country/year
    app.delete(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", function (req, res) {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        foundsResearchSourcesDB.remove({ country: country, year: year }, {}, function (err, numRemoved) {
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

    //PUT /api/v1/foundsresearchsources-stats/country/year
    app.put(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", paperwork.accept(foundsResearchSourcesSchema), function (req, res) {

        var country = req.params.country;
        var year = parseInt(req.params.year);
        var dataToUpdate = req.body;

        foundsResearchSourcesDB.update(
            {
                country: country,
                year: year
            },
            {
                $set: {

                    percentage_of_government_funding: dataToUpdate.percentage_of_government_funding,
                    percentage_of_private_financing: dataToUpdate.percentage_of_private_financing,
                    percentage_of_non_profit_funding: dataToUpdate.percentage_of_non_profit_funding
                }
            }
            , {}, function (err, updateResource) {
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


    //POST /api/v1/foundsresearchsources-stats/country/year (NOT ALLOWED)
    app.post(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", function (req, res) {
        res.status(405).send("Method not allowed!!");
    });

    //PUT /api/v1/foundsresearchsources-stats(NOT ALLOWED)
    app.put(BASE_API_PATH + JMC_ENDPOINT, function (req, res) {
        res.status(405).send("Method not allowed!!");
    });

    //DELETE /api/v1/foundsresearchsources-stats
    app.delete(BASE_API_PATH + JMC_ENDPOINT, (req, res) => {

        foundsResearchSourcesDB.remove({}, { multi: true }, function (err, numRemoved) {
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
};