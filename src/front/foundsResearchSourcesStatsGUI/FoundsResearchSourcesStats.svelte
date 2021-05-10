<script>
    import { onMount } from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { Input, Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

    const API_PATH = "/api/v1/foundsresearchsources-stats";
    let foundsResearchSourcesData = [];

    let newData = {
        country: "",
        year: "",
        percentage_of_government_funding: "",
        percentage_of_private_financing: "",
        percentage_of_non_profit_funding: "",
    };

    let countries = [];
	let years = [];
    let countryInputValue = "";
    let yearInputValue = "";

	let elemPerPage = 10;
	let offset = 0;
	let currPage = 1;
	let existMoreData = true;

    // Load the database with the initial data
    async function loadData(){
        console.log("Loading data...");
        const res = await fetch(API_PATH+"/loadInitialData").then((res)=>{
        if (res.ok) {
            getData();
            alert("Los datos han sido cargados satisfactoriamente.");
            
        } else {
            alert("Los datos que intenta introducir ya se encuentran cargados en la base de datos.");
        }
        });

    }

    // Fill filter selectors array
    async function selectFiller() {
		const res = await fetch(API_PATH);
		if (res.ok) {
			const returnedJson = await res.json();
			countries = returnedJson.map((data) => {
					return data.country;
			});
			countries = Array.from(new Set(countries));
            
            years = returnedJson.map((data) => {
					return data.year;
			});
			years = Array.from(new Set(years));
            years.sort();
		}
	}
    // Retrieves all data from DB
    async function getData() {

		var url = API_PATH + "?limit=" + elemPerPage;
		
		const res = await fetch(url + "&offset=" + offset );
		
        // Asking for the following data of pagination
        var nextOffSet = parseInt(offset) + 10;
		const nextJson = await fetch(url + "&offset=" + nextOffSet).finally(()=>{
            selectFiller();
        });

        if (res.ok) {
            const returnedJson = await res.json();
            
            if(typeof returnedJson.length == "undefined"){
                console.log("only one element!")
                foundsResearchSourcesData = [returnedJson];
            }else{
                foundsResearchSourcesData = returnedJson;

            }
            console.log("!"+foundsResearchSourcesData.length + ", Registers loaded!");
        }else{
            if(res.status==404){
                console.log("No data found");
            }
            foundsResearchSourcesData=[];
        }
        if(nextJson.status==404){
			existMoreData = false;
		}else{
			existMoreData = true;
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
            countries=[];
            years=[];
            console.log(getData());
        } else {
            console.log("Error");
        }
    });
}
    }
    // Search by country/year
    async function searchData() {
        if(countryInputValue=="" && yearInputValue==""){
            alert("Debe indicar al menos un país o un año.");
        }else{
        if(countryInputValue == "País"){
            countryInputValue="";
        }
        if(yearInputValue=="Año"){
            yearInputValue="";
        }
        console.log(countryInputValue + "  " + yearInputValue);
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
                    existMoreData=false;
                    foundsResearchSourcesData = [returnedJson];
                }else{
                    foundsResearchSourcesData = returnedJson;
                }
                if(returnedJson.length <= 10){
                    existMoreData=false;
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
            existMoreData=false;
        }
    }
}
    
    function removeFilters(){
        countryInputValue = "";
        yearInputValue = "";
        getData();
    }

	async function addOffset(increment){
        currPage += increment;
        if(currPage==1){
            offset = 0;
        }else {
            offset = parseInt(currPage -1)*10;
        }
        console.log(offset);
        console.log("entra en addoffset")
		getData();
	}
    
        
