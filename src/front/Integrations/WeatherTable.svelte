<script>
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    const API_PATH = "/api/v3/integrations/weather";
    let weatherData = [];

    async function getData() {
        const res = await fetch(API_PATH);

        if (res.ok) {
            const returnedJson = await res.json();

            if (typeof returnedJson.length == "undefined") {
                console.log("only one element!");
                weatherData = [returnedJson];
            } else {
                weatherData = returnedJson;
            }
            console.log("!" + weatherData.length + ", Registers loaded!");
        } else {
            if (res.status == 404) {
                console.log("No data found");
            }
            weatherData = [];
        }
        if (nextJson.status == 404) {
            existMoreData = false;
        } else {
            existMoreData = true;
        }
    }

    onMount(getData);
</script>

<main>
    <h4>Tempertaturas Sevilla en el último mes.</h4>
    <p>
        Los datos son proporcionados por <a
            href="http://www.aemet.es/es/datos_abiertos/AEMET_OpenData"
            target="_blank">AEMET</a
        > (Agencia Estatal de Meteorología)
    </p>
    <Table bordered responsive>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Temperatura media</th>
                <th>Temperatura mínima</th>
                <th>Temperatura máxima</th>
            </tr>
        </thead>
        <tbody>
            {#each weatherData as row}
                <tr>
                    <td>{row.fecha}</td>
                    <td>{row.tmed} ºC</td>
                    <td>{row.tmin} ºC</td>
                    <td>{row.tmax} ºC</td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <div class="text-center">
        <Button style="margin-bottom: 4em;" color="secondary" on:click={pop}
            >Volver</Button
        >
    </div>
</main>

<style>
    th {
        color: rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.2);
    }
    th,
    td {
        text-align: center;
    }
    thead {
        font-weight: bold;
    }

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
</style>
