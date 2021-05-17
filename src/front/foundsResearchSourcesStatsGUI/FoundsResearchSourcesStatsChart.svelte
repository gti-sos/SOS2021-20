<script>
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v1/foundsresearchsources-stats";

    async function loadGraph() {
        const resData = await fetch(API_PATH);

        let foundsResearchSourcesStatsData = await resData.json();   
    
        let countries = Array.from(new Set(foundsResearchSourcesStatsData.map((d) => {return d.country;})));


        foundsResearchSourcesStatsData = foundsResearchSourcesStatsData.map((d) => {
            return [countries.indexOf(d.country), d.year, d["percentage_of_government_funding"], d["percentage_of_private_financing"], d["percentage_of_non_profit_funding"]]; 
        });

        let chartData = foundsResearchSourcesStatsData.map(function (set, i) {
            return {
                name: countries[set[0]],
                data: set,
                shadow: false
            };
        });

        Highcharts.chart('container', {
            chart: {
                type: 'spline',
                parallelCoordinates: true,
                parallelAxes: {
                    lineWidth: 3
                }
            },
            title: {
                text: ''
            },
            lang: {
                viewFullscreen:"Ver en pantalla completa",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadPNG:"Descargar en formato JPEG",
                downloadSVG:"Descargar en formato JPEG",
                exitFullscreen:"Salir de pantalla completa",
  	            printChart: 'Imprimir gráfico',
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: {
                                size: 0
                            }
                        }
                    },
                    events: {
                        mouseOver: function () {
                            this.group.toFront();
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25A0 </span>' +
                    '{series.name}: <b>{point.formattedValue}</b><br/>'
            },
            xAxis: {
                categories: [
                    'País',
                    'Año',
                    'Porcentaje financiación estatal',
                    'Porcentaje financiación privado',
                    'Porcentaje financiación ongs'
                ]
            },
            yAxis: [
            {
                categories: countries,
                tooltipValueFormat: '{value}'
            },
            {
                min: 2014,
                tooltipValueFormat: '{value}'
            }, {
                min: 0,
                tooltipValueFormat: '{value} %'
            }, {
                min: 0,
                tooltipValueFormat: '{value} %'
            },{
                min: 0,
                tooltipValueFormat: '{value} %'
            }],
            colors: ['rgb(14, 29, 236)'],
            series: chartData
        });
    }
    loadGraph();
</script>

<main>
    <h4>REPRESENTACIÓN VISUAL DE LOS DATOS PARA LAS PRINCIPALES FUENTES DE FINANCIACIÓN DE LA INVESTIGACIÓN</h4>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p>El gráfico detalla las principales fuentes de financiación de la investigación en el conjunto de los países de la Unión Europea entre los años 2014 y 2018</p> 
    </figure>
        <div class="text-center">
        <Button style="margin-bottom: 4em;" color="secondary" on:click="{pop}">Volver</Button>
        </div>
</main>

<style>

    h4{
        color: rgba(0, 0, 0, 0.7);
        margin-top: 2em;
        text-align: center;
    }
    p{
        text-align: center;
        margin-bottom: 2em;
        margin-top: 1em;
        opacity: 0.7;
        font-size: 0.8em;
    }
    #container{
        padding-left: 15em;
        padding-right: 15em;
        margin-top: 7em;
        
    }
    
</style>