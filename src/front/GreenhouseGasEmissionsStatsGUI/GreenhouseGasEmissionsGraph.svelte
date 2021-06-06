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
 //GRÁFICA HIGHCHARTS   
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
            text: ' '
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

//GRÁFICA FRAPECHARTS

    const dataFrape = {
        labels: axisX,
        datasets: [
            {
                name: "Toneladas de Dióxido de carbono",
                type: "percentage",
                values: carbonBar
            }
        ]
    };

    const dataFrape2 = {
        labels: axisX,
        datasets: [
            {
                name: "Toneladas de Metano",
                type: "percentage",
                values: methaneBar
            }
        ]
    };

    const dataFrape3 = {
        labels: axisX,
        datasets: [
            {
                name: "Toneladas de Óxido de nitrógeno",
                type: "percentage",
                values: nitrousBar
            }
        ]
    };
    const chart = new frappe.Chart("#chart", {  
                                                
        title: "Millones de toneladas de Dióxido de carbono",
        data: dataFrape,
        type: 'percentage', 
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    });

    const chart2 = new frappe.Chart("#chart2", {  
                                            
        title: "Millones de toneladas de Metano",
        data: dataFrape2,
        type: 'percentage', 
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    });

    const chart3 = new frappe.Chart("#chart3", {  
                                                
        title: "Millones de toneladas de Óxido de nitrógeno",
        data: dataFrape3,
        type: 'percentage', 
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    });

}

</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>
    

<main>
    <h4>Emisiones de Dióxido de Carbono, Metano y Óxido de nitrógeno por país en el periodo 2014-2016</h4>
    <h5>Gráfico realizado con la librería Highcharts</h5>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://www.highcharts.com/demo/scatter">Highcharts</a></h6>
    <hr width=900>
    <h5>Gráficos realizados con la librería FrappeCharts</h5>
    <div id="chart"></div>
    <div id="chart2"></div>
    <div id="chart3"></div>
    <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://frappe.io/charts">Frappe Charts</a></h6>
    
    <p class="backbutton">
        <Button color="secondary" on:click="{pop}">Volver</Button>
    </p>
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
        margin:20px;
}
h5{
        text-align: center;
        margin:20px;
        
    }
        
h4{
        text-align: center;
        margin:20px;
        
    }
 </style>
