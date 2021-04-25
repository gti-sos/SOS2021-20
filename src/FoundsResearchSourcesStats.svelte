<script>
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";

    let foundsResearchSourcesData = [];

    // Retrieves all data from DB
    async function getData(){
        console.log("fetchong data");
        const res = await fetch("/api/v1/foundsresearchsources-stats");
        if (res.ok) {
            console.log("Ok");
            const returnedJson = await res.json();
            foundsResearchSourcesData = returnedJson;
            console.log("We have " + foundsResearchSourcesData.length +" registers.");
        } else {
            console.log("Error");
        }
    }
    console.log("Before call");
    onMount(getData)
    console.log("After call");

</script>

<main>
    <body>
        
   
    
    <Table bordered responsive> 
        <thead>
        <tr>
            <td>country</td>
            <td>year</td>
            <td>percentage_of_government_funding</td>
            <td>percentage_of_private_financing</td>
            <td>percentage_of_non_profit_funding</td>
        </tr>
    </thead>
    <tbody>
    {#each foundsResearchSourcesData as row}
        <tr>
        <td>{row.country}</td>
        <td>{row.year}</td>
        <td>{row.percentage_of_government_funding}</td>
        <td>{row.percentage_of_private_financing}</td>
        <td>{row.percentage_of_non_profit_funding}</td>
    </tr>
            
        {/each}
    </tbody>
    </Table>
</body>
</main>

