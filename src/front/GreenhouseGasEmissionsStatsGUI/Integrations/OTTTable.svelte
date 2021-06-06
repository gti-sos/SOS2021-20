<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 let dataOTT = [];
 

//GetData
async function getData(){
        
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
}

onMount(getData); 
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
    
    <Table hover bordered>
        <thead>
            <tr id= "tabletitle">
                <th>Título</th>
                <th>Año</th>
                <th>Género</th>
                <th>Valoración</th>
                <th>Tipo</th>
            </tr>
        </thead>
        <tbody>
            
            {#each dataOTT as onedata}
            <tr>
                <td>{onedata.title}</td>
                <td>{onedata.released}</td>
                <td>{onedata.genre}</td>
                <td>{onedata.imdbrating}</td>
                <td>{onedata.type}</td>
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

