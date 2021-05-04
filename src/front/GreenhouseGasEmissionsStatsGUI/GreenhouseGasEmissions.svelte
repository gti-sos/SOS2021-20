<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import ButtonGroup from "sveltestrap/src/ButtonGroup.svelte";
    

    
    let data = [];
    let newData = {
        country: "",
        year:"",
        carbon_dioxide:"",
        methane:"",
        nitrous_oxide:"",
    }

    //LoadInitialData
    async function loadInitialData(){
        console.log("Loading data...");
        const res = await fetch("/api/v1/greenhousegasemissions-stats/loadInitialData").then((res)=>{

        if(res.ok){
            console.log("OK");
            getData();
        }else{
            alert("Los datos ya se han cargado anteriormente");
            console.log("ERROR!");
        }
    });

    }

    //GetData
    async function getData(){
        
                console.log("Fetching data...");
                const res = await fetch("/api/v1/greenhousegasemissions-stats");
                if(res.ok){
                    const returnedJson = await res.json();
                    if(typeof returnedJson.length == "undefined"){
                        console.log("only one element!")
                        data = [returnedJson];
                    }else{
                        data = returnedJson;
                    }
                    console.log("!"+data.length + ", Registers loaded!");
                } else {
                    console.log("Error");
                    data = [];
        }
    }

    onMount(getData);  

    //DeleteAllData
    async function deleteAllData(){
        if(confirm("¿Está seguro que quiere eliminar todos los datos?\n Esta acción es irreversible.")){ 
            console.log("Deleting data...");
            const res = await fetch("/api/v1/greenhousegasemissions-stats",{
                method: "DELETE"
                }).then((res)=>{
                    if (res.ok) {
                        data = [];
                        getData();
                    } else {
                        console.log("Error");
                        }
                    });
        }
    }

    //InsertData
    async function insertData(){
        if (newData.country == "" || newData.year == "" || newData.country == null || newData.year == null){
             alert("Debe indicar un país y un año");         
        }else{
                                 console.log("Inserting data...");
                                 const res = await fetch("/api/v1/greenhousegasemissions-stats",
                                    {
                                        method: "POST",
                                        body: JSON.stringify({
                                            country: newData.country,
                                            year: parseInt(newData.year),
                                            carbon_dioxide: parseFloat(newData.carbon_dioxide),
                                            methane: parseFloat( newData.methane),
                                            nitrous_oxide: parseFloat(newData.nitrous_oxide)
                                        }),
                                        headers:{
                                                    "Content-Type": "application/json"
                                                 }
                                    }).then((res) =>{
                                        if(res.ok){
                                        alert("El registro ha sido insertado correctamente.");
                                        getData();
                                    }
                                    if(res.status == 400){
                                        alert("La entrada de datos no es correcta:\nTodos los campos deben estar rellenos.");
                                        }

                                    if(res.status == 409) {
                                        alert("Los datos que intenta introducir ya se encuentran en la base de datos:\n Puede modificar el dato si es necesario.");
                                        }
                                                    });
            }
    }
    //DeleteOneData
    async function deleteOneData(country, year){
        if(confirm("Va a eliminar un dato, ¿está seguro?\n Esta acción es irreversible")){
            console.log("Deleting data...");
            const res = await fetch("/api/v1/greenhousegasemissions-stats" + "/" + country + "/" + year ,
            {
                method: "DELETE",
            }
            ).then((res) => {
                getData();
            });
        }
    }

    
</script>
<main>
    <header>
        <div class="initialbuttons">
            <h3>Emisiones de gases de efecto invernadero en la Unión Europea medidas en miles de toneladas </h3>
            <Button color="success" on:click={loadInitialData}>Cargar Datos</Button>
            <Button color="danger" on:click={deleteAllData}>Eliminar Datos</Button>
        </div>
    </header>
    
    <Table bordered>
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
                <td><input placeholder="Inserte país" bind:value="{newData.country}"></td>
                <td><input placeholder="Inserte año" bind:value="{newData.year}"></td>
                <td><input placeholder="Inserte dato" bind:value="{newData.carbon_dioxide}"></td>
                <td><input placeholder="Inserte dato" bind:value="{newData.methane}"></td>
                <td><input placeholder="Inserte país" bind:value="{newData.nitrous_oxide}"></td>
                <td><Button block color="info" size="sm" on:click={insertData}>Añadir dato</Button></td>
            </tr>
            {#each data as onedata}
            <tr>
                <td>{onedata.country}</td>
                <td>{onedata.year}</td>
                <td>{onedata.carbon_dioxide}</td>
                <td>{onedata.methane}</td>
                <td>{onedata.nitrous_oxide}</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button color="warning"><a href="#/greenhousegasemissions-stats/{onedata.country}/{onedata.year}">Modificar Dato</a></Button>
                        <Button color="danger" on:click={deleteOneData(onedata.country, onedata.year)}>Eliminar Dato</Button>
                    </ButtonGroup>
                </td>

            </tr>
        
           {/each}
        </tbody>
    </Table>
</main>

<style>
    h3{
        text-align: center;
    }
    th{
        text-align: center;
    }
    td{
        text-align: center;
    }

    thead{
        font-weight: bold;

    }

    .initialbuttons{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;

    }


</style>