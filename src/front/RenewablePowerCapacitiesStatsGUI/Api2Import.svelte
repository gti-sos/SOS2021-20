<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    import Table from "sveltestrap/src/Table.svelte";

   // onMount(cargarDatos);

    let datos = [];

    
    let knoperc=[];
    let gfperc= [];
    let intperc = [];

    //GRAFICO
    let axisX = [];

   //FIN GRAFICO
//GRAFICO 
async function verGrafica(){
    
    var aux_knoperc=[];
    var aux_intperc=[];
    var aux_gfperc=[];

    datos.forEach(d => {
       
      var dato_knoperc = parseFloat(d["knoperc"]);
      var dato_intperc = parseFloat(d["intperc"]);
      var dato_gfperc = parseFloat(d["gfperc"]);
      
      aux_knoperc.push(dato_knoperc);
      aux_intperc.push(dato_intperc);
      aux_gfperc.push(dato_gfperc)  
       
   });



    Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Porcentaje de paro en diferentes paises'
    },
    subtitle: {
        text: 'Source: Grupo 23 https://sos2021-23.herokuapp.com/api/v2/unemployment-stats'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Porcentaje (%)'
        }
    },
    xAxis: {
        crosshair: true,
            title: {
                    text: 'País y Año'
                },
                categories: axisX,
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
                name: 'Segun Knoema.es',
                data: aux_knoperc
            }, {
                name: 'Según InternetWorldStats.com',
                data: aux_intperc
            }, {
                name: 'Según Gfmag.com',
                data: aux_gfperc
    }],
});


}
//FIN GRAFICO

async function cargarDatos(){
    
    const res_cargar = await fetch("/api2LoadInitialData");
    console.log(res_cargar);

    const res_api2 = await fetch("/api2");
    datos = await res_api2.json();
    
    datos.forEach(d => {
       
        axisX.push(d.country+" "+d.year);
        knoperc.push(d["knoperc"]);
        gfperc.push(d["gfperc"]);
        intperc.push(d["intperc"]);  

        
    });

    verGrafica();
}


</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{cargarDatos}"></script>
</svelte:head>

<main>
    <br/>
    <center><a target="_blank" href="https://sos2021-23.herokuapp.com/api/v2/unemployment-stats"><h3> API PROPORCIONADA POR EL GRUPO 23 </h3></a>
        <p>Aqui podemos ver la relación que existe entre la capacidad de producción de energia renovable y el porcentaje de paro de ese mismo pais.</p>
        <p>Y llegar a una conclusión de si los paises que mas produccen tienen el porcentaje de paro menor.</p>
    </center>
    <br/>
    <br/>
   
    <!-- grafica -->
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           
        </p>
    </figure>

    <!-- fin grafica -->

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

