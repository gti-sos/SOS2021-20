<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";


    export let params = {};

    let carbonDioxide = null;
    let methaneMt = null;
    let nitrousOxide = null;


    // Retrieve data from DB
    async function getData() {
    console.log("Fetching data...");
    const res = await fetch("/api/v1/greenhousegasemissions-stats" + "/" + params.country + "/" + params.year);
        
    if (res.ok) {
        const json = await res.json();
        carbonDioxide = json.carbon_dioxide;
        methaneMt = json.methane;
        nitrousOxide = json.nitrous_oxide;
        console.log("Received data.");
    } else {
        console.log("Error");
    }
    }
    onMount(getData);

    // Update data on DB
    async function updateData() {
        console.log("Updating data...");
    const res = await fetch("/api/v1/greenhousegasemissions-stats" + "/" + params.country + "/" + params.year, {
        method: "PUT",
        body: JSON.stringify({
            country: params.country,
            year: parseInt(params.year),
            carbon_dioxide: parseFloat(
                carbonDioxide
            ),
            methane: parseFloat(
                methaneMt
            ),
            nitrous_oxide: parseFloat(
                nitrousOxide
            ),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) =>{
                    if(res.ok){
                        alert("El dato se ha actualizado.");
                        getData();
                    }
                    if(res.status == 400){
                        alert("La entrada de datos no es correcta:\nTodos los campos menos el país deben ser númericos.");
                    }
                    if(res.status == 409) {
                        alert("Los datos que intenta introducir ya se encuentran en la base de datos.");
                        }
                    });



    }

</script>
<main>
    
    <h2>Editar los datos de "{params.country}" en el año "{params.year}"</h2>
    <Table bordered responsive>
        <thead>
            <tr>
                <th>País</th>
                <th>Año</th>
                <th>Dióxido de carbono</th>
                <th>Metano</th>
                <th>Óxido de nitrógeno</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>{params.country}</td>
                    <td>{params.year}</td>
                    <td><input bind:value={carbonDioxide}></td>
                    <td><input bind:value={methaneMt}></td>
                    <td><input bind:value={nitrousOxide}></td>
                    <td><Button color="warning" on:click={updateData(params)}>Actualizar</Button>
                    </td>
                </tr>
            
        </tbody>
    </Table>
    <div class="container" >
        <div class="text-center">
        <Button color="secondary" on:click="{pop}">Volver</Button>
    </div>
</div>
</main>
<style>
    h2
    {text-align: center;

    }
</style>