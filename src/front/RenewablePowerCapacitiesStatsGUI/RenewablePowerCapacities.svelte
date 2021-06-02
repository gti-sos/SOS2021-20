<script>
 
 onMount(verTabla); //CARGAR LOS DATOS AL INICIAR  

/// VARIABLES  E IMPORTACIONES 
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import { Button, Col, Row } from "sveltestrap";
    import { Input, Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
    import {pop} from "svelte-spa-router"
  
    
    //RUTA DE LA API
    const RUTA_API = "/api/v1/renewablepowercapacities-stats";
    
    //ARRAY PRINCIPAL DONDE ALMACENAREMOS LOS DATOS
    let datos = [];
    
    //UTILIZADO PARA ANIADIR UN NUEVO DATO
    let nuevoDato = {
        country: "",
        year: "",
        solar_production_in_megawatts: "",
        hydraulic_production_in_megawatts: "",
        wind_power_production_in_megawatts: "",
    };

///FIN  VARIABLES E IMPORTACIONES     
    

 

//METODOS CRUD


    //CARGA DATOS EN LA TABLA loadInitialData
    async function cargarDatos() {
        
        console.log("Buscando datos...");
        const res_iniciar = await fetch("/api/v1/renewablepowercapacities-stats/loadInitialData");

        
        const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        console.log(res_iniciar.status);
        if (res_iniciar.status != 200) {
            console.log("Error datos ya cargados");
            alert("Error datos ya cargados");
        } else {
            console.log("Ok cargando datos.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
            datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
            console.log(`Tenemos ${datos.length} datos.`);
            alert("Datos cargados correctamente.");
        }

        verTabla();
    }

    //AÑADIR UN NUEVO DATO
    async function addDato() {
        if (nuevoDato.country == "" || nuevoDato.year == "" ||  nuevoDato.country == null || nuevoDato.year == null) {
            
            alert("Error - Revise los datos.");
        
        } else {
            
            console.log("Insertando nuevo dato...");

            const res = await fetch("/api/v1/renewablepowercapacities-stats", {
                
                method: "POST",
                body: JSON.stringify({
                    
                    country: nuevoDato.country,
                    year: parseInt(nuevoDato.year),

                    solar_production_in_megawatts: parseFloat(
                        nuevoDato.solar_production_in_megawatts
                    ),
                    hydraulic_production_in_megawatts: parseFloat(
                        nuevoDato.hydraulic_production_in_megawatts
                    ),
                    wind_power_production_in_megawatts: parseFloat(
                        nuevoDato.wind_power_production_in_megawatts
                    ),
                }),

                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                
                if (res.ok) {
                    alert("El registro ha sido insertado correctamente.");
                    nuevoDato = [];

                    verTabla();
                }
                if (res.status == 400) {
                    alert("Los datos introducidos no son correctos - Revise los campos.");
                }
                if (res.status == 409) {
                    alert("Error - Los datos introducidos ya existen." );
                }
            });//fin then
        }//FIN ELSE
    }

   
    //BORRA UN SOLO DATO
    async function borrarDato(country, year){
        if(confirm("Va a eliminar un dato, ¿Estas seguro")){
            console.log("Borrando dato...");
            alert("Dato borrado");
            const res = await fetch(RUTA_API + "/" + country + "/" + year ,
            {
                method: "DELETE",
            }
            ).then((res) => {
                verTabla();
            });
        }
    }

    //ELIMINA TODOS LOS DATOS DE LA BD
    async function eliminarDatos() {
        var opcion = confirm("¿Estás seguro?");
        if (opcion) {
            console.log("borrando datos......");

            const res = await fetch(RUTA_API, {
                method: "DELETE",
            }).then(function (res) {
                if (res.ok) {
                    console.log("DATOS BORRADOS");
                    alert("Datos eliminados.")
                    datos = [];
                } else if ((res.status = 404)) {
                    console.log("ERROR DB NO ENCONTRADA");
                } else {
                    console.log("ERROR");
                }
            });
        } else {
        }
    }

     //VARIABLES PARA FILTRAR por pais y ano
    let busqueda_pais=[];
    let busqueda_ano=[];
    
    //VER REGISTRO POR PAIS Y ANO
    async function verRegistroPaisAno(){
        
        var ruta="/api/v1/renewablepowercapacities-stats?country="+busqueda_pais+"&year="+busqueda_ano;
        console.log(ruta);
        
        const res = await fetch(ruta);

        if(res.ok){
            
            const returnedJson = await res.json();
            
            if(busqueda_pais.length == 0 && busqueda_ano.length == 0 ){
                
                alert("Debes de introducir un pais y el año.");
                console.log("Error");
                //datos = [];
            
            }else if(typeof returnedJson.length == "undefined"){
                datos = [returnedJson];
            }else{
                datos = returnedJson;
            }

        }else{
            
            console.log("Error");
                alert("El pais" + busqueda_pais + " con año " + busqueda_ano + " no existe en nuestra BD." );
            }
            
            busqueda_pais=[];
            busqueda_ano=[];
        
    }

//FIN CRUD
    


//PAGINACION

    let countries = [];
	let years = [];
    let countryInputValue = "";
    let yearInputValue = "";

    let elemPerPage = 5;
	let offset = 0;
	let currPage = 1;
	let existeMasDatos = true;

    async function set_offset(increment){
        currPage = currPage + increment;
        if(currPage==1){
            offset = 0;
        }else {
            offset = parseInt(currPage -1)*5;
        }
        console.log("valor offset: "+offset);
        
		verTabla();
	}

    async function verTabla() {
        var url = RUTA_API+"?offset="+offset+"&limit="+elemPerPage;
        //var url = API_PATH+"?limit="+elemPerPage+"&offset="+offset;
        //var url = API_PATH + "?limit=" + elemPerPage;

        const res = await fetch(url);

        if (res.ok) {
            
            const returnedJson = await res.json();
            
            if(typeof returnedJson.length == "undefined"){
            
                console.log("only one element!")
                datos = [returnedJson];
            
            }else{
            
                datos = returnedJson;

            }
            console.log("!"+datos.length + ", Registers loaded!");
        }else{
            
            if(res.status==404){
            
                console.log("No data found");
            
            }
            
            datos=[];
        }
        
        ///COMPRUEBO SI HAY MAS DATOS
        // COMPRUEBO SI HAY MAS DATOS CON EL SIGUIENTE OFFSET
        var nextOffSet = parseInt(offset) + 5;
        const sigui_JSON = await fetch(url + "&offset=" + nextOffSet);

        if(sigui_JSON.status==404){
            existeMasDatos = false;
        }else{
            existeMasDatos = true;
        }

    }

//FIN PAGINACION


</script>

<main>
    
    <br /><br />
    <center><h3>Capacidad de producción de energia renovable</h3></center> <br/>
   
    <div id="capaBusqueda" style="background-color: aquamarine;" >
        <br/>
        <center>
            <input bind:value="{busqueda_pais}" placeholder="Pais">
            <input bind:value="{busqueda_ano}" placeholder="Año">
            <Button color="primary" on:click={verRegistroPaisAno}>Buscar</Button>
            <Button color="danger" on:click={verTabla}>Eliminar Filtro Búsqueda</Button>
        </center> 
        <hr>   
            <Button color="info" on:click={cargarDatos}>Cargar Datos</Button>
            <Button color="danger" on:click={eliminarDatos}>Eliminar Datos</Button>
            <a href="#/renewablepowercapacities-stats/char"><Button color="info">Ver grafica(Line HIGHCHARTS)</Button></a>
            <a href="#/renewablepowercapacities-stats/grafica"><Button color="info">Ver grafica(Chartkick)</Button></a>
            <a href="#/renewablepowercapacities-stats/grafica2"><Button color="info">Ver grafica(Area HIGHCHARTS)</Button></a>
        <br/>
    </div>   

    <hr/>
    
    <Table bordered responsive>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Producción Solar en MegaWatios</th>
                <th>Producción Hidraulica en MegaWatios</th>
                <th>Producción Eolica en MegaWatios</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={nuevoDato.country} /></td>
                <td><input bind:value={nuevoDato.year} /></td>
                <td><input bind:value={nuevoDato.solar_production_in_megawatts}/></td>
                <td><input  bind:value={nuevoDato.hydraulic_production_in_megawatts}/></td>
                <td><input bind:value={nuevoDato.wind_power_production_in_megawatts}/></td>
                <td><Button color="success" on:click={addDato}>Añadir dato</Button></td>
            </tr>
            {#each datos as dato}
                <tr>
                    <td>
                        <a href="#/renewablepowercapacities-stats/{dato.country}/{dato.year}">{dato.country} </a>
                    </td>
                    <!--  <td>{dato.country}</td> -->
                    <td>{dato.year}</td>
                    <td>{dato.solar_production_in_megawatts}</td>
                    <td>{dato.hydraulic_production_in_megawatts}</td>
                    <td>{dato.wind_power_production_in_megawatts}</td>
                    <td><Button color="danger" on:click={borrarDato(dato.country, dato.year)}> Borrar</Button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>

    <br />
      
    <Pagination>
        <PaginationItem class="{currPage === 1 ? 'disabled' : ''}">
          <PaginationLink previous href="#/renewablepowercapacities-stats" on:click="{() => set_offset(-1)}" />
        </PaginationItem>
        
        <PaginationItem active>
            <PaginationLink href="#/renewablepowercapacities-stats">{currPage}</PaginationLink>
        </PaginationItem>
       
        <PaginationItem class="{existeMasDatos === true ? '' : 'disabled'}">
          <PaginationLink next href="#/renewablepowercapacities-stats" on:click="{() => set_offset(1)}" />
        </PaginationItem>
    </Pagination>

    <hr/>
    <br/>
    
    <center>

        <h3>APIS A ENTREGAR:</h3>
        <p>Importada por el grupo 3 - VISUALIZACION(TABLA) - PROXY: <a href="#/renewablepowercapacities-stats/Api1_import"><Button color="info">API 1</Button></a> </p>
        <p>Importada por el grupo 23 - VISUALIZACION(TABLA) - PROXY:  <a href="#/renewablepowercapacities-stats/Api2_import"><Button color="info">API 2</Button></a> </p>
        <p>Api importada del TIEMPO.es - VISUALIZACION(TABLA) + NORMAL  <a href="#/renewablepowercapacities-stats/Api3_import"><Button color="info">API 3</Button></a> </p>
        <p>Importada por RapidApi VISUALIZACION(TABLA) - PROXY OAUTH:  <a href="#/renewablepowercapacities-stats/Api4_import"><Button color="info">API 4</Button></a></p>
        <!--
        <p>Importada por el eltiempo.es VISUALIZACION(GRÁFICO Y TABLA) - NORMAL:  <a href="#/renewablepowercapacities-stats/Api3_import"><Button color="info">API 3</Button></a></p>
        <p>Importada por el RapidApi VISUALIZACION(TABLA) - PROXY OAUTH:  <a href="#/renewablepowercapacities-stats/Api4_import"><Button color="info">API 4</Button></a></p>
        <hr/>
        <h3> EXTRA: </h3>
        <p>Api importada del TIEMPO.es - DIFERENTE GRÁFICO + PROXY  <a href="#/renewablepowercapacities-stats/Api6_import"><Button color="info">API 6</Button></a> </p>
        <p>Api importada del grupo 23 - GRÁFICO + PROXY <a href="#/renewablepowercapacities-stats/Api2_import"><Button color="info">API 2</Button></a></p>
       -->
        <!-- <h3>API IMPORTADAS:</h3>
        <p>Api importada del grupo 3:(LISTA PROXY) <a href="#/renewablepowercapacities-stats/Api1_import"><Button color="info">API 1</Button></a> </p>
        <br/>
        <p>Api importada del grupo 23:(GRÁFICO PROXY) <a href="#/renewablepowercapacities-stats/Api2_import"><Button color="info">API 2</Button></a></p>
        <br/>
        <p>Api importada de ELTIEMPO:(GRÁFICO NORMAL)  <a href="#/renewablepowercapacities-stats/Api3_import"><Button color="info">API 3</Button></a></p>
        <br/>
        <p>Api importada de RAPIDAPI:(GRÁFICO OAUTH)  <a href="#/renewablepowercapacities-stats/Api4_import"><Button color="info">API 4</Button></a></p>
        <br/>
        <p>Integracion (API PROPIA) + (API2):  <a href="#/renewablepowercapacities-stats/Api5_import"><Button color="info">API 5</Button></a> </p>        
        <br/>
        <p>EXTRA(REALIZADO CON OTRAS LIBRERIAS NO ELEJIDAS): <a href="#/renewablepowercapacities-stats/Api6_import"><Button color="info">API 6</Button></a> </p>
        -->

    </center>    
</main>

<style>


</style>
