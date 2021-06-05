<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 
 
let dataOTT = [];
let dataSerie = [];
 


async function loadGraph(){
    
    //GET DATA
    console.log("Fetching data...");
        const res = await fetch("/v3/integration/OTTdetails");
        if(res.ok){
            const returnedJson = await res.json();
            dataOTT = returnedJson.results;
            console.log(dataOTT);
            console.log("!"+dataOTT.length + ", Registers loaded!");
                 
        } else {
            console.log("Error");
            dataOTT = [];
        }

        let dat = dataOTT.map((e) => {
			let res2 = [e["title"],e["imdbrating"]];
            return res2;
		});
        console.log(dat);



        Highcharts.chart('container', {
            lang: {
                viewFullscreen:"Ver en pantalla completa",
                exitFullscreen:"Salir de pantalla completa",
                printChart: "Imprimir gráfico",
                downloadPNG:"Descargar en formato PNG",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadSVG:"Descargar en formato SVG",
            },
    
    
    
    
    chart: {
        type: 'funnel3d',
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 30
        }
    },
    title: {
        text: ' '
    },
    
    plotOptions: {
        series: {
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                allowOverlap: true,
                y: 10
            },
            neckWidth: '25%',
            neckHeight: '25%',
            width: '80%',
            height: '80%'
        }
    },
    series: [{
        name: 'Valoración',
        data: dat
    }]
});
    

}

</script>

<main>
    <header>
        <h3>USO DE API EXTERNA 2 - OTT details:</h3>
        <h4>Valoraciones de TV Shows de España en 2020</h4>
        <h6>Datos obtenidos de la API privada <a href="https://rapidapi.com/gox-ai-gox-ai-default/api/ott-details/details">OTT details</a></h6>
            <div id= "initialbuttons">
                <Button on:click={() => push("#/integrations/ottdetails")}>Representación gráfica</Button>
                <Button on:click={() => push("#/integrations/ottdetails/tableData")}>Tabla de datos</Button>
             </div>
            
     </header>
    
     <figure class="highcharts-figure">
        <div id="container"></div>
     
     <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://www.highcharts.com/demo/scatter">Highcharts</a></h6>
    
   
</main>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/cylinder.js"></script>
    <script src="https://code.highcharts.com/modules/funnel3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"on:load="{loadGraph}"></script>    
</svelte:head>

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
    #container {
    height: 420px; 
}

.highcharts-figure {
    min-width: 360px; 
    max-width: 600px;
    margin: 1em auto;
}
        
  

</style>

