<script>
    import { onMount } from "svelte";
    import { pop, push } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v3/integrations/bikes";

    async function loadGraph() {
        const bikesData = await fetch(API_PATH);

        let dataAsJson = await bikesData.json();

        const nBikes = dataAsJson.map((d) => {
            let res = d.available_bikes;
            return res;
        });
        let nStands = dataAsJson.map((d) => {
            let res = d.available_bike_stands;
            return res;
        });

        // Create the chart
        var gaugeOptions = {
            chart: {
                type: "solidgauge",
            },

            title: null,

            pane: {
                center: ["50%", "85%"],
                size: "100%",
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor ||
                        "#EEE",
                    innerRadius: "60%",
                    outerRadius: "100%",
                    shape: "arc",
                },
            },

            exporting: {
                enabled: false,
            },

            tooltip: {
                enabled: false,
            },

            // the value axis
            yAxis: {
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: 70,
                },
                labels: {
                    y: 16,
                },
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true,
                    },
                },
            },
        };

        // Create Stations chart
        Highcharts.chart(
            "container-stations",
            Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 300,
                    stops: [
                        [270, "#55BF3B"], // green
                        [150, "#DDDF0D"], // yellow
                        [80, "#DF5353"], // red
                    ],
                    title: {
                        text: "Estaciones disponibles",
                    },
                },

                credits: {
                    enabled: false,
                },

                series: [
                    {
                        name: "Estaciones disponibles",
                        data: [dataAsJson.length],
                        dataLabels: {
                            format:
                                '<div style="text-align:center">' +
                                '<span style="font-size:25px">{y}</span><br/>' +
                                '<span style="font-size:12px;opacity:0.4">Operativas</span>' +
                                "</div>",
                        },
                        tooltip: {
                            valueSuffix: " Operativas",
                        },
                    },
                ],
            })
        );

        // Create Bikes chart
        Highcharts.chart(
            "container-bikes",
            Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 3000,
                    stops: [
                        [2000, "#55BF3B"], // green
                        [1000, "#DDDF0D"], // yellow
                        [500, "#DF5353"], // red
                    ],
                    title: {
                        text: "Bicicletas disponibles",
                    },
                },

                series: [
                    {
                        name: "Bicicletas disponibles",
                        data: [nBikes.reduce((a, b) => a + b, 0)],
                        dataLabels: {
                            format:
                                '<div style="text-align:center">' +
                                '<span style="font-size:25px">{y}</span><br/>' +
                                '<span style="font-size:12px;opacity:0.4">Disponibles</span>' +
                                "</div>",
                        },
                        tooltip: {
                            valueSuffix: "Disponibles",
                        },
                    },
                ],
            })
        );

        // Create Stands chart
        Highcharts.chart(
            "container-stands",
            Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 6000,
                    stops: [
                        [6000, "#55BF3B"], // green
                        [3000, "#DDDF0D"], // yellow
                        [500, "#DF5353"], // red
                    ],
                    title: {
                        text: "Estaciones Disponibles",
                    },
                },

                series: [
                    {
                        name: "Estaciones Disponibles",
                        data: [nStands.reduce((a, b) => a + b, 0)],
                        dataLabels: {
                            format:
                                '<div style="text-align:center">' +
                                '<span style="font-size:25px">{y}</span><br/>' +
                                '<span style="font-size:12px;opacity:0.4">Disponibles</span>' +
                                "</div>",
                        },
                        tooltip: {
                            valueSuffix: "Disponibles",
                        },
                    },
                ],
            })
        );
    }

    // Bring life to the dials
    setInterval(function () {
        loadGraph();
        console.log("Refreshing data");
    }, 60000);
    onMount(loadGraph);
</script>

<main>
    <h4>USO DE API EXTERNA #1</h4>
    <p>
        En este widget se muestra en tiempo real los datos de la red de
        estaciones de Sevici, se puede observar la cantidad de bicicletas,
        aparcamientos y estaciones disponibles en toda la red. <br />
        También puede consultar los datos en bruto.
    </p>
    <div class="row">
        <figure class="highcharts-figure col-4">
            <div id="container-stations" class="chart-container" />
        </figure>
        <figure class="highcharts-figure col-4">
            <div id="container-bikes" class="chart-container" />
        </figure>
        <figure class="highcharts-figure col-4">
            <div id="container-stands" class="chart-container" />
        </figure>
    </div>
    <p>
        Este widget ha sido desarrollado por <a
            href="https://github.com/JorgeMarinC">Jorge Marín Cordero</a
        >
    </p>
    <div class="text-center">
        <Button
            style="margin-bottom: 1em;"
            color="secondary"
            on:click={() => push("#/integrations/bikes/rawData")}
            >Ver los datos en bruto</Button
        >
    </div>
    <div class="text-center">
        <Button style="margin-bottom: 3em;" color="secondary" on:click={pop}
            >Volver</Button
        >
    </div>
</main>

<style>
    h4 {
        color: rgba(0, 0, 0, 0.7);
        margin-top: 1em;
        text-align: center;
    }
    p {
        text-align: center;
        margin-bottom: 3em;
        margin-top: 3em;
        opacity: 0.7;
        font-size: 0.8em;
    }
</style>
