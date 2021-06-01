

<script>
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router"
    import Button from "sveltestrap/src/Button.svelte";
async function loadGraph(){
    let dataGGE = [];
    let dataHDI = [];
    let xaxis = [];
    let nitrousBar = [];
    let hdischolarBar = [];
    
    //Extracción de datos greengashouseemissions-stats
    const resGGE = await fetch( "/api/v1/greenhousegasemissions-stats");
    dataGGE = await resGGE.json();
    
    //Extracción de datos HDI-stats
    const resHDI = await fetch( "/v1/integration/hdi-stats");
    dataHDI = await resHDI.json();
   
    
    dataGGE.forEach(d => {
        xaxis.push(d.country+" "+d.year);
        console.log(xaxis);
        nitrousBar.push(d["nitrous_oxide"]);
        console.log("nitrous: " + nitrousBar); 

        
    });

    dataHDI.forEach(e => {
        xaxis.push(e.country+" "+e.year);
        console.log(xaxis);
        hdischolarBar.push(e["hdischolar"]); 
        console.log("escolar: " + hdischolarBar);
        
    });

    var csvString = nitrousBar;
    var csvString1 = hdischolarBar;

    // create an area chart      
    var chart = anychart.area();
    var chart1 = anychart.area();
    // create the area series based on CSV data
    chart.area(csvString);
    chart.area(csvString1);
    // display a chart
    chart.container('container').draw();

   
}
</script>

<svelte:head>
<script src="https://cdn.anychart.com/releases/8.10.0/js/anychart-core.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.10.0/js/anychart-bundle.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.10.0/js/anychart-base.min.js"on:load="{loadGraph}"></script>

</svelte:head>


<main>
    <div id="container"></div>
</main>
