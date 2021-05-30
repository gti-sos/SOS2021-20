<script>
    import { onMount } from "svelte";
    import { pop, push } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v3/integrations/weather";

    async function loadChart() {
        const bikesData = await fetch(API_PATH);
        let dataAsJson = await bikesData.json();

        let averageTemp = dataAsJson.map((d) => {
            let res = {
                x: d.fecha,
                y: parseFloat(d.tmed),
                group: 0,
            };
            return res;
        });

        let minTemp = dataAsJson.map((d) => {
            let res = {
                x: d.fecha,
                y: parseFloat(d.tmin),
                group: 1,
            };
            return res;
        });
        let maxTemp = dataAsJson.map((d) => {
            let res = {
                x: d.fecha,
                y: parseFloat(d.tmax),
                group: 2,
            };
            return res;
        });

        var groups = new vis.DataSet();

        var container = document.getElementById("visualization");
        var items = averageTemp.concat(minTemp).concat(maxTemp);

        var today = new Date();
        var startDate =
            today.getFullYear() + "-" + (today.getMonth() + 1) + "-01";
        var endDate =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        var dataset = new vis.DataSet(items);
        var options = {
            dataAxis: { showMinorLabels: true },
            legend: { left: { position: "bottom-left" } },
            start: startDate,
            end: endDate,
        };
        var graph2d = new vis.Graph2d(container, dataset, groups, options);
    }
    onMount(loadChart);
</script>

<main>
    <h4>USO DE API EXTERNA #2</h4>

    <p>
        En este widget se muestran los datos meteorológicos recogidos por una
        estación perteneciente a la red de estaciones de la agencia estatal de
        meteorología, concretamente la estación Sevilla, Aeropuerto (E317) <br
        />
        También puede consultar los datos en bruto.
    </p>
    <figure class="highcharts-figure mr-sm-2">
        <div id="visualization" />
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
            on:click={() => push("#/integrations/weather/rawData")}
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
        margin-top: 2em;
        text-align: center;
    }
    p {
        text-align: center;
        margin-bottom: 2em;
        margin-top: 1em;
        opacity: 0.7;
        font-size: 0.8em;
    }
    #visualization {
        padding-left: 15em;
        padding-right: 15em;
        margin-top: 7em;
    }
</style>
