
module.exports.init = (app) => {
    //Define API endpoint
    var BASE_API_PATH = "/api/v1";
    var JMC_ENDPOINT = "/foundsresearchsources-stats";

    var jmcData = [];

    //GET /api/v1/loadInitialData"
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/loadInitialData", (req, res) => {
        var jmcInitialData = [
            {
                "country": "Belgium",
                "year": 2015,
                "percentage-of-government-funding": 22.5,
                "percentage-of-private-financing": 58.6,
                "percentage-of-non-profit-funding": 0.4,


            },
            {
                "country": "Denmark",
                "year": 2015,
                "percentage-of-government-funding": 30.2,
                "percentage-of-private-financing": 59.1,
                "percentage-of-non-profit-funding": 4.4,


            }
        ];
        for (var item in jmcInitialData) {
            jmcData.push(jmcInitialData[item]);
        }
        res.status(200).send("Data created sucessfully!!");
    });

    //GET /api/v1/foundsresearchsources-stats
    app.get(BASE_API_PATH + JMC_ENDPOINT, (req, res) => {
        res.status(200).send(JSON.stringify(jmcData, null, 2));

    });

    //POST /api/v1/foundsresearchsources-stats
    app.post(BASE_API_PATH + JMC_ENDPOINT, (req, res) => {
        var newResource = req.body;
        jmcData.push(newResource);
        console.log("New resource added: " + JSON.stringify(newResource, null, 2));
        res.sendStatus(201);
    });

    //GET /api/v1/foundsresearchsources-stats/country/year
    app.get(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", (req, res) => {

        var requestedData = jmcData.filter(function (inputObj) {
            return inputObj.country == String(req.params.country) && inputObj.year == String(req.params.year);
        });
        res.status(200).send(JSON.stringify(requestedData, null, 2));
    });

    //DELETE /api/v1/foundsresearchsources-stats/country/year
    app.delete(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);

        for (var i = 0; i < jmcData.length; i++) {
            if (jmcData[i]["country"] === country && jmcData[i]["year"] === year) {
                jmcData.splice(i, 1);
                return res.status(200).send("Resource deleted sucessfully!!");

            }
        }

        return res.sendStatus(404);
    });

    //PUT /api/v1/foundsresearchsources-stats/country/year
    app.put(BASE_API_PATH + JMC_ENDPOINT + "/:country/:year", function (req, res) {

        var switchBreak = false;
        for (var x in jmcData) {

            if (jmcData[x].country == String(req.params.country) && jmcData[x].year == String(req.params.year)) {

                var inputData = req.body;
                jmcData[x] = inputData;
                switchBreak = true;
                break;
            }
        }

        if (!switchBreak) {
            res.status(404).send("¡Resource not found!");
        } else {
            res.status(200).send("¡Resource updated successfully");
        }
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
        datosJson = [];
        res.status(200).send("Data deleted successfully!!");
    });
};