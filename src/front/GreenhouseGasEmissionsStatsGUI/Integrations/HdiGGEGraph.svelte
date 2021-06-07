<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {push} from "svelte-spa-router";

async function loadGraph(){
    let dataGGE = [];
    let dataHDI = [];
    let xaxis = [];
    let nitrousBar = [];
    let hdischolarBar = [];
    let emptyList = [];
    
    
    //Extracción de datos greengashouseemissions-stats
    const resGGE = await fetch( "/api/v1/greenhousegasemissions-stats");
    dataGGE = await resGGE.json();
    
    //Extracción de datos HDI-stats
    const resHDI = await fetch( "/v1/integration/hdi-stats");
    dataHDI = await resHDI.json();
   
    
    dataGGE.forEach(d => {
        if(!xaxis.includes(d.country+" "+d.year)){
            xaxis.push(d.country+" "+d.year);
        }
        console.log(xaxis);
        nitrousBar.push(d["nitrous_oxide"]);
        console.log("nitrous: " + nitrousBar); 

        
    });

    dataHDI.forEach(e => {
        if(!xaxis.includes(e.country+" "+e.year)){
            xaxis.push(e.country+" "+e.year);
        }
        console.log(xaxis);
        hdischolarBar.push(e["hdischolar"]); 
        console.log("escolar: " + hdischolarBar);
        
    });
    
    //Añadir ceros al final de lista escolarización
    const a0NitrousBar = emptyList.concat(nitrousBar);
    a0NitrousBar.fill(0);
    console.log("lista nitrous a cero: " + a0NitrousBar);
    const arrayScholar = a0NitrousBar.concat(hdischolarBar);
    

    //Añadir ceros al final de lista oxido de nitrógeno
    const a0hdischolarBar = emptyList.concat(hdischolarBar);
    a0hdischolarBar.fill(0);
    console.log("lista scholar a cero: " + a0hdischolarBar);
    const arrayNitrous = nitrousBar.concat(a0hdischolarBar);

    //Entrada de datos de gráfica

        const data = {
        labels: xaxis,
        datasets: [
            {
                name: "Óxido Nitrógeno", 
                values: arrayNitrous,
                charType: "bar",
            },
            {
                name: "Escolaridad", 
                values: arrayScholar,
                charType: "bar",
            }
        ]
    }

    const chart = new frappe.Chart("#chart", {  
        
        data: data,
        type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 400,
        colors: ['#7cd6fd', '#743ee2'],
        barOptions: {
            stacked: false,
            spaceRatio: 0.3
        },
        

    })
}
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js"on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <header>
        <h3>INTEGRACIÓN 1 SOS - <a href="https://sos2021-23.herokuapp.com/api/v1/hdi-stats">HDI-stats GRUPO 23</a></h3>
        <h4>Visualización conjunta de datos</h4>
       
    
        <div id= "initialbuttons">
                <Button on:click={() => push("#/integrations/hdi")}>Representación gráfica</Button>
                <Button on:click={() => push("#/integrations/hdi/tableData")}>Tabla de datos</Button>
         </div>
        
    
    
</header>
    <div id="chart"></div>
    <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://frappe.io/charts">Frappe Charts</a></h6>
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
  

</style>

