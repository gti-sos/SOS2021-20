<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
    
    

async function loadGraph(){
    let data = [];
    let axisX = [];
    let carbonBar= [];
    let methaneBar = [];
    let nitrousBar = [];
    const res = await fetch( "/api/v1/greenhousegasemissions-stats");
    data = await res.json();
    

    data.forEach(d => {
        axisX.push(d.country+" "+d.year);
        console.log(axisX);
        carbonBar.push(d["carbon_dioxide"]);
        methaneBar.push(d["methane"]);
        nitrousBar.push(d["nitrous_oxide"]); 
        /*const array1 = carbonBar.concat(methaneBar);
    const valuesNumber = array1.concat(nitrousBar);
    console.log("los datos: " + array1);
    let sum = valuesNumber.reduce((previous, current) => current += previous);
    let averageData = sum / valuesNumber.length;
    console.log("el promedio: " + averageData);*/
    });
    
    let sum1 = carbonBar.reduce((previous, current) => current += previous);
    let sum2 = methaneBar.reduce((previous, current) => current += previous);
    let sum3 = nitrousBar.reduce((previous, current) => current += previous);

			
		
    Highcharts.chart('container', {
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

        labels: {
            items: [{
                html: 'Total de emisiones',
                style: {
                    left: '50px',
                    top: '18px',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'black'
                }
            }]
        },

        series: [{
                type: 'column',
                name: 'Dióxido de carbono',
                data: carbonBar,
            }, {
                type: 'column',
                name: 'Metano',
                data: methaneBar,
            }, {
                type: 'column',
                name: 'Óxido de nitrógeno',
                data: nitrousBar,
            },{
                type: 'pie',
                name: 'Total emisiones',
                data: [{
                    name: 'Dióxido de carbono',
                    y: sum1,
                    color: Highcharts.getOptions().colors[0] 
                }, {
                    name: 'Metano',
                    y: sum2,
                    color: Highcharts.getOptions().colors[1] 
                }, {
                    name: 'Óxido de nitrógeno',
                    y: sum3,
                    color: Highcharts.getOptions().colors[2]
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                enabled: false
            }

            }]
        /*legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        }, */

    });
}

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
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

    .highcharts-figure {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
}


    
    </style>
