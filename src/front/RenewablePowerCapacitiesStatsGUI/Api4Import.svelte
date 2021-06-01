<script>

    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import {pop} from "svelte-spa-router"
    import { Button, Col, Row } from "sveltestrap";
    import * as c3 from 'c3';

//GRAFICO
async function grafica(){
    console.log("holaaaa");
    

    var aux_habitantes_europa=["Europa"];
    var aux_habitantes_africa=["Africa"];
    var otros_paises=[];
    datos.forEach(d => {
           
            if(d["continent"] == "Europe" && d["country"] != "Europe"){
               
                aux_habitantes_europa.push(d["population"]);
               
                 
            }else{
                
                if(d["continent"] == "Africa" && d["country"] != "Africa"){

                    aux_habitantes_africa.push(d["population"]);
                    //otros_paises.push(d["country"]);
                    //console.log(otros_paises);
                   // console.log(data2);
                }

                
            }
            

        });

        var chart = c3.generate({
            data: {
                columns: [
                    aux_habitantes_europa,
                    aux_habitantes_africa
                ],
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: "Europa vs Africa"
            }
        });

        

}

//FIN GRAFICO

    onMount(cargarDatos); //CARGAR LOS DATOS AL INICIAR  
    
   let datos=[];
   let paises=[];
   let numerosHabitantes=[];
   let iter=0;
   
    
    //CARGA DATOS EN LA TABLA loadInitialData
      async function cargarDatos() {
            
        const res = await fetch("/api4");

        console.log(res.status);
        
        const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
        console.log(json);
        
        datos = json["response"];
        console.log(datos);

        var x=0;

        

        datos.forEach(d => {
           
           // numerosCasos.push(d["cases"]);
           //console.log("NumerosCasos: "+numerosCasos[x].total);
           //console.log(numerosCasos.length);
            if(d["continent"] == "Europe" && d["country"] != "Europe"){
                paises.push(d["country"]);
                numerosHabitantes.push(d["population"]);

                 
            }
            

        });
        
        grafica();

    }
    
    
    
</script>
 
<svelte:head>
  
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.css" integrity="sha512-GQSxWe9Cj4o4EduO7zO9HjULmD4olIjiQqZ7VJuwBxZlkWaUFGCxRkn39jYnD2xZBtEilm0m4WBG7YEmQuMs5Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.js" integrity="sha512-11Z4MD9csmC3vH8Vd0eIPJBQu3uEHEqeznWEt3sLBCdQx3zm9mJbBcJH8WTcyGY9EXDE81BNpjE2vLosPK8cFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css" integrity="sha512-cznfNokevSG7QPA5dZepud8taylLdvgr0lDqw/FEZIhluFsSwyvS81CMnRdrNSKwbsmc43LtRd2/WMQV+Z85AQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.js" integrity="sha512-+IpCthlNahOuERYUSnKFjzjdKXIbJ/7Dd6xvUp+7bEw0Jp2dg6tluyxLs+zq9BMzZgrLv8886T4cBSqnKiVgUw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<main>
    <br/>
       
<center>
    <p>API proporcionada por RapidApi, en cuestión covid-193.p.rapidapi.com que proporciona estadisticas del numero de habitantes por paises, etc.</p>
    <p>En esta API podemos ver la comparación de habitantes entre Africa y Europa y así poder contractar datos con nuestra API.</p>
    <p></p>
</center>
    

<hr>

<div id="chart"></div>
<hr/>
    <center><p>Lista de paises de la unión Europea y el numero de Habitantes</p></center>
    
    <Table bordered responsive>
        <thead>
            <tr>
                <th style="background-color: cadetblue;">Country</th>
                <th style="background-color: cadetblue;">Numero de Habitantes</th>
                
            </tr>
        </thead>
        <tbody>
            
            {#each datos as dato}
               {#if dato.continent == "Europe" && dato.country != "Europe"}
               
               <tr>
                   
                    <td style="background-color: lightgreen;">{dato.country}</td>
                    <td style="background-color: lightgreen;">{dato.population}</td>
                    
                    
                 </tr> 
               {/if} 
                
            {/each}

        </tbody>
    </Table>
    <br/>
    
    <p class="backbutton">
       <center> <Button color="secondary" on:click={pop}>Volver</Button> </center>
    </p> 

</main>
    


<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>