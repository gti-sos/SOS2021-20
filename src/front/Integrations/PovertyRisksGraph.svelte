<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {push} from "svelte-spa-router";

    
</script>


<svelte:head>
<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
<script src="https://unpkg.com/recharts/umd/Recharts.min.js"on:load="{loadGraph}"></script>
</svelte:head>


<main>
    <header>
        <h3>INTEGRACIÓN 1 SOS - HDI-stats GRUPO 23</h3>
        <h4>Visualización conjunta de datos</h4>
        <h6>Datos obtenidos de la API pública <a href="http://api.ctan.es/doc/">Red de Consorcios de Transporte de Andalucía </a></h6>
    
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
