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
   
    

async function loadGraph(){
    
    const res_cargar = await fetch("/api2LoadInitialData");
    console.log(res_cargar);

    const res_api2 = await fetch("/api2");
    datos = await res_api2.json();
    
    datos.forEach(d => {
       

        knoperc.push(d["knoperc"]);
        gfperc.push(d["gfperc"]);
        intperc.push(d["intperc"]);  

        
    });

    
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
                    <td>{dato.knoperc}</td>
                    <td>{dato.intperc}</td>
                    <td>{dato.gfperc}</td>
                    
                    
            </tr>        
               
            {/each}
            
            
             
        </tbody>
    </Table>

    <br/>
    <p class="backbutton">
       <center> <Button color="secondary" on:click={pop}>Volver</Button> </center>
    </p>

</main>

