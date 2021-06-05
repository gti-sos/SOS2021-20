<script>

    import{onMount}from "svelte";
    import {push} from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
 let data = []






onMount(getData); 
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
    <h6>Desarrollado por <a href="https://github.com/jesgueada">Jesús Guerra Adame</a></h6>
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
