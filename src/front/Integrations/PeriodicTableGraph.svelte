<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 
 
let dataPTOE = [];
let dataSerie = [];
 


async function loadGraph(){
    
    //GET DATA
    console.log("Fetching data...");
        const res = await fetch("/v3/integration/periodictable");
        if(res.ok){
            const returnedJson = await res.json();
            dataPTOE = returnedJson;
            
                 
        } else {
            console.log("Error");
            dataPTOE = [];
        }

        let dat = dataPTOE.map((e) => {
			let res2 = [e["AtomicNumber"],e["Year"],e["AtomicMass"]];
            return res2;
		});
        





            
 Highcharts.setOptions({
    colors: Highcharts.getOptions().colors.map(function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.2).get('rgb')]
            ]
        };
    })
});

// Set up the chart
var chart = new Highcharts.Chart({
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
        renderTo: 'container',
        margin: 100,
        type: 'scatter3d',
        animation: true,
        options3d: {
            enabled: true,
            alpha: 30,
            beta: 50,
            depth: 250,
            viewDistance: 5,
            fitToPlot: false,
            frame: {
                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                side: { size: 1, color: 'rgba(0,0,0,0.06)' }
            }
        }
    },
    title: {
        text: ' '
    },
    plotOptions: {
        scatter: {
            width: 20,
            height: 10,
            depth: 60
        }
    },
    yAxis: {
       
        title: {
            enabled: true,
            text: 'Año Descubrimiento'
        },
        
    },
    xAxis: {
        
        title: {
            enabled: true,
            text: 'Número atómico'
        },
        gridLineWidth: 1
    },
    zAxis: {
        title: {
            enabled: true,
            text: 'Masa Atómica'
        },
        
    
        showFirstLabel: false
    },
    legend: {
        enabled: true
    },
    
    series: [{
        name: 'Elementos',
        colorByPoint: true,
        accessibility: {
            exposeAsGroupOnly: true
        },
        data: dat
    }]
});


// Add mouse and touch events for rotation
(function (H) {
    function dragStart(eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.chartX,
            posY = eStart.chartY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            sensitivity = 5,  // lower is more sensitive
            handlers = [];

        function drag(e) {
            // Get e.chartX and e.chartY
            e = chart.pointer.normalize(e);

            chart.update({
                chart: {
                    options3d: {
                        alpha: alpha + (e.chartY - posY) / sensitivity,
                        beta: beta + (posX - e.chartX) / sensitivity
                    }
                }
            }, undefined, undefined, false);
        }

        function unbindAll() {
            handlers.forEach(function (unbind) {
                if (unbind) {
                    unbind();
                }
            });
            handlers.length = 0;
        }

        handlers.push(H.addEvent(document, 'mousemove', drag));
        handlers.push(H.addEvent(document, 'touchmove', drag));


        handlers.push(H.addEvent(document, 'mouseup', unbindAll));
        handlers.push(H.addEvent(document, 'touchend', unbindAll));
    }
    H.addEvent(chart.container, 'mousedown', dragStart);
    H.addEvent(chart.container, 'touchstart', dragStart);
}(Highcharts));
    

}

</script>

<main>
    <header>
        <h3>USO DE API EXTERNA 3 - Tabla Periódica de los Elementos:</h3>
        <h5>Representación espacial de los elementos según si número atómico, año de descubrimiento y masa atómica.</h5>
        <h6>Datos obtenidos de la API privada <a href="https://rapidapi.com/PappasBrent/api/periodic-table-of-elements/details">Periodic Table of Elements</a></h6>
            <!--
            <div id= "initialbuttons">
                <Button on:click={() => push("#/integrations/ottdetails")}>Representación gráfica</Button>
                <Button on:click={() => push("#/integrations/ottdetails/tableData")}>Tabla de datos</Button>
             </div> 
            -->
            
     </header>
    
     <figure class="highcharts-figure">
        <div id="container"></div>
     
     <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://www.highcharts.com/demo/scatter">Highcharts</a></h6>
    
   
</main>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"on:load="{loadGraph}"></script>
  
</svelte:head>

<style>
        
    h3{
        text-align: center;
        margin-top: 50px;
        
    }
    h5{
        text-align: center;
        
    }
    h6{
        text-align: center;
    }

    /*#initialbuttons{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;

    }*/
    #container {
    height: 420px; 
}

.highcharts-figure {
    min-width: 360px; 
    max-width: 600px;
    margin: 1em auto;
}
        
  

</style>

