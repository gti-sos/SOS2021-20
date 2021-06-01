<script>

import { onMount } from "svelte";
import Table from "sveltestrap/src/Table.svelte";
import {pop} from "svelte-spa-router"
import { Button, Col, Row } from "sveltestrap";
onMount(cargarDatos); //CARGAR LOS DATOS AL INICIAR  


let deaths_ambient_particulate_matter_pollution= [];
let deaths_household_air_pollution_from_solid_fuels = [];
let deaths_air_pollution = [];

let datos=[];
  //CARGA DATOS EN LA TABLA loadInitialData
  async function cargarDatos() {
        
        console.log("Buscando datos...");
        const res = await fetch("/api1");

        
        //const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        console.log(res.status);
        
        if (res.status != 200) {
            console.log("Error");
            
        } else {
            console.log("Ok.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
            datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
            console.log(`Tenemos ${datos.length} datos.`);
            console.log(datos);

            datos.forEach(d => {
              
                deaths_ambient_particulate_matter_pollution.push(d["deaths_ambient_particulate_matter_pollution"]);
                deaths_household_air_pollution_from_solid_fuels.push(d["deaths_household_air_pollution_from_solid_fuels"]);
                deaths_air_pollution.push(d["deaths_air_pollution"]);  
            });

        }

        
    }


</script>

<main>
    <br/>
    <center><a target="_blank" href="https://sos2021-03.herokuapp.com/api/v1/air-pollution"><h3> API PROPORCIONADA POR EL GRUPO 03 </h3></a></center>
    <center><p>Aqui podemos ver las particulas contaminantes por paises y asi poder constractar los datos proporcionados por la api principal</p></center>
    <hr/>
   <Table bordered responsive>
    <thead>
        <tr>
            <th>Country</th>
            <th>Year</th>
            <th>Deaths_ambient_particulate_matter_pollution</th>
            <th>Deaths_household_air_pollution_from_solid_fuels</th>
            <th>Deaths_air_pollution</th>
        </tr>
    </thead>
    <tbody>
        
        {#each datos as dato}
            <tr>
                <td>{dato.country}</td>
                <td>{dato.year}</td>
                <td>{dato.deaths_ambient_particulate_matter_pollution}</td>
                <td>{dato.deaths_household_air_pollution_from_solid_fuels}</td>
                <td>{dato.deaths_air_pollution}</td>
                
            </tr>
        {/each}
    </tbody>
</Table>

<p class="backbutton">
   <center> <Button color="secondary" on:click={pop}>Volver</Button></center>
</p>

</main>

<style>

</style>