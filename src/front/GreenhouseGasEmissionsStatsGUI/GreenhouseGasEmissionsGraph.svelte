<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    

async function loadGraph(){
    let data = [];
    let axisX = [];
    let carbonLine= [];
    let methaneLine = [];
    let nitrousLine = [];
    const res = await fetch( "/api/v1/greenhousegasemissions-stats");
    data = await res.json();
    

    data.forEach(d => {
        axisX.push(d.country+" "+d.year);
        console.log(axisX);
        carbonLine.push(d["carbon_dioxide"]);
        methaneLine.push(d["methane"]);
        nitrousLine.push(d["nitrous_oxide"]);  
    });
			
		
    Highcharts.chart('container', {
        chart: {
                type: 'line',
                backgroundColor: null,
                height: 400
            },
        title: {
            text: 'Emisiones de Dióxido de Carbono, Metano y Óxido de nitrógeno por país en el periodo 2014-2018'
        },

        
        yAxis: {
            title: {
                    text: 'Toneladas'
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
            }, {
                name: 'Metano',
                data: methaneLine,
            }, {
                name: 'Óxido de nitrógeno',
                data: nitrousLine,
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
            <Button color="secondary"><a href="#/greenhousegasemissions-stats">Volver</a></Button>
        </p>
    </figure>

</main>
<style>
    .backbutton{
        text-align: center;
    }

    a{
        color: black;
        
    }
    
    </style>