</script>
<main>
        <div>
            <h4>FUENTES DE FINANCIACIÓN DE LA INVESTIGACIÓN</h4>
            <div class="row">
            <div class="col-5">
                <select style="margin-left:3.5em;width:6em;" type="select" name="selectCountry" id="selectCountry" bind:value="{countryInputValue}">
                    {#each countries as country}
                    <option>{country}</option>
                    {/each}
                    {#if countryInputValue==""}
                    <option selected="selected">País</option>
                    {/if}
                </select>
                <select style="width:6em;" type="select"  name="selectYear" id="selectYear" bind:value="{yearInputValue}">
                    {#each years as year}
                    <option>{year}</option>
                    {/each}
                    {#if yearInputValue==""}
                    <option selected="selected">Año</option>
                    {/if}
                </select>
                <Button style="background-color: rgba(0, 0, 0, 0.2);color: rgba(0, 0, 0, 0.7);" color="light" on:click={searchData}>🔍</Button>
                <Button style="background-color: rgba(0, 0, 0, 0.2);color: rgba(0, 0, 0, 0.7);" color="light" on:click={removeFilters}>Quitar filtros</Button>
            </div>
            <div class="col-3"></div>
            
            <div id="buttns" class="col-4">
                <Button style="background-color: rgba(0, 0, 0, 0.2);color: rgba(0, 0, 0, 0.7);" color="light" on:click={loadData}>Cargar Datos</Button>
                <Button style="background-color: rgba(0, 0, 0, 0.2);color: rgba(0, 0, 0, 0.7);" color="light" on:click={() => push("#/foundsresearchsources-stats/update-data")} >Editar Datos </Button>
                <Button style="background-color: rgba(0, 0, 0, 0.2);color: rgba(0, 0, 0, 0.7);" color="light" on:click={deleteAllData}>Borrar Datos</Button>
            </div>
        
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
                    <td><input placeholder="Inserte país" bind:value={newData.country} /></td>
                    <td><input placeholder="Inserte año" bind:value={newData.year} /></td>
                    <td><input placeholder="% financiación estatal" bind:value={newData.percentage_of_government_funding}/></td>
                    <td><input placeholder="% financiación privada" bind:value={newData.percentage_of_private_financing}/></td>
                    <td><input placeholder="% financiación ONGs" bind:value={newData.percentage_of_non_profit_funding}/></td>
                    <td><Button style="background-color: rgba(0, 0, 0, 0.2);color: rgba(0, 0, 0, 0.7);" color="light" on:click={insertNewData}> Añadir dato</Button></td>
                </tr>
                {#each foundsResearchSourcesData as row}
                    <tr>
                        <td>
                            <a title="Editar datos para {row.country} en el año {row.year}" 
                                href="#/foundsresearchsources-stats/{row.country}/{row.year}">{row.country}
                            </a>
                        </td>
                        <td>{row.year}</td>
                        <td>{row.percentage_of_government_funding}%</td>
                        <td>{row.percentage_of_private_financing}%</td>
                        <td>{row.percentage_of_non_profit_funding}%</td>
                        <td><Button title="Borrar datos para {row.country} en el año {row.year}"  color="light" on:click={deleteData(row)}>🗑</Button>
                        </td>
                    </tr>
                {/each}
            </tbody>

        </Table>
        <div class="row">
        <div class="col-5"></div>
        <div class="col-2"> 
            <div style="width: 50%; margin: 0 auto;">     
        <Pagination>
            <PaginationItem class="{currPage === 1 ? 'disabled' : ''}">
              <PaginationLink previous href="#/foundsresearchsources-stats" on:click="{() => addOffset(-1)}" />
            </PaginationItem>
            {#if currPage != 1}
            <PaginationItem>
                <PaginationLink previous href="#/foundsresearchsources-stats" on:click="{() => addOffset(-1)}">{currPage - 1}</PaginationLink>
            </PaginationItem>
            {/if}
            <PaginationItem active>
                <PaginationLink href="#/foundsresearchsources-stats">{currPage}</PaginationLink>
            </PaginationItem>
            {#if existMoreData}
            <PaginationItem >
                <PaginationLink previous href="#/foundsresearchsources-stats" on:click="{() => addOffset(1)}">{currPage + 1}</PaginationLink>
             </PaginationItem>
            {/if}
            <PaginationItem class="{existMoreData === true ? '' : 'disabled'}">
              <PaginationLink next href="#/foundsresearchsources-stats" on:click="{() => addOffset(1)}" />
            </PaginationItem>
        </Pagination>
    </div>
    </div>
    <div class="col-5"></div>
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
    #buttns{
        text-align: center;
        padding-bottom: 1em;
    }
    /* .clock{
		
	} */
</style>
