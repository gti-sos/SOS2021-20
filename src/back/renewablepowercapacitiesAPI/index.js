// Student: Álvaro Caro Jiménez
// Resource: renewablepowercapacities-stats

//Define API endpoint
var BASE_API_PATH = "/api/v1";
var JMC_ENDPOINT = "/renewablepowercapacities-stats";

//Create database
var Datastore = require("nedb");
var renewablepowercapacitiesDB = new Datastore();
var DATABASE_ERR_MSSG = "Database error in renewablepowercapacities-stats API:\n";

//Initial data for renewablepowercapacities-stats
var jmcInitialData = [
    {
        "country": "germany",
        "year": 2018,
        "solar_production_in_megawatts": 14586736,
        "hydraulic_production_in_megawatts": 16799700,
        "wind_power_production_in_megawatts": 15060000,


    },
    {
        "country": "belgium",
        "year": 2018,
        "solar_production_in_megawatts": 4000000,
        "hydraulic_production_in_megawatts": 1417500,
        "wind_power_production_in_megawatts": 3267900,


    },
    {
        "country": "czechia",
        "year": 2018,
        "solar_production_in_megawatts": 2075.072,
        "hydraulic_production_in_megawatts": 2264.019,
        "wind_power_production_in_megawatts": 316.200,


    }
];


module.exports.init = (app) => {

    //GET /api/v1/renewablepowercapacities-stats/loadInitialData"
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/loadInitialData", (req, res) => {

        if (renewablepowercapacitiesDB.getAllData().length == 0) {
            renewablepowercapacitiesDB.insert(jmcInitialData);
            res.status(200).send("Data created sucessfully!!");
        } else {
            res.sendStatus(409);
        }

    });

    //GET /api/v1/renewablepowercapacities-stats
    //GET /api/v1/renewablepowercapacities-stats?country=country&year=year&...
    app.get(BASE_API_PATH + JMC_ENDPOINT, (req, res) => {
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
        if (req.query.solar_production_in_megawatts) query["solar_production_in_megawatts"] = parseFloat(req.query.solar_production_in_megawatts);
        if (req.query.hydraulic_production_in_megawatts) query["hydraulic_production_in_megawatts"] = parseFloat(req.query.hydraulic_production_in_megawatts);
        if (req.query.wind_power_production_in_megawatts) query["wind_power_production_in_megawatts"] = parseFloat(req.query.wind_power_production_in_megawatts);

        renewablepowercapacitiesDB.find(query).sort({ country: 1, year: -1 }).skip(offset).limit(limit).exec((err, resources) => {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (resources.length != 0) {
                    var resourcesToSend = resources.map((r) => {
                    return {
                        country: r.country,
                        year: r.year,
                        solar_production_in_megawatts: r.solar_production_in_megawatts,
                        hydraulic_production_in_megawatts: r.hydraulic_production_in_megawatts,
                        wind_power_production_in_megawatts: r.wind_power_production_in_megawatts
                        }
                    });
           
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


    //POST /api/v1/renewablepowercapacities-stats
    app.post(BASE_API_PATH + JMC_ENDPOINT, (req, res) => {
        var newResource = req.body;

        renewablepowercapacitiesDB.find({
            country: newResource.country, year: newResource.year,
            solar_production_in_megawatts: newResource.solar_production_in_megawatts,
            hydraulic_production_in_megawatts: newResource.hydraulic_production_in_megawatts,
            wind_power_production_in_megawatts: newResource.wind_power_production_in_megawatts
        }, (err, resource) => {

            if (err) {

                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);

            } else {

                if (resource.length == 0) {

                    if(!newResource.country || !newResource.solar_production_in_megawatts || !newResource.hydraulic_production_in_megawatts || !newResource.wind_power_production_in_megawatts){

                        res.sendStatus(400);

                    }else{
                        renewablepowercapacitiesDB.insert(newResource);
                        console.log("New resource added: " + JSON.stringify(newResource, null, 2));
                        res.sendStatus(201);
                    }
                    

                } else {

                    console.log("The resource exist on database");
                    res.sendStatus(409);
                }


            }
        });
    });

    //GET /api/v1/renewablepowercapacities-stats/country/year
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", (req, res) => {
        renewablepowercapacitiesDB.find({ country: req.params.country, year: parseInt(req.params.year) }, (err, resource) => {
            if (err) {
                console.error(DATABASE_ERR_MSSG + err);
                res.sendStatus(500);
            } else {
                if (resource.length != 0) {
                        var resourceToSend = resource.map((r) => {
                            return {
                                country: r.country,
                                year: r.year,
                                solar_production_in_megawatts: r.solar_production_in_megawatts,
                                hydraulic_production_in_megawatts: r.hydraulic_production_in_megawatts,
                                wind_power_production_in_megawatts: r.wind_power_production_in_megawatts
                            }
                        });
               // res.status(200).send(JSON.stringify(resourcesToSend[0], null, 2));
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

    //DELETE /api/v1/renewablepowercapacities-stats/country/year
    app.delete(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        renewablepowercapacitiesDB.remove({ country: country, year: year }, {}, function (err, numRemoved) {
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

    //PUT /api/v1/renewablepowercapacities-stats/country/year
    app.put(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", function (req, res) {

        var country = req.params.country;
        var year = parseInt(req.params.year);
        var dataToUpdate = req.body;

        renewablepowercapacitiesDB.update(
            {
                country: country,
                year: year
            },
            {
                $set: {

                    solar_production_in_megawatts: dataToUpdate.solar_production_in_megawatts,
                    hydraulic_production_in_megawatts: dataToUpdate.hydraulic_production_in_megawatts,
                    wind_power_production_in_megawatts: dataToUpdate.wind_power_production_in_megawatts
                }
            }
            , {}, (err, updateResource) => {
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


    //POST /api/v1/renewablepowercapacities-stats/country/year (NOT ALLOWED)
    app.post(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", function (req, res) {
        res.status(405).send("Method not allowed!!");
    });

    //PUT /api/v1/renewablepowercapacities-stats(NOT ALLOWED)
    app.put(BASE_API_PATH + JMC_ENDPOINT, function (req, res) {
        res.status(405).send("Method not allowed!!");
    });

    //DELETE /api/v1/renewablepowercapacities-stats
    app.delete(BASE_API_PATH + JMC_ENDPOINT, (req, res) => {

        renewablepowercapacitiesDB.remove({}, { multi: true }, function (err, numRemoved) {
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