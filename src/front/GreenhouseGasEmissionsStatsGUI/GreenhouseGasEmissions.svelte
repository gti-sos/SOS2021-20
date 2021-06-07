<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import ButtonGroup from "sveltestrap/src/ButtonGroup.svelte";
    import {Col, Pagination, Tooltip} from 'sveltestrap';
    import {Icon} from 'sveltestrap';
    //Define API endpoint
    var BASE_API_PATH = "/api/v1";
    
    let data = [];
    let offset = 0;
    let limit = 10;
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
        const res = await fetch(BASE_API_PATH +"/greenhousegasemissions-stats/loadInitialData").then((res)=>{

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
                const res = await fetch(BASE_API_PATH +"/greenhousegasemissions-stats?limit="+ limit +"&offset="+ offset);
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
            const res = await fetch(BASE_API_PATH +"/greenhousegasemissions-stats",{
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
                                 const res = await fetch(BASE_API_PATH +"/greenhousegasemissions-stats",
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
                                        alert("El dato "+ newData.country + " del año "+ newData.year + " ha sido insertado correctamente.");
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
            newData =[];
    }
    //DeleteOneData
    async function deleteOneData(country, year){
        if(confirm("Va a eliminar el dato: "+ country + " del año "+ year + " ¿está seguro?\nEsta acción es irreversible")){
            console.log("Deleting data...");
            const res = await fetch(BASE_API_PATH +"/greenhousegasemissions-stats" + "/" + country + "/" + year ,
            {
                method: "DELETE",
            }
            ).then((res) => {
                getData();
            });
        }
    }
    
    //SearchData
    let searchedCountry=[];
    let searchedYear=[];
    
    async function searchData(country, year){
        const res = await fetch(BASE_API_PATH +"/greenhousegasemissions-stats" + "/?country="+ searchedCountry + "&year=" + searchedYear ,
        {
                method: "GET",
                headers:{
                        "Content-Type": "application/json"
                        }
        });

        if(res.ok){
            const returnedJson = await res.json();
            if(searchedCountry.length == 0 && searchedYear.length == 0 ){
                console.log("Error");
                alert("Introduce al menos un parámetro para la búsqueda");
                data = [];
            
            }else if(typeof returnedJson.length == "undefined"){
                data = [returnedJson];
            }else{
                data = returnedJson;
            }
            console.log(returnedJson);
           

        }else{
            console.log("Error");
            alert("El dato " + searchedCountry + " del año " + searchedYear + " no se encuentra en la base de datos" );
            }
        searchedCountry=[];
        searchedYear=[];
        
    }
  
    //Pagination 
    function nextPage(){        
		    offset = offset + 10;
			getData(offset);
        
    }

    function previousPage(){
        if(offset == 0){
            offset = 0;
            getdata(offset);
        }else{
			offset = offset - 10;
			getData(offset);
        }

        
    }

    
</script>
<main>
    <header>
        
            <h3>Emisiones de gases de efecto invernadero en la Unión Europea medidas en miles de toneladas </h3>
            <div class="row">
                <div id= "initialbuttons"class="col-5">
                    <Button color="success" on:click={loadInitialData}>Cargar Datos</Button>
                    <Button class ="elimi" color="danger" on:click={deleteAllData}>Eliminar Datos</Button>
                    <Button color="warning" on:click={() => push("#/greenhousegasemissions-stats/graph")}>Gráfica</Button>
                </div>
                
                <div id = "searchfilter" class="col-7">
                    <input bind:value="{searchedCountry}" placeholder="Introduce país">
                    <input bind:value="{searchedYear}" placeholder="Introduce año">
                    <Button color="secondary" on:click={searchData}>Buscar dato</Button>
                    <Button color="danger" on:click={getData}>Quitar filtros de búsqueda</Button>
                </div>
            </div>
        
        
    </header>
    
    <Table hover bordered>
        <thead>
            <tr id= "tabletitle">
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
                <td><input placeholder="Inserte dato" bind:value="{newData.nitrous_oxide}"></td>
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
    <div>
        <Button  color="primary" on:click={previousPage}>Página Anterior</Button>
		<Button  color="primary" on:click={nextPage}>Siguiente Página</Button>    
    </div>
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

    #initialbuttons{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;

    }
    #searchfilter{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;

    }
    #tabletitle{
        background-color:darkgrey;
    }
  

</style>