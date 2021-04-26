<script>

    import{
        onMount
    }from "svelte";

    import Table from "sveltestrap/src/Table.svelte";

    let data = [];

    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("/api/v1/greenhousegasemissions-stats");

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
    <p>Greenhouse gas emissions in Europe </p>
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
            </tr>
           {/each}
        </tbody>
    </Table>
</main>

<style>
    td{
        text-align: center;
    }

    thead{
        font-weight: bold;

    }

</style>