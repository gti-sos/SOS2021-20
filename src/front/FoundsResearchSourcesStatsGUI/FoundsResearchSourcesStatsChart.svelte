<script>
    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v1/foundsresearchsources-stats";

    async function loadGraph() {
        const resData = await fetch(API_PATH);

        let foundsResearchSourcesStatsData = await resData.json();
        let foundsResearchSourcesStatsData2 = foundsResearchSourcesStatsData;

        let countries = Array.from(
            new Set(
                foundsResearchSourcesStatsData.map((d) => {
                    return d.country;
                })
            )
        );

        foundsResearchSourcesStatsData = foundsResearchSourcesStatsData.map(
            (d) => {
                return [
                    countries.indexOf(d.country),
                    d.year,
                    d["percentage_of_government_funding"],
                    d["percentage_of_private_financing"],
                    d["percentage_of_non_profit_funding"],
                ];
            }
        );

        let chartData = foundsResearchSourcesStatsData.map(function (set, i) {
            return {
                name: countries[set[0]],
                data: set,
                shadow: false,
            };
        });

        Highcharts.chart("container", {
            chart: {
                type: "spline",
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 3,
                },
            },
            title: {
                text: "",
            },
            lang: {
                viewFullscreen: "Ver en pantalla completa",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadPNG: "Descargar en formato JPEG",
                downloadSVG: "Descargar en formato JPEG",
                exitFullscreen: "Salir de pantalla completa",
                printChart: "Imprimir gráfico",
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false,
                            },
                        },
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0,
                            },
                        },
                    },
                    events: {
                        mouseOver: function () {
                            this.group.toFront();
                        },
                    },
                },
            },
            tooltip: {
                pointFormat:
                    '<span style="color:{point.color}">\u25A0 </span>' +
                    "{series.name}: <b>{point.formattedValue}</b><br/>",
            },
            xAxis: {
                categories: [
                    "País",
                    "Año",
                    "Porcentaje financiación estatal",
                    "Porcentaje financiación privado",
                    "Porcentaje financiación ongs",
                ],
            },
            yAxis: [
                {
                    categories: countries,
                    tooltipValueFormat: "{value}",
                },
                {
                    min: 2014,
                    tooltipValueFormat: "{value}",
                },
                {
                    min: 0,
                    max:100,
                    tooltipValueFormat: "{value} %",
                },
                {
                    min: 0,
                    max:100,
                    tooltipValueFormat: "{value} %",
                },
                {
                    min: 0,
                    max:100,
                    tooltipValueFormat: "{value} %",
                },
            ],
            colors: ["rgb(14, 29, 236)"],
            series: chartData,
        });
        var chartData2=[];
        foundsResearchSourcesStatsData2 = foundsResearchSourcesStatsData2.map(
            (d) => {
                chartData2.push({
                    group: countries.indexOf(d.country),
                    x: String(d.year + "-01-0" + countries.indexOf(d.country)),
                    y: d["percentage_of_government_funding"],
                    label: { content: "%Gubernamental ("+d.country+")",xOffset: 20,
            yOffset: 20,},
                });

                chartData2.push( {
                    group: countries.indexOf(d.country),
                    x: String(d.year + "-01-0" + countries.indexOf(d.country)),
                    y: d["percentage_of_private_financing"],
                    label: { content: "%Privada ("+d.country+")",xOffset: 20,
            yOffset: 20,},
                });

                chartData2.push( {
                    group: countries.indexOf(d.country),
                    x: String(d.year + "-01-0" + countries.indexOf(d.country)),
                    y: d["percentage_of_non_profit_funding"],
                    label: { content: "%ONGs ("+d.country+")",xOffset: 20,
            yOffset: 20,},
                });
            }
            
        );
        var container = document.getElementById("visualization2");
        var items = chartData2;

        var groups = new vis.DataSet();

        var dataset = new vis.DataSet(items);
        var options = {
            start: "2014-01-01",
            end: "2019-01-01",
            style: "bar",
            drawPoints: {
                onRender: function (item, group, grap2d) {
                    return item.label != null;
                },
                style: "circle",
            },
        };

        var graph2d = new vis.Graph2d(container, dataset, groups, options);
    }

    loadGraph();
</script>

<main>
    <h4>
        REPRESENTACIÓN VISUAL DE LOS DATOS PARA LAS PRINCIPALES FUENTES DE
        FINANCIACIÓN DE LA INVESTIGACIÓN
    </h4>
    <p>
        Los gráficos detallan las principales fuentes de financiación de la
        investigación en el conjunto de los países de la Unión Europea entre
        los años 2014 y 2018
    </p>
    <figure class="highcharts-figure">
        <h5> Gráfico con Higcharts (Tipo Spline)</h5>
        <div id="container" />
        
    </figure>
    <div id="container2">
        <h5> Gráfico con librería escogida (Vis.js)</h5>
        <div id="visualization2" />
    </div>
    
   
    <p>
        Estos widgets han sido desarrollados por <a
            href="https://github.com/JorgeMarinC">Jorge Marín Cordero</a
        >
    </p>
    <div class="text-center">
        <Button style="margin-bottom: 4em;" color="secondary" on:click={pop}
            >Volver</Button
        >
    </div>
</main>

<style>
    h4,h5 {
        color: rgba(0, 0, 0, 0.7);
        margin-top: 2em;
        text-align: center;
    }
    p {
        text-align: center;
        margin-bottom: 0.5em;
        margin-top: 1em;
        opacity: 0.7;
        font-size: 0.8em;
    }
    #container,#container2 {
        padding-left: 15em;
        padding-right: 15em;
        margin-top: 2em;
    }
</style>
