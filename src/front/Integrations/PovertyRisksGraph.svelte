<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {push} from "svelte-spa-router";


async function loadGraph(){
    let dataGGE = [];
    let dataPoverty = [];
    let xaxis = [];
    let xaxis1 = [];
    let carbonBubble = [];
    let povertyBubble = [];
    let lista = [];

    //Extracción de datos greengashouseemissions-stats
     const resGGE = await fetch( "/api/v1/greenhousegasemissions-stats");
    dataGGE = await resGGE.json();
    console.log(dataGGE); 
    
    //Extracción de datos poverty_risks-stats
    const resPoverty = await fetch( "/v1/integration/poverty_risks");
    dataPoverty = await resPoverty.json();
    console.log(dataPoverty); 

    let dat1 = dataGGE.map((d) => {
			let res = [d["year"],d["carbon_dioxide"]];
			return res;
		});
        console.log(dat1); 
    
        let dat2 = dataPoverty.map((e) => {
			let res2 = [e["year"],e["people_in_risk_of_poverty"]];
            return res2;
		});
        console.log(dat2); 


    /*dataGGE.forEach(d => {
        if(!xaxis.includes(d.year)){
            xaxis.push(d.year);
        }
        carbonBubble.push(d["year"]);
        carbonBubble.push(d["carbon_dioxide"]);
        let listt = carbonBubble; 
        listt.push((lista));
        console.log("lista: " + listt); 
        
    });

    dataPoverty.forEach(e => {
        if(!xaxis1.includes(e.year)){
            xaxis1.push(e.year);
        }
        povertyBubble.push(e["year"]); 
        povertyBubble.push(e["people_in_risk_of_poverty"]); 
        console.log("poverty: " + povertyBubble);
        
    });*/
 
		let chartData = [
            {
				name: "Dióxido de carbono en millones de toneladas ",
                color: 'rgba(223, 83, 83, .5)',
				data: dat1
			},
			{
				name: "Personas en riesgo de pobreza",
                color: 'rgba(119, 152, 191, .5)',
				data: dat2
			}
			
		];



    Highcharts.chart('container', {
    chart: {
        type: 'scatter',
       
    },
    title: {
        text: ' '
    },
    subtitle: {
        text: ' '
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Año'
        },
        startOnTick: false,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Millones de Toneladas / Nº de personas'
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        series: {
            pointStart: 2014,
            pointInterval: 1
            
        },
        
        scatter: {
            marker: {
                radius: 10,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)',
                        
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: 'Año {point.x}, {point.y} Millones de toneladas'
            }
        }
    },
    series: chartData,
    

});

}
    
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <header>
        <h3>INTEGRACIÓN 2 SOS - <a href="https://sos2021-04.herokuapp.com/#/poverty_risks">Poverty Risks-stats GRUPO 04</a></h3>
        <h4>Visualización conjunta de datos</h4>
        
    
        <div id= "initialbuttons">
                <Button on:click={() => push("#/integrations/povertyRisks")}>Representación gráfica</Button>
                <Button on:click={() => push("#/integrations/povertyRisks/tableData")}>Tabla de datos</Button>
         </div>

         
          
    
</header>
<figure class="highcharts-figure">
    <div id="container"></div>
</figure>
    <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://www.highcharts.com/demo/scatter">Highcharts</a></h6>
</main>

<style>
    h3{
        text-align: center;
        margin-top: 50px;
        
    }
    h4{
        text-align: center;
        
    }
    h6{
        text-align: center;
        
    }

    #initialbuttons{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .highcharts-figure{
    min-width: 360px; 
    max-width: 800px;
    margin: 1em auto;
}



  

</style>
