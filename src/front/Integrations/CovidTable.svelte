<script>
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    const API_PATH = "/api/v3/integrations/covid";
    let covidData = [];

    async function getData() {
        const response = await fetch(API_PATH);
        if (response.ok) {
            const res = await response.json();
            const returnedJson = res.data;
            if (typeof returnedJson.length == "undefined") {
                console.log("only one element!");
                covidData = [returnedJson];
            } else {
                covidData = returnedJson;
            }
            console.log("!" + covidData.length + ", Registers loaded!");
        } else {
            if (response.status == 404) {
                console.log("No data found");
            }
            covidData = [];
        }
    }

    onMount(getData);
</script>

<main>
    <h4>Datos Covid-19 en todo el mundo</h4>
    <p>
        Los datos son proporcionados por <a href="https://www.trackcorona.live/" target="_blank">TrackCorona</a>
    </p>
    <Table bordered responsive>
        <thead>
            <tr>
                <th>País</th>
                <th>Casos confirmados</th>
                <th>Recuperados</th>
                <th>Fallecimientos</th>
            </tr>
        </thead>
        <tbody>
            {#each covidData as row}
                <tr>
                    <td>{row.location}</td>
                    <td>{row.confirmed}</td>
                    <td>{row.recovered}</td>
                    <td>{row.dead}</td>
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
