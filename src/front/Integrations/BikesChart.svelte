<script>
    import { onMount } from "svelte";

    import { pop, push } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v3/integrations/bikes";

    async function loadGraph() {
        const bikesData = await fetch(API_PATH);

        let dataAsJson = await bikesData.json();

        let nBikes = dataAsJson.map((d) => {
            let res = d.available_bikes;
            return res;
        });
        let nStands = dataAsJson.map((d) => {
            let res = d.available_bike_stands;
            return res;
        });

        // Create the chart
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Datos en tiempo real de la red de estaciones Sevici",
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
            subtitle: {
                text: 'Estos datos son posibles gracias a la API abierta que proporciona <a href="https://developer.jcdecaux.com/#/home" target="_blank">JCDecaux developer</a>',
            },
            accessibility: {
                announceNewData: {
                    enabled: true,
                },
            },
            xAxis: {
                type: "category",
            },
            yAxis: {
                title: {
                    text: "Datos en tiempo real",
                },
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: "{point.y}",
                    },
                },
            },

            tooltip: {
                headerFormat:
                    '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat:
                    '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}<br/>',
            },

            series: [
                {
                    name: "Sevici",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Bicicletas disponibles",
                            y: nBikes.reduce((a, b) => a + b, 0),
                            drilldown: "Bicicletas disponibles",
                        },
                        {
                            name: "Aparcamientos disponibles",
                            y: nStands.reduce((a, b) => a + b, 0),
                            drilldown: "Aparcamientos disponibles",
                        },
                        {
                            name: "Estaciones operativas",
                            y: dataAsJson.length,
                            drilldown: "Internet Explorer",
                        },
                    ],
                },
            ],
        });
    }
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
    <figure class="highcharts-figure">
        <div id="container" />
        <p>
            Este widget ha sido desarrollado por <a
                href="https://github.com/JorgeMarinC">Jorge Marín Cordero</a
            >
        </p>
    </figure>
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
        margin-bottom: 2em;
        margin-top: 1em;
        opacity: 0.7;
        font-size: 0.8em;
    }
    #container {
        padding-left: 15em;
        padding-right: 15em;
        margin-top: 3em;
    }
</style>
