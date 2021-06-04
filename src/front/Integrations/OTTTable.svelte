<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 let dataOTT = [];
 

//GetData
async function getData(){
        
        console.log("Fetching data...");
        const res = await fetch("api/integration/OTTdetails");
        console.log(res);
        if(res.ok){
            const returnedJson = await res.json();
            dataOTT = [returnedJson];
            console.log("!"+dataOTT.length + ", Registers loaded!");
                 
        } else {
            console.log("Error");
            dataOTT = [];
        }
}

onMount(getData); 
</script>

<main>
    <header>
            <h3>INTEGRACIÓN 1 SOS - HDI-stats GRUPO 23</h3>
            <h4>Datos de Estadística HDI</h4>
            <h6>Datos obtenidos de la API pública <a href="http://api.ctan.es/doc/">Red de Consorcios de Transporte de Andalucía </a></h6>
            <div id= "initialbuttons">
                    <Button on:click={() => push("#/integrations/hdi")}>Representación gráfica</Button>
                    <Button on:click={() => push("#/integrations/hdi/tableData")}>Tabla de datos</Button>
             </div>
            
        
        
    </header>
    
    <Table hover bordered>
        <thead>
            <tr id= "tabletitle">
                <th>País</th>
                <th>Año</th>
                <th>Rango</th>
                <th>Valor</th>
                <th>Escolaridad</th>
            </tr>
        </thead>
        <tbody>
            
            {#each dataOTT as onedata}
            <tr>
                <td>{onedata.country}</td>
                <td>{onedata.year}</td>
                <td>{onedata.hdirank}</td>
                <td>{onedata.hdivalue}</td>
                <td>{onedata.hdischolar}</td>
            </tr>
        
           {/each}
        </tbody>
    </Table>
    <div><h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a></h6></div>
   
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
    th{
        text-align: center;
    }
    td{
        text-align: center;
    }

    thead{
        font-weight: bold;

    }

    #initialbuttons{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;

    }
    #tabletitle{
        background-color:darkgrey;
    }
  

</style>

