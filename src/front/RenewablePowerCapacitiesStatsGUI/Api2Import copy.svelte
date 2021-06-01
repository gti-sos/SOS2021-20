<script>

    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import {pop} from "svelte-spa-router"
    import { Button, Col, Row } from "sveltestrap";
    onMount(cargarDatos); //CARGAR LOS DATOS AL INICIAR  
    
    
    
    let gfperc= [];
    let intperc = [];
    let knoperc = [];
    
    let datos=[];
      //CARGA DATOS EN LA TABLA loadInitialData
    async function cargarDatos() {
            
            console.log("Buscando datos...");
            const res = await fetch("/api2");
    
            
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
                    gfperc.push(d["gfperc"]);
                    intperc.push(d["intperc"]);
                    knoperc.push(d["knoperc"]);  
                });
    
            }
    
            
    }
    
    
    

    </script>
    
    


    <main>
        <br/>
        <center><a target="_blank" href="https://sos2021-23.herokuapp.com/api/v2/unemployment-stats"><h3> API PROPORCIONADA POR EL GRUPO 23 </h3></a></center>
        <p>Porcentaje de paro en diferentes paises</p>
        <hr/>

        

        <br/>

       <Table bordered responsive>
        <thead>
            <tr>
                <th>Country</th>
                <th>Year</th>
                <th>Porcentaje según Knoema.es</th>
                <th>Porcentaje según InternetWorldStats.com</th>
                <th>Porcentaje según Gfmag.com</th>
            </tr>
        </thead>
        <tbody>
            
            {#each datos as dato}
                <tr>
                    <td>{dato.country}</td>
                    <td>{dato.year}</td>
                    <td>{dato.knoperc}%</td>
                    <td>{dato.intperc}%</td>
                    <td>{dato.gfperc}%</td>
                    
                </tr>
            {/each}
        </tbody>
    </Table>
    
    <p class="backbutton">
        <Button color="secondary" on:click={pop}>Volver</Button>
    </p>
    
    </main>
    
    <style>
    
    </style>