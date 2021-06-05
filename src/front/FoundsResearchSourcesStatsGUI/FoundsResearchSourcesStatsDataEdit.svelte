<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    const API_PATH = "/api/v1/foundsresearchsources-stats";

    export let params = {};

    let percentageOfGovernmentFunding = null;
    let percentageOfPrivateFinancing = null;
    let percentageOfNonProfitFunding = null;


    // Retrieve data from DB
    async function getData() {
    console.log("Fetching data...");
    const res = await fetch(API_PATH + "/" + params.country + "/" + params.year);
        
    if (res.ok) {
        const json = await res.json();
        percentageOfGovernmentFunding = json.percentage_of_government_funding;
        percentageOfPrivateFinancing = json.percentage_of_private_financing;
        percentageOfNonProfitFunding = json.percentage_of_non_profit_funding;
        console.log("Received data.");
    } else {
        console.log("Error");
    }
    }
    onMount(getData);

    // Update data on DB
    async function updateData() {
        console.log("Updating data...");
    const res = await fetch(API_PATH + "/" + params.country + "/" + params.year, {
        method: "PUT",
        body: JSON.stringify({
            country: params.country,
            year: parseInt(params.year),
            percentage_of_government_funding: parseFloat(
                percentageOfGovernmentFunding
            ),
            percentage_of_private_financing: parseFloat(
                percentageOfPrivateFinancing
            ),
            percentage_of_non_profit_funding: parseFloat(
                percentageOfNonProfitFunding
            ),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) =>{
                    if(res.ok){
                        alert("El registro ha sido insertado correctamente.");
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
    <h4>Editar los datos de "{params.country}" en el año "{params.year}"</h4>
    <Table bordered responsive>
        <thead>
            <tr>
                <th>País</th>
                <th>Año</th>
                <th>Porcentaje financiación estatal</th>
                <th>Porcentaje financiación privado</th>
                <th>Porcentaje financiación ongs</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>{params.country}</td>
                    <td>{params.year}</td>
                    <td><input bind:value={percentageOfGovernmentFunding}></td>
                    <td><input bind:value={percentageOfPrivateFinancing}></td>
                    <td><input bind:value={percentageOfNonProfitFunding}></td>
                    <td><Button color="warning" on:click={updateData(params)}>Actualizar</Button>
                    </td>
                </tr>
            
        </tbody>
    </Table>
    <div class="container" >
        <div class="text-center">
        <Button style="margin-bottom: 30em; 3em;" color="secondary" on:click="{pop}">Volver</Button>
    </div>
</div>
</main>
<style>
     th{
        color: rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.2);
    }
    th,td,input {
        text-align: center;
    }
    thead {
        font-weight: bold;
    }
    h4 {
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
        padding-top: 1em;
        padding-bottom: 1em;
    }
</style>