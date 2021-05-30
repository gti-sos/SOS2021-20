<script>
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    const API_PATH = "/api/v3/integrations/bikes";
    let bikesData = [];

    async function getData() {
        const res = await fetch(API_PATH);

        if (res.ok) {
            const returnedJson = await res.json();

            if (typeof returnedJson.length == "undefined") {
                console.log("only one element!");
                bikesData = [returnedJson];
            } else {
                bikesData = returnedJson;
            }
            console.log("!" + bikesData.length + ", Registers loaded!");
        } else {
            if (res.status == 404) {
                console.log("No data found");
            }
            bikesData = [];
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
    <h4>DATOS RED DE ESTACIONES SEVICI EN BRUTO</h4>
    <p>
        Los datos son proporcionados por <a
            href="https://developer.jcdecaux.com/#/home"
            target="_blank">JCDecaux</a
        > la empresa encargada de su explotación y mantenimiento.
    </p>
    <Table bordered responsive>
        <thead>
            <tr>
                <th>Nº Estación</th>
                <th>Nombre estación</th>
                <th>Dirección</th>
                <th>Aparcamientos totales</th>
                <th>Aparcamientos disponibles</th>
                <th>Bicicletas disponibles</th>
            </tr>
        </thead>
        <tbody>
            {#each bikesData as row}
                <tr>
                    <td>{row.number}</td>
                    <td>{row.name}</td>
                    <td>{row.address}</td>
                    <td>{row.bike_stands}</td>
                    <td>{row.available_bike_stands}</td>
                    <td>{row.available_bikes}</td>
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
