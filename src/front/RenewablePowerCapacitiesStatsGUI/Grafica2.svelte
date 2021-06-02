<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    

async function loadGraph(){
    let data = [];
    let axisX = [];
    let solar_production_in_megawatts= [];
    let hydraulic_production_in_megawatts = [];
    let wind_power_production_in_megawatts = [];
    const res = await fetch( "/api/v1/renewablepowercapacities-stats");
    data = await res.json();
    

    data.forEach(d => {
        axisX.push(d.country+" "+d.year);
        console.log(axisX);
        solar_production_in_megawatts.push(d["solar_production_in_megawatts"]);
        hydraulic_production_in_megawatts.push(d["hydraulic_production_in_megawatts"]);
        wind_power_production_in_megawatts.push(d["wind_power_production_in_megawatts"]);  
    });
			
		
    Highcharts.chart('container', {
        chart: {
                type: 'area',
                backgroundColor: null,
                height: 400
            },
        title: {
            text: 'Capacidad de producción de energia renovable en el año 2018 por diferentes paises'
        },

        
        yAxis: {
            title: {
                    text: 'MegaWatios'
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
                name: 'Producción solar en Megawatios',
                data: solar_production_in_megawatts,
            }, {
                name: 'Producción hidraulica en Megawatios',
                data: hydraulic_production_in_megawatts,
            }, {
                name: 'Producción Eolica en Megawatios',
                data: wind_power_production_in_megawatts,
            }],
        

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
            <Button color="secondary" on:click={pop}>Volver</Button>
        </p>
    </figure>

</main>
<style>
    .backbutton{
        text-align: center;
    }

    
    
    </style>
