<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 let data = [];
 

//GetData
async function getData(){
        
        console.log("Fetching data...");
        const res = await fetch("http://api.ctan.es/v1/Consorcios/2/lugares_interes");
        if(res.ok){
            const returnedJson = await res.json();

            data = returnedJson.lugaresInteres;
            console.log("!"+data.length + ", Registers loaded!");
            console.log(data);
        } else {
            console.log("Error");
            data = [];
        }
}

onMount(getData); 
</script>

<main>
    <header>
            <h3>USO DE API 1 EXTERNA - LUGARES DE INTERÉS</h3>
            <h4>CONSORCIO DE TRANSPORTES DE CÁDIZ </h4>
        
            <div id= "initialbuttons">
                    <Button on:click={() => push("#/integrations/hdi")}>Representación gráfica</Button>
                    <Button on:click={() => push("#/integrations/hdi/tableData")}>Tabla de datos</Button>
             </div>
            
        
        
    </header>
    
    <Table hover bordered>
        <thead>
            <tr id= "tabletitle">
                <th>Id Municipio</th>
                <th>Municipio</th>
                <th>Tipo</th>
                <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            
            {#each data as onedata}
            <tr>
                <td>{onedata.idMunicipio}</td>
                <td>{onedata.municipio}</td>
                <td>{onedata.tipo}</td>
                <td>{onedata.nombre}</td>
            </tr>
        
           {/each}
        </tbody>
    </Table>
   
</main>

<style>
    h3{
        text-align: center;
        margin-top: 50px;
        
    }
    h4{
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
