<script>
    import { onMount } from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    const API_PATH = "/api/v1/foundsresearchsources-stats";
    let foundsResearchSourcesData = [];

    let newData = {
        country: "",
        year: "",
        percentage_of_government_funding: "",
        percentage_of_private_financing: "",
        percentage_of_non_profit_funding: "",
    };

    // Load the database with the initial data
    async function loadData(){
        console.log("Loading data...");
        const res = await fetch(API_PATH+"/loadInitialData").then((res)=>{
        if (res.ok) {
            getData();
        } else {
            alert("Los datos que intenta introducir ya se encuentran cargados en la base de datos.");
            console.log("Error");
        }
        });

    }

    // Retrieves all data from DB
    async function getData() {
        console.log("Fetching data...");
        const res = await fetch(API_PATH);
        if (res.ok) {
            const returnedJson = await res.json();
            if(typeof returnedJson.length == "undefined"){
                console.log("only one element!")
                foundsResearchSourcesData = [returnedJson];
            }else{
                foundsResearchSourcesData = returnedJson;
            }
            console.log("!"+foundsResearchSourcesData.length + ", Registers loaded!");
        } else {
            console.log("Error");
            foundsResearchSourcesData=[];
        }
    }
    onMount(getData);

    // Insert new data on database
    async function insertNewData() {
        if (newData.country == "" || newData.year == "" ||
             newData.country == null || newData.year == null){
             alert("Debe indicar un país y un año");
         }else{        
                console.log("Inserting new data...");
                const res = await fetch(API_PATH, {
                    method: "POST",

                    body: JSON.stringify({
                                country: newData.country,
                                year: parseInt(newData.year),
                                percentage_of_government_funding: parseFloat(
                                    newData.percentage_of_government_funding
                                ),
                                percentage_of_private_financing: parseFloat(
                                    newData.percentage_of_private_financing
                                ),
                                percentage_of_non_profit_funding: parseFloat(
                                    newData.percentage_of_non_profit_funding
                                ),
                            }),

                    headers: {
                        "Content-Type": "application/json",
                            },

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

                                        newData=[];
                                });
                }    
    }

    // Delete specific data on database
    async function deleteData(row) {
        if(confirm("¿Está seguro de querer eliminar este registro la base de datos?\n Recuerde que esta acción es irreversible.")){
        console.log("Deleting data...");
        const res = await fetch(
            API_PATH + "/" +
                row.country +
                "/" +
                row.year,
            {
                method: "DELETE",
            }
        ).then(() => {
            getData();
        });
    }
    }

     // Delete all data on database
     async function deleteAllData() {
        if(confirm("¿Está seguro de querer eliminar todos los datos que existen en la base de datos?\n Recuerde que esta acción es irreversible.")){ 
        console.log("Deleting all data...");
        const res = await fetch(
            API_PATH,
            {
                method: "DELETE",
            }
        ).then((res)=>{
        if (res.ok) {
            foundsResearchSourcesData = [];
            getData();
        } else {
            console.log("Error");
        }
    });
}
    }


    let countryInputValue = []
    let yearInputValue = [];

    // Search by country/year
    async function searchData() {
        const res = await fetch(
            API_PATH + "?country="+countryInputValue+"&year="+yearInputValue,{
                method: "GET",
                headers:{
                "Content-Type":"application/json",
                }
            });
            if (res.ok) {
                const returnedJson = await res.json();
                if(typeof returnedJson.length == "undefined"){
                    console.log("only one element!")
                    foundsResearchSourcesData = [returnedJson];
                }else{
                    foundsResearchSourcesData = returnedJson;
                }
            }else{
            var mssg = "";
                if(countryInputValue.length>0 && yearInputValue.length>0){
                    mssg = mssg + "No existen registros para "+countryInputValue +" en el año "+yearInputValue;    
                }else if(countryInputValue.length>0){
                    mssg = mssg + "No existen registros para: "+countryInputValue;
                }else if(yearInputValue.length>0){
                    mssg = mssg + "No existen registros para el año: "+yearInputValue;
                }
            alert(mssg);
            foundsResearchSourcesData=[];
        }
    }
        
</script>

        <div>
            <h4>Fuentes de financiación de la investigación</h4>
            <div class="row">
            <div class="col-4">
                <input id="countrySearch" bind:value={countryInputValue} type="text" placeholder="Introduce un país">
                <input bind:value={yearInputValue} type="text" placeholder="Introduce un año">
                <Button color="dark" on:click={searchData}>Buscar</Button>
                </div>
            <div id="buttns" class="col-4">

                <Button color="success" on:click={loadData}>Cargar Datos</Button>
                <Button color="primary" on:click={() => push("#/foundsresearchsources-stats/update-data")} >Editar Datos </Button>
                <Button color="danger" on:click={deleteAllData}>Borrar Datos</Button>
        </div>
        <div class="col-4"></div>
    </div>
    </div>

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
                    <td><input bind:value={newData.country} /></td>
                    <td><input bind:value={newData.year} /></td>
                    <td><input bind:value={newData.percentage_of_government_funding}/></td>
                    <td><input bind:value={newData.percentage_of_private_financing}/></td>
                    <td><input bind:value={newData.percentage_of_non_profit_funding}/></td>
                    <td><Button color="success" on:click={insertNewData}> Añadir dato</Button></td>
                </tr>
                {#each foundsResearchSourcesData as row}
                    <tr>
                        <td>
                            <a title="Edit data for {row.country} on year {row.year}" 
                                href="#/foundsresearchsources-stats/{row.country}/{row.year}">{row.country}
                            </a>
                        </td>
                        <td>{row.year}</td>
                        <td>{row.percentage_of_government_funding}</td>
                        <td>{row.percentage_of_private_financing}</td>
                        <td>{row.percentage_of_non_profit_funding}</td>
                        <td><Button color="danger" on:click={deleteData(row)}>Borrar</Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        
<style>
    th,td {
        text-align: center;
    }
    thead {
        font-weight: bold;
    }
    h4 {
        text-align: center;
        padding-top: 1em;
        padding-bottom: 1em;
    }
    #buttns{
        text-align: center;
        padding-bottom: 1em;
    }
    #countrySearch{
        margin-left: 1.5em;
    }

</style>
