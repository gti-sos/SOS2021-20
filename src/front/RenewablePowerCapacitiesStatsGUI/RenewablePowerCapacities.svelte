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
        const res_iniciar = await fetch(
            "/api/v1/renewablepowercapacities-stats/loadInitialData"
        );
        const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        console.log(res_iniciar.status);
        if (res_iniciar.status != 200) {
            console.log("Error datos ya cargados");
        } else {
            console.log("Ok cargando datos.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
            datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
            console.log(`Tenemos ${datos.length} datos.`);
        }
    }

    //MUESTRA LOS DATOS DE LA BD EN LA TABLA
 /*   async function verTabla() {
        console.log("Buscando datos...");

        const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        if (res.ok) {
            console.log("Ok.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS

            datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
            console.log(`Tenemos ${datos.length} datos.`);
        } else {
            console.log("Error");
        }
    }*/

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
            console.log("!"+datos.length + ", Registers loaded!");
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
                    alert(
                        "La entrada de datos no es correcta:\nTodos los campos menos el país deben ser númericos."
                    );
                }
                if (res.status == 409) {
                    alert(
                        "Los datos que intenta introducir ya se encuentran en la base de datos."
                    );
                }
            });//fin then
        }//FIN ELSE
    }

    //BORRA UN DATO POR PAIS Y AÑO
   /* async function borrarDato(pais, ano) {
        
        var opcion = confirm("¿Estás seguro?");
        if(opcion){

            console.log("Borrando datos...");
            var ruta = RUTA_API + "/" + pais + "/" + ano;
            const res = await fetch(ruta, {
                method: "DELETE",
            }).then((res) => {
                verTabla();
            });

        }else{
            console.log("Cancelado.");
        }
        
        
    }*/
    //DeleteOneData
    async function deleteOneData(country, year){
        if(confirm("Va a eliminar un dato, ¿está seguro?\n Esta acción es irreversible")){
            console.log("Deleting data...");
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

    onMount(verTabla); 
</script>

<main>
    <br /><br /><hr/>
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
                    <td><Button color="danger" on:click={deleteOneData(dato.country, dato.year)}> Borrar</Button>
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
</main>

<style>
</style>
