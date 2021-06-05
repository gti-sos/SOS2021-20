<script>
    import { onMount } from "svelte";

    import { pop, push } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v3/integrations/covid";

    async function loadGraph() {
        const covidData = await fetch(API_PATH);

        let dataAsJson = await covidData.json();

        let covData = dataAsJson.data.map((d) => {
            let res = [d.country_code, d.dead];
            return res;
        });

        // Chart creation
        Highcharts.mapChart("container", {
            chart: {
                map: "custom/world-palestine-highres",
            },
            title: {
                text: "Fallecimientos por Covid-19 en todo el mundo",
            },
            subtitle: {
                text: 'Estos datos son posibles gracias a la API abierta que proporciona <a href="https://www.trackcorona.live/" target="_blank">TrackCorona</a>',
            },
            lang: {
                viewFullscreen: "Ver en pantalla completa",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadPNG: "Descargar en formato JPEG",
                downloadSVG: "Descargar en formato JPEG",
                exitFullscreen: "Salir de pantalla completa",
                printChart: "Imprimir Mapa",
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: "bottom",
                },
            },

            colorAxis: {
                min: 0,
            },

            series: [
                {
                    data: covData,
                    name: "Total Deaths",
                    states: {
                        hover: {
                            color: "#f20a0a",
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                    },
                },
            ],
        });

    }
    onMount(loadGraph);
    
</script>

<main>
    <!-- <div id="container" /> -->


    <h4>USO DE API EXTERNA #3</h4>
    <p>
        En este widget se muestran las muertes provocadas por la pandemia del Covid-19. <br />
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
            on:click={() => push("#/integrations/covid/rawData")}
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
