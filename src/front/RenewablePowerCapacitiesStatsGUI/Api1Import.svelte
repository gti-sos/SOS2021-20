<script>

    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import {pop} from "svelte-spa-router"
    import { Button, Col, Row } from "sveltestrap";
    
    //GRAFICA
    import Chartkick from "chartkick"
    import "chartkick/chart.js"
    //FIN GRAFICA
    onMount(cargarDatos); //CARGAR LOS DATOS AL INICIAR  
    
    
    let deaths_ambient_particulate_matter_pollution= [];
    let deaths_household_air_pollution_from_solid_fuels = [];
    let deaths_air_pollution = [];
    let axisx= [];
    let datos=[];
    
    
    //API PROPIA  
    let datos_propios = []; //API MIA
    let datos_eolica=[];
    let datos_solar= [];
    let datos_hydraulica = [];
    let axisX_propio = [];
    
      //CARGA DATOS EN LA TABLA loadInitialData
    async function cargarDatos() {
    
        const res_cargar = await fetch("/api1LoadInitialData");
        console.log(res_cargar);
    
            
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
                    axisx.push(d.country+" "+d.year);
                    deaths_ambient_particulate_matter_pollution.push(d["deaths_ambient_particulate_matter_pollution"]);
                    deaths_household_air_pollution_from_solid_fuels.push(d["deaths_household_air_pollution_from_solid_fuels"]);
                    deaths_air_pollution.push(d["deaths_air_pollution"]);  
                });
               
            }
    
             //CARGO DATOS API PROPIA
                const res_api3 = await fetch("/api/v1/renewablepowercapacities-stats");
                datos_propios = await res_api3.json();
                
    
                datos_propios.forEach(d => {
                
                    axisX_propio.push(d.country+" "+d.year);
                    datos_eolica.push(d["wind_power_production_in_megawatts"]);
                    datos_solar.push(d["solar_production_in_megawatts"]);
                    datos_hydraulica.push(d["hydraulic_production_in_megawatts"]);  
    
                    
                });
    
                //FIN CARGAR DATOS API PROPIA
            verGrafica();
    }
    
    
    async function verGrafica(){
    
      
      
       //CARGO LOS DATOS EOLICOS 
        var datos_eolicos_grafica={
            name:
                "Eolica",
            
            data:{
                     [axisX_propio[0]]:[datos_eolica[0]],
                     [axisX_propio[1]]:[datos_eolica[1]],
                     [axisX_propio[2]]:[datos_eolica[2]],
                     [axisX_propio[3]]:[datos_eolica[3]],
                     [axisX_propio[4]]:[datos_eolica[4]],
                     [axisX_propio[5]]:[datos_eolica[5]],
                     [axisX_propio[6]]:[datos_eolica[6]],
                     [axisX_propio[7]]:[datos_eolica[7]],
                     [axisX_propio[8]]:[datos_eolica[8]],
                     [axisX_propio[9]]:[datos_eolica[9]],
                     [axisX_propio[10]]:[datos_eolica[10]],
                     [axisX_propio[11]]:[datos_eolica[11]],
                     [axisX_propio[12]]:[datos_eolica[12]],
                     [axisX_propio[13]]:[datos_eolica[13]]
                    
             }
        };
    
        //CARGO LOS DATOS SOLARES 
        var datos_solar_grafica={
            name:
                "Solar",
            
            data:{
                     [axisX_propio[0]]:[datos_solar[0]],
                     [axisX_propio[1]]:[datos_solar[1]],
                     [axisX_propio[2]]:[datos_solar[2]],
                     [axisX_propio[3]]:[datos_solar[3]],
                     [axisX_propio[4]]:[datos_solar[4]],
                     [axisX_propio[5]]:[datos_solar[5]],
                     [axisX_propio[6]]:[datos_solar[6]],
                     [axisX_propio[7]]:[datos_solar[7]],
                     [axisX_propio[8]]:[datos_solar[8]],
                     [axisX_propio[9]]:[datos_solar[9]],
                     [axisX_propio[10]]:[datos_solar[10]],
                     [axisX_propio[11]]:[datos_solar[11]],
                     [axisX_propio[12]]:[datos_solar[12]],
                     [axisX_propio[13]]:[datos_solar[13]]
                    
             }
        };
        
        //CARGO LOS DATOS hydraulico 
        var datos_hydraulico_grafica={
            name:
                "Hidraulica",
            
            data:{
                     [axisX_propio[0]]:[datos_hydraulica[0]],
                     [axisX_propio[1]]:[datos_hydraulica[1]],
                     [axisX_propio[2]]:[datos_hydraulica[2]],
                     [axisX_propio[3]]:[datos_hydraulica[3]],
                     [axisX_propio[4]]:[datos_hydraulica[4]],
                     [axisX_propio[5]]:[datos_hydraulica[5]],
                     [axisX_propio[6]]:[datos_hydraulica[6]],
                     [axisX_propio[7]]:[datos_hydraulica[7]],
                     [axisX_propio[8]]:[datos_hydraulica[8]],
                     [axisX_propio[9]]:[datos_hydraulica[9]],
                     [axisX_propio[10]]:[datos_hydraulica[10]],
                     [axisX_propio[11]]:[datos_hydraulica[11]],
                     [axisX_propio[12]]:[datos_hydraulica[12]],
                     [axisX_propio[13]]:[datos_hydraulica[13]]
                    
             }
        };
    
        
        
    
        //deaths_ambient_particulate_matter_pollution
        var particulate_matter_pollution={
            name:
                "M. ambiente contaminación por partículas",
            
            data:{
                     [axisx[0]]:[deaths_ambient_particulate_matter_pollution[0]],
                     [axisx[1]]:[deaths_ambient_particulate_matter_pollution[1]],
                     [axisx[2]]:[deaths_ambient_particulate_matter_pollution[2]],
                     [axisx[3]]:[deaths_ambient_particulate_matter_pollution[3]],
                     [axisx[4]]:[deaths_ambient_particulate_matter_pollution[4]],
                     [axisx[5]]:[deaths_ambient_particulate_matter_pollution[5]]
                     
                    
             }
        };
        //deaths_household_air_pollution_from_solid_fuels
        var deaths_household={
            name:
                "M. contaminación combustibles sólidos",
            
            data:{
                     [axisx[0]]:[deaths_household_air_pollution_from_solid_fuels[0]],
                     [axisx[1]]:[deaths_household_air_pollution_from_solid_fuels[1]],
                     [axisx[2]]:[deaths_household_air_pollution_from_solid_fuels[2]],
                     [axisx[3]]:[deaths_household_air_pollution_from_solid_fuels[3]],
                     [axisx[4]]:[deaths_household_air_pollution_from_solid_fuels[4]],
                     [axisx[5]]:[deaths_household_air_pollution_from_solid_fuels[5]]
                     
                    
             }
        };
    
         //deaths_air_pollution
         var deaths_air={
            name:
                "M. polución del aire",
            
            data:{
                     [axisx[0]]:[deaths_air_pollution[0]],
                     [axisx[1]]:[deaths_air_pollution[1]],
                     [axisx[2]]:[deaths_air_pollution[2]],
                     [axisx[3]]:[deaths_air_pollution[3]],
                     [axisx[4]]:[deaths_air_pollution[4]],
                     [axisx[5]]:[deaths_air_pollution[5]]
                     
                    
             }
        };
    
        //GRAFICO
        var data = [
            datos_eolicos_grafica,
            datos_solar_grafica,
            datos_hydraulico_grafica,
            particulate_matter_pollution,
            deaths_household,
            deaths_air
           
        ]
        
        new Chartkick.ColumnChart("chart-1", data, {stacked: true})
            
    
    
    }//FIN VER GRAFICA
    
    
    </script>
    
    <main>
        <br/>
        <center><a target="_blank" href="https://sos2021-03.herokuapp.com/api/v1/air-pollution"><h3> API PROPORCIONADA POR EL GRUPO 03 </h3></a></center>
        <center><p>Aqui podemos ver las muertes por particulas contaminantes por algunos paises y asi poder constractar los datos proporcionados por la api principal</p></center>
        <hr/>
    
        <div id="chart-1" style="height: 300px;"></div>
    
        <br/>
       <Table bordered responsive>
        <thead>
            <tr>
                <th style="background-color: palegreen;">Country</th>
                <th style="background-color: palegreen;">Year</th>
                <th style="background-color: palegreen;">Deaths_ambient_particulate_matter_pollution</th>
                <th style="background-color: palegreen;">Deaths_household_air_pollution_from_solid_fuels</th>
                <th style="background-color: palegreen;">Deaths_air_pollution</th>
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
    <br/>
    <p class="backbutton">
       <center> <Button color="secondary" on:click={pop}>Volver</Button></center>
    </p>
    <br/>
    </main>
    
    <style>
    
    </style>