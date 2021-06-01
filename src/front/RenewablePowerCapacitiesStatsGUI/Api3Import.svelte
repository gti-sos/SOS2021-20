<script>

import {pop} from "svelte-spa-router"
import { Button, Col, Row } from "sveltestrap";
import Table from "sveltestrap/src/Table.svelte";
import { onMount } from "svelte";
import * as c3 from 'c3';
onMount(cargarDatos);


let datos_ciudades=[];
    let maximas=[];
    let datos=[];
    
    let aux=[];
  
    async function cargarDatos() {
            
            console.log("Buscando datos...");
            const res = await fetch("https://www.el-tiempo.net/api/json/v2/home");
    
            console.log(res.status);
            
            if (res.status != 200) {
                console.log("Error");
                
            } else {
                console.log("Ok.");
                const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
                datos_ciudades = json.ciudades; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
                console.log(`Tenemos ${datos_ciudades.length} datos.`);
                 
                var i = 0;
                
                datos_ciudades.forEach(d => {
                    
                    maximas = d["temperatures"];
                    console.log(maximas);
                    console.log("maximas "+maximas.max);

                    aux[i] = maximas.max;
                    i++;
                    
                });
                
                ver();
               
            }
    
            
    }    

//CREO EL JSON
async function ver(){
       
        var x = 0;

        datos_ciudades.forEach(d => {
            
            const myObj = {
                    label: d.name,
                    value: aux[x]
            };
            x++;
            const myObjStr = JSON.stringify(myObj);
            datos.push(myObjStr);

            

        });

        console.log("dat" +datos);
        //console.log(dataSource);
        ver2();

}




async function ver2(){
        console.log("hola");
        

        var chart = c3.generate({
            data: {
                
                columns: [
                    
                   
                    [datos_ciudades[0].name, aux[0]],
                    [datos_ciudades[1].name, aux[1]],
                    [datos_ciudades[2].name, aux[2]],
                    [datos_ciudades[3].name, aux[3]],
                    [datos_ciudades[4].name, aux[4]]
                ],
                axis: {
                    x: {
                        type: 'category'
                        
                    }
                },
                types: {
                    data1: 'area-spline',
                    data2: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                },
                
                groups: [['data1', 'data2']]
            }
        });
        
       console.log(datos_ciudades)
}





</script>

<svelte:head>
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.css" integrity="sha512-GQSxWe9Cj4o4EduO7zO9HjULmD4olIjiQqZ7VJuwBxZlkWaUFGCxRkn39jYnD2xZBtEilm0m4WBG7YEmQuMs5Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.js" integrity="sha512-11Z4MD9csmC3vH8Vd0eIPJBQu3uEHEqeznWEt3sLBCdQx3zm9mJbBcJH8WTcyGY9EXDE81BNpjE2vLosPK8cFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css" integrity="sha512-cznfNokevSG7QPA5dZepud8taylLdvgr0lDqw/FEZIhluFsSwyvS81CMnRdrNSKwbsmc43LtRd2/WMQV+Z85AQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.js" integrity="sha512-+IpCthlNahOuERYUSnKFjzjdKXIbJ/7Dd6xvUp+7bEw0Jp2dg6tluyxLs+zq9BMzZgrLv8886T4cBSqnKiVgUw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>


<main>
      <br/><br/>

      <center><h3>API 3: TIEMPO EN ESPAÑA</h3>
      <p>Api proporcionada por eltiempo.es. Podemos ver las temperaturas máximas para las 5 ciudades mas importantes de España.</p>
    </center>
    <hr/>
    <div id="chart"></div>

    <Table bordered responsive>
        <thead>
            
              
        </thead>
        <tbody>
            <td style="background-color: aquamarine;"><h3>CIUDAD:</h3></td>
            {#each datos_ciudades as dato}
                
                  
                      <td>{dato.name}</td>
                      
                  
                
            {/each}
            <tr></tr>
            <td style="background-color: yellowgreen;"><h3>Cº:</h3></td>
            {#each aux as a}
                
                   
                      <td>{a}</td>
                     
                  
                
            {/each}
            

        </tbody>
    </Table>

    <p class="backbutton">
       <center> <Button color="secondary" on:click={pop}>Volver</Button></center>
    </p>
</main>
    
<style>
    
</style>