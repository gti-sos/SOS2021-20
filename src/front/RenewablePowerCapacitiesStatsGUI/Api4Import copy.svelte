<script>

    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import {pop} from "svelte-spa-router"
    import { Button, Col, Row } from "sveltestrap";

//GRAFICO
async function grafica(){
    console.log("holaaaa");

    

    Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Habitantes de algunos paises de la unión europea'
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    },
    xAxis: {
        categories: [paises[0], paises[1], paises[2], paises[3], paises[4]],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 2021',
        data: [numerosHabitantes[0], numerosHabitantes[1], numerosHabitantes[2], numerosHabitantes[3], numerosHabitantes[4]]
    }]
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
 

<main>
    <br/>
    <p class="backbutton">
        <Button color="secondary" on:click={pop}>Volver</Button>
    </p>    
    
<!-- GRAFICO -->
<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Aqui vemos una representación gráfica (por millones) del numero de habitantes de algunos paises de la unión europea
    </p>
</figure>
<!-- FIN GRAFICO-->        
<hr>

    <Table bordered responsive>
        <thead>
            <tr>
                <th>Country</th>
                <th>Numero de Habitantes</th>
                
            </tr>
        </thead>
        <tbody>
            
            {#each datos as dato}
               {#if dato.continent == "Europe" && dato.country != "Europe"}
               
               <tr>
                   
                    <td>{dato.country}</td>
                    <td>{dato.population}</td>
                    
                    
                 </tr> 
               {/if} 
                
            {/each}

        </tbody>
    </Table>
    <br/>
    <br/>
    <p class="backbutton">
        <Button color="secondary" on:click={pop}>Volver</Button>
    </p>

</main>
    
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

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