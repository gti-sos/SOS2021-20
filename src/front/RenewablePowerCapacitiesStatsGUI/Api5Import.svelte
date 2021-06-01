<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    import Table from "sveltestrap/src/Table.svelte";

    onMount(loadGraph);

    let datos = [];
    let knoperc=[];
    let gfperc= [];
    let intperc = [];
   
    let data2=[];

async function loadGraph(){
    
   
    let solar_production_in_megawatts= [];
    let hydraulic_production_in_megawatts = [];
    let wind_power_production_in_megawatts = [];
    const res = await fetch( "/api/v1/renewablepowercapacities-stats");
    datos = await res.json();
    

    datos.forEach(d => {
       
        solar_production_in_megawatts.push(d["solar_production_in_megawatts"]);
        hydraulic_production_in_megawatts.push(d["hydraulic_production_in_megawatts"]);
        wind_power_production_in_megawatts.push(d["wind_power_production_in_megawatts"]);  
    });
	
    
    
	const res2 = await fetch( "/api2");
    data2 = await res2.json();	
    console.log(data2);

    data2.forEach(d2 => {
       
        knoperc.push(d2["knoperc"]);
        gfperc.push(d["gfperc"]);
        intperc.push(d["intperc"]);
        console.log(knoperc);
    });

    console.log(knoperc.length);
    
}

</script>


    

<main>
    <br/>
    <center><a target="_blank" href="https://sos2021-23.herokuapp.com/api/v2/unemployment-stats"><h3> API PROPORCIONADA POR EL GRUPO 23 </h3></a>
        <p>Aqui podemos ver la relación que existe entre la capacidad de producción de energia renovable y el porcentaje de paro de ese mismo pais.</p>
        <p>Y llegar a una conclusión de si los paises que mas produccen tienen el porcentaje de paro menor.</p>
    </center>
    <hr/>
    <Table bordered responsive>
        <thead>
            <tr>
                <th style="background-color: lightseagreen;">Country</th>
                <th style="background-color: lightseagreen;">Year</th>
                <th style="background-color: lightseagreen;">solar_production_in_megawatts</th>
                <th style="background-color: lightseagreen;">hydraulic_production_in_megawatts</th>
                <th style="background-color: lightseagreen;">wind_power_production_in_megawatts</th>
                <th style="background-color: yellowgreen;">% de PARO según Knoema.es</th> 
                <th style="background-color: yellowgreen;">% de PARO según InternetWorldStats.com</th> 
                <th style="background-color: yellowgreen;">% de PARO según Gfmag.com</th> 
            </tr>
        </thead>
        <tbody>
          
            {#each datos as dato}
            <tr>
                    <td>{dato.country}</td>
                    <td>{dato.year}</td>
                    <td>{dato.solar_production_in_megawatts}</td>
                    <td>{dato.hydraulic_production_in_megawatts}</td>
                    <td>{dato.wind_power_production_in_megawatts}</td>
                    {#each data2 as k}
                        {#if k.country == dato.country}
                        <td>{k.knoperc}%</td>
                        <td>{k.gfperc}%</td>
                        <td>{k.intperc}%</td>
                        
                        {/if}
                        
                    {/each}
                    
                </tr>        
               
            {/each}
            
            
             
        </tbody>
    </Table>

    <br/>
    <p class="backbutton">
       <center> <Button color="secondary" on:click={pop}>Volver</Button> </center>
    </p>

</main>

