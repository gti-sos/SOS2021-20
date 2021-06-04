<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 
 
let data = [];
let idCat = [];
 


async function loadGraph(){
    
    //GET DATA
    console.log("Fetching data...");
        const res = await fetch("https://api.ctan.es/v1/Consorcios/2/lugares_interes");
        if(res.ok){
            const returnedJson = await res.json();

            data = returnedJson.lugaresInteres;
            console.log("!"+data.length + ", Registers loaded!");
            console.log(data);
        } else {
            console.log("Error");
            data = [];
        }

        //Obtención id de categoría
        data.forEach(e => {
            idCat.push(e["idCat"]);
            console.log("idcat: " + idCat); 
        });

       //Obtener cantidad de cada tipo de categoría
        var indices = new Array(10);
        indices.fill(0);
        for (var i = 0; i < indices.length; i++) {
             for (var j = 0; j < idCat.length; j++) {
                if (i == idCat[j]) {
                indices[i] = indices[i] + 1;
                }
            }
        }
        console.log("Cantidad: " + indices);
        indices.shift();
        console.log("Cantidad sin posición 0: " + indices);



    const dataGraph = {
        labels: ["Servicio Público","Cuidado de la salud","Transporte", "Cultura",
            "Educación", "Turismo", "Deporte", "Exhibiciones", "Comercio"
        ],
        datasets: [
            {
                name: "Lugares de interés", type: "pie",
                values: indices,
                
            }
            
        ]
    }
    const chart = new frappe.Chart("#chart", {  
                                               
        title: "Número de lugares de interés divididos en categorias del consorcio de Cádiz",                                        
        data: dataGraph,
        type: 'pie', 
        height: 400,
        maxSlices: 9,
       
    })

}

</script>

<main>
    <header>
            <h3>USO DE API EXTERNA 1 - CONSORCIO DE TRANSPORTES DE CÁDIZ:</h3>
            <h4><a href="http://api.ctan.es/v1/Consorcios/2/lugares_interes">LUGARES DE INTERÉS</a></h4>
            <h6>Datos obtenidos de la API pública <a href="http://api.ctan.es/doc/">Red de Consorcios de Transporte de Andalucía </a></h6>
            <div id= "initialbuttons">
                    <Button on:click={() => push("#/integrations/lugaresInteres")}>Representación gráfica</Button>
                    <Button on:click={() => push("#/integrations/lugaresInteres/tableData")}>Tabla de datos</Button>
             </div>
            
     </header>
    
     <div id="chart"></div>
     
     <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a> con la librería <a href="https://frappe.io/charts">Frappe Charts</a></h6>
    
   
</main>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js"on:load="{loadGraph}"></script>
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
    #chart{
        text-align: center;
        
    }

    #initialbuttons{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;

    }
  
  

</style>
