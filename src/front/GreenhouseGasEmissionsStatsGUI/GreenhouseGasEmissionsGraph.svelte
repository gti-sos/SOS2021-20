<script>
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
    
    //let sum1 = carbonBar.reduce((previous, current) => current += previous);
    //let sum2 = methaneBar.reduce((previous, current) => current += previous);
    //let sum3 = nitrousBar.reduce((previous, current) => current += previous);

	Highcharts.chart('container', {
        
        lang: {
            viewFullscreen:"Ver en pantalla completa",
                exitFullscreen:"Salir de pantalla completa",
                printChart: "Imprimir gráfico",
                downloadPNG:"Descargar en formato PNG",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadSVG:"Descargar en formato SVG",
                downloadCSV: "Descargar CSV",
                downloadXLS: "Descargar XLS",
                downloadCSV: "Descargar CSV",
                downloadXLS: "Descargar XLS",
                viewData: "Ver datos en tabla"
            },
        
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Emisiones de Dióxido de Carbono, Metano y Óxido de nitrógeno por país en el periodo 2014-2016'
        },
        
        xAxis: {
            categories: axisX,
            title: {
                text: 'País/Año'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Millones de toneladas',
                
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millones de toneladas'
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
            name: 'Dióxido de carbono',
            data: carbonBar
        }, {
            name: 'Metano',
            data: methaneBar
        }, {
            name: 'Óxido de nitrógeno',
            data: nitrousBar
        }]
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
    <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://www.highcharts.com/demo/scatter">Highcharts</a></h6>

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
h6{
        text-align: center;
        
    }
 </style>
