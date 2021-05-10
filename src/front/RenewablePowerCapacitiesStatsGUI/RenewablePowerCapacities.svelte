<script>
    import { onMount } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import { Button, Col, Row } from "sveltestrap";

    let datos = [];
    let nuevoDato = {
        country: "",
        year: "",
        solar_production_in_megawatts: "",
        hydraulic_production_in_megawatts: "",
        wind_power_production_in_megawatts: "",
    };

    const RUTA_API = "/api/v1/renewablepowercapacities-stats";

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
    }

    
    //MUESTRA TODOS LOS DATOS DE LA BD
    async function verTabla() {
        console.log("Buscando datos...");
        const res = await fetch(RUTA_API);
        if (res.ok) {
            const returnedJson = await res.json();
            if(typeof returnedJson.length == "undefined"){
                console.log("Solo queda un elemento")
                datos = [returnedJson];
            }else{
                datos = returnedJson;
            }
            console.log("!"+datos.length + ", Registro cargado");
        } else {
            console.log("Error");
            datos=[];
        }
    }
    

    ///----

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

     //VISUALIZA UN DATO DE LA BD
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

     //GetData
     async function paginarDato(){
        
        console.log("Fetching data...");
        const res = await fetch(RUTA_API+"?limit="+ limit +"&offset="+ offset);
        if(res.ok){
            const returnedJson = await res.json();
                        if(typeof returnedJson.length == "undefined"){
                            console.log("only one element!")
                            datos = [returnedJson];
                        }else{
                            datos = returnedJson;
                        }
                        console.log("!"+datos.length + ", Registers loaded!");
                 
        } else {
            console.log("Error");
            datos = [];
}
}

    //Paginar
    let offset = 0;
    let limit = 10;
    function nextPage(){        
		    offset = offset + 10;
			paginarDato(offset);
    }

    function previousPage(){
        if(offset == 0){
            offset = 0;
            paginarDato(offset);
        }else{
			offset = offset - 10;
			paginarDato(offset);
        }
    }

    onMount(verTabla);//CARGAR LOS DATOS AL INICIAR  
</script>

<main>
    <br /><br />
    <center><h3>Capacidad de producción de energia renovable</h3></center>
    <br/>
    <div id="capaBusqueda" style="background-color: aquamarine;" >
        <br/>
        <center>
            <input bind:value="{busqueda_pais}" placeholder="Pais">
            <input bind:value="{busqueda_ano}" placeholder="Año">
            <Button color="primary" on:click={verRegistroPaisAno}>Buscar</Button>
            <Button color="danger" on:click={verTabla}>Eliminar Filtro Búsqueda</Button>
        </center>    
        <br/>
    </div>    
    <hr/>
    <Table bordered>
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

    <br /><br />
    <center>
        <Button color="info" on:click={cargarDatos}>Cargar Datos</Button>
        <Button color="danger" on:click={eliminarDatos}>Eliminar Datos</Button>
    </center>
        
    <br /><br />
    <div>
        &nbsp;&nbsp;<Button  color="primary" on:click={previousPage}>Página Anterior</Button>
		&nbsp;&nbsp;<Button  color="primary" on:click={nextPage}>Siguiente Página</Button>    
    </div>
    <br/>
</main>

<style>
</style>
