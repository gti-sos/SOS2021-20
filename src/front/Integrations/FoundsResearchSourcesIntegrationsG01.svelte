<script>
    import { onMount } from "svelte";

    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    const API_PATH = "/api/v3/integrations";

    const spanish = {
        viewFullscreen: "Ver en pantalla completa",
        downloadJPEG: "Descargar en formato JPEG",
        downloadPDF: "Descargar en formato PDF",
        downloadPNG: "Descargar en formato JPEG",
        downloadSVG: "Descargar en formato JPEG",
        exitFullscreen: "Salir de pantalla completa",
        printChart: "Imprimir gráfico",
    };

    async function lifeStatsIntegration() {
        //Integration with group 1
        const lifeStatsData = await fetch(API_PATH + "/life-stats");
        const foundsData = await fetch(
            "/api/v4/foundsresearchsources-stats?year=2018"
        );
        let lifeStats = await lifeStatsData.json();
        let foundsStats = await foundsData.json();
        let countries = [];
        let privFound = [];
        let govFound = [];
        let lifeQuality = [];

        // First iterates over biggest array
        lifeStats.forEach((life) => {
            // Then we do the same with the smallest one
            foundsStats.forEach((founds) => {
                // Only retrieve data for the same country on the same year,
                // we format data to lowercase to normalize it
                if (
                    life["country"].toLowerCase() ===
                        founds["country"].toLowerCase() &&
                    life.date === founds.year
                ) {
                    // Get properties and insert on the final array
                    countries.push(life.country);
                    privFound.push(founds.percentage_of_private_financing);
                    govFound.push(founds.percentage_of_government_funding);
                    lifeQuality.push(life.quality_life_index);
                }
            });
        });

        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            lang: spanish,
            title: {
                text: "Gráfica de tipo Column",
            },
            xAxis: {
                categories: countries,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "",
                },
            },
            tooltip: {
                pointFormat:
                    '<span style="color:{series.color}"><b>{series.name}</b></span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true,
            },
            plotOptions: {
                column: {
                    stacking: "percent",
                },
            },
            series: [
                {
                    name: "Porcentaje financiación privada",
                    color:"#eb2310",
                    data: privFound,
                },
                {
                    name: "Porcentaje financiación gubernamental",
                    color:"#00a80e",
                    data: govFound,
                },
                {
                    name: "Índice de caliad de vida",
                    color: "#0066FF",
                    data: lifeQuality,
                },
            ],
        });
    }
onMount(lifeStatsIntegration);
</script>

<main>
    <h4>INTEGRACIÓN CON GRUPO 01</h4>
    <p>
        En este widget se muestra la integración de los datos referentes al
        porcentaje de financiación de la investigación y desarrollo proviniente
        de diversas fuentes,<br /> con los datos del grupo 01 referentes al índice de calidad de vida.
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
