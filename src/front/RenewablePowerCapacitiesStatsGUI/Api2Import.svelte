<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    import Table from "sveltestrap/src/Table.svelte";

   // onMount(cargarDatos);

    let datos = [];//API_IMPORTADA
    
    let knoperc=[];
    let gfperc= [];
    let intperc = [];
    
  //API PROPIA  
    let datos_propios = []; //API MIA
    let datos_eolica=[];
    let datos_solar= [];
    let datos_hydraulica = [];
    let axisX_propio = [];

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

//API PROPIA
   var aux_solar=[];
    var aux_hydraulica=[];
    var aux_eolica=[];
    
   var paises_iguales=[];
   var datos_conjuntos_kno=[];
   var datos_conjuntos_int=[];
   var datos_conjuntos_gpf=[];
   var datos_conjuntos_solar=[];
   var datos_conjuntos_hydraulica=[];
   var datos_conjuntos_eolica=[];

    datos_propios.forEach(d => {
       
        
      
      var dato_solar = parseFloat(d["solar_production_in_megawatts"]);
      var dato_hydraulica = parseFloat(d["hydraulic_production_in_megawatts"]);
      var dato_eolica = parseFloat(d["wind_power_production_in_megawatts"]);
      
      aux_solar.push(dato_solar);
      aux_hydraulica.push(dato_hydraulica);
      aux_eolica.push(dato_eolica)  
       
   });
   
   console.log(axisX)
   console.log(axisX_propio)

   for(var x=0;x<datos_propios.length;x++){
       var pais_propio ="";
       pais_propio =  datos_propios[x].country;
       pais_propio = pais_propio.toLowerCase();
       var ano_propio = datos_propios[x].year;

            for(var y=0;y<datos.length;y++){
                var pais_api2="";
                pais_api2 =  datos[y].country;
                pais_api2 = pais_api2.toLowerCase();
                var ano_api2 = datos[y].year;

                    if(pais_propio == pais_api2 && ano_propio==ano_api2 ){
                        console.log("paises y ano iguales: "+pais_propio+" "+pais_api2+" "+ano_propio+" "+ano_api2 );
                        
                        paises_iguales.push(pais_propio+" "+ano_api2); //EJE X
                        datos_conjuntos_kno.push(aux_knoperc[y]);
                        datos_conjuntos_int.push(aux_intperc[y]);
                        datos_conjuntos_gpf.push(aux_gfperc[y]);

                        datos_conjuntos_solar.push(aux_solar[x]);
                        datos_conjuntos_hydraulica.push(aux_hydraulica[x]);
                        datos_conjuntos_eolica.push(aux_eolica[x]);
                    }
            }
      
   }
   

//FIN API PROPIA

    Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Porcentaje de paro en diferentes paises y capacidad total producida de energia renovable'
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
                categories: paises_iguales,
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} % ó MW</b></td></tr>',
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
                name: 'Paro Segun Knoema.es',
                data: datos_conjuntos_kno
            }, {
                name: 'Según InternetWorldStats.com',
                data: datos_conjuntos_int
            }, {
                name: 'Según Gfmag.com',
                data: datos_conjuntos_gpf
            }, {
                name: 'Hydraulica',
                data: datos_conjuntos_hydraulica
            }, {
                name: 'Eolica',
                data: datos_conjuntos_eolica
            }
            , {
                name: 'Solar',
                data: datos_conjuntos_solar  
    }],
});


}
//FIN GRAFICO

async function cargarDatos(){
    
   // const res_cargar = await fetch("/api2LoadInitialData");
   // console.log(res_cargar);

    const res_api2 = await fetch("/api2");
    datos = await res_api2.json();
    
    

    datos.forEach(d => {
       
        axisX.push(d.country+" "+d.year);
        knoperc.push(d["knoperc"]);
        gfperc.push(d["gfperc"]);
        intperc.push(d["intperc"]);  

        

    });

    
    //CARGO DATOS API PROPIA
    const res_api3 = await fetch("/api/v1/renewablepowercapacities-stats");
    datos_propios = await res_api3.json();
    console.log(datos_propios);

    datos_propios.forEach(d => {
       
       axisX_propio.push(d.country+" "+d.year);
       datos_eolica.push(d["wind_power_production_in_megawatts"]);
       datos_solar.push(d["solar_production_in_megawatts"]);
       datos_hydraulica.push(d["hydraulic_production_in_megawatts"]);  

       
   });

    //FIN CARGAR DATOS API PROPIA
    
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
        <p>Aqui podemos ver la relación que existe entre la capacidad de producción de energia renovable y el porcentaje de paro de ese mismo pais y año que coincidan en las 2 apis(externa e interna).</p>
        <p>Y llegar a una conclusión de si los paises que mas produccen tienen el porcentaje de paro menor.</p>
        <p>ESTA GRÁFICA MUESTRA LOS DATOS QUE COINCIDAN EN LAS 2 APIS ( PAIS Y AÑO ).</p>
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

