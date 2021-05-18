<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    let dataJesus = [];
    let dataJorge = [];
    let dataAlvaro = [];
    let total = [];
    let axisX = [];
    let carbonLine= [];
    let methaneLine = [];
    let nitrousLine = [];
    let governmentLine= [];
    let privateLine = [];
    let nonprofitLine = []; 
    let solarLine= [];
    let hidraulicLine = [];
    let windLine = []; 

async function loadGraph(){


    const res = await fetch( "/api/v1/greenhousegasemissions-stats");
    const res1 = await fetch( "/api/v1/foundsresearchsources-stats");
    const res2 = await fetch( "/api/v1/renewablepowercapacities-stats");
    dataJesus = await res.json();
    dataJorge = await res1.json();
    dataAlvaro = await res2.json();
    //total = dataJesus.concat(dataJorge);
    //console.log(total);
   

    

    dataJesus.forEach(d => {
        axisX.push(d.country+" "+d.year);
        carbonLine.push(d["carbon_dioxide"]);
        // methaneLine.push(d["methane"]);
        // nitrousLine.push(d["nitrous_oxide"]);   
    });

    dataJorge.forEach(d => {
        axisX.push(d.country+" "+d.year); 
        // governmentLine.push(d["percentage_of_government_funding"]);  
        privateLine.push(d["percentage_of_private_financing"]);  
        // nonprofitLine.push(d["percentage_of_non_profit_funding"]);  
    });

    dataAlvaro.forEach(d => {
        axisX.push(d.country+" "+d.year); 
        solarLine.push(d["solar_production_in_megawatts"]);  
        // hidraulicLine.push(d["hydraulic_production_in_megawatts"]);  
        // windLine.push(d["wind_power_production_in_megawatts"]);  
    });
			
			
		
    Highcharts.chart('container', {
        chart: {
                type: 'line',
                backgroundColor: null,
                height: 400
            },
        title: {
            text: 'Datos conjuntos en el periodo 2014-2018'
        },

        
        yAxis: {
            title: {
                    text: 'Valores'
                }
            
        },

        xAxis: {
            title: {
                    text: 'País y Año'
                },
                categories: axisX,
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },


        series: [{
                name: 'Dióxido de carbono',
                data: carbonLine,
            } , {
                name: 'Financiación privada',
                data: privateLine,
            },  {
                name: 'Producción Solar en MegaWatios',
                data: solarLine,
            }
        ],
        

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>
    

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="backbutton">
            <Button color="secondary" on:click="{pop}">Volver</Button>
        </p>
    </figure>

</main>
<style>
    .backbutton{
        text-align: center;
    }

    </style>
