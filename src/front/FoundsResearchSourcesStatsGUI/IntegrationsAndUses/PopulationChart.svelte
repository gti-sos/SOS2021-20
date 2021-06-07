<script>
    import { onMount } from "svelte";

    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v3/integrations/spain-population";
    const spanish ={
                viewFullscreen: "Ver en pantalla completa",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadPNG: "Descargar en formato JPEG",
                downloadSVG: "Descargar en formato JPEG",
                exitFullscreen: "Salir de pantalla completa",
                printChart: "Imprimir Mapa",
            };
    async function loadGraph() {
        const spainData = await fetch(API_PATH);

        let dataAsJson = await spainData.json();
        let popData = dataAsJson.map((d) => {
            let res = {
                name: d.name,
                lat: d.coordinates.latitude,
                lon: d.coordinates.longitude,
                population: d.population,
            };
            return res;
        });

        // Initiate the chart
        Highcharts.mapChart("container", {
            chart: {
                map: "countries/es/es-all",
            },

            title: {
                text: "Población de las principales ciudades y comunidades autónomas de España",
            },
            subtitle: {
                text: 'Estos datos son posibles gracias a la API abierta que proporciona <a href="https://www.spott.dev/" target="_blank">Spott</a>',
            },
            lang:spanish,
            mapNavigation: {
                enabled: true,
            },

            tooltip: {
                headerFormat: "",
                pointFormat:
                    "<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}<br> Población: <b>{point.population}</b> hab",
            },

            series: [
                {
                    // Use the es-all map with no data as a basemap
                    name: "Basemap",
                    borderColor: "#A0A0A0",
                    nullColor: "rgba(200, 200, 200, 0.3)",
                    showInLegend: false,
                },
                {
                    name: "Separators",
                    type: "mapline",
                    nullColor: "#707070",
                    showInLegend: false,
                    enableMouseTracking: false,
                },
                {
                    // Specify points using lat/lon
                    type: "mappoint",
                    name: "Ciudades",
                    color: Highcharts.getOptions().colors[1],
                    data: popData,
                },
            ],
        });
    }
    onMount(loadGraph);
</script>

<main>
    <!-- <div id="container" /> -->

    <h4>USO DE API EXTERNA #4</h4>
    <p>
        En este widget se muestran el número de habitantes de las principales ciudades y comunidades autónomas de España<br />
        
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
        <Button style="margin-bottom: 3em;" color="secondary" on:click={pop}
            >Volver</Button
        >
    </div>
</main>

<style>
    #container {
        height: 600px;
        min-width: 410px;
        max-width: 1200px;
        margin: 0 auto;
    }
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
</style>
