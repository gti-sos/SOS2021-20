<script>

    import{onMount}from "svelte";
    import {pop} from "svelte-spa-router"
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let data = {};
    let carbon_dioxide = null ;
    let methane = null;
    let nitrous_oxide = null;
    let errorMsg = "";

    onMount(getData);

    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("/api/v1/greenhousegasemissions-stats" + "/"params.country + "/"params.year);

        if(res.ok){
            console.log("OK");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data.`);
        }else{
            console.log("Error!!");
        }
    }

    onMount(getData);

</script>
<main>
    <h3>Editar datos </h3>
    <Table bordered>
        <thead>
            <tr>
                <td>País</td>
                <td>Año</td>
                <td>Dióxido de carbono</td>
                <td>Metano</td>
                <td>Óxido de nitrógeno</td>
            </tr>
        </thead>
        <tbody>
            {#each data as onedata}
            <tr>
                <td>{onedata.country}</td>
                <td>{onedata.year}</td>
                <td>{onedata.carbon_dioxide}</td>
                <td>{onedata.methane}</td>
                <td>{onedata.nitrous_oxide}</td>
                <td><input bind:value="{updateData}"></td>
                <td><Button outline color="primary" on:click={updateData}>Actualizar</Button></td>
            </tr>
           {/each}
        </tbody>
    </Table>
</main>

<style>
    p{
        text-align: center;
    }
    td{
        text-align: center;
    }

    thead{
        font-weight: bold;

    }

</style> 