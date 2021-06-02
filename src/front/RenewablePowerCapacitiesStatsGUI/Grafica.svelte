


<script>
    import { Button } from "sveltestrap";
    import {pop} from "svelte-spa-router"
    import Chartkick from "chartkick"
    import "chartkick/chart.js"

    


        let dato = [];
        let axisX = [];
        let solar_production_in_megawatts= [];
        let hydraulic_production_in_megawatts = [];
        let wind_power_production_in_megawatts = [];    
        let capacidadTotal=[];

    async function cargarDatos() {
        
        const res = await fetch( "/api/v1/renewablepowercapacities-stats");
        dato = await res.json();
        

        dato.forEach(d => {
            axisX.push(d.country+" "+d.year);
            console.log(axisX);
            solar_production_in_megawatts.push(d["solar_production_in_megawatts"]);
            hydraulic_production_in_megawatts.push(d["hydraulic_production_in_megawatts"]);
            wind_power_production_in_megawatts.push(d["wind_power_production_in_megawatts"]);  
            capacidadTotal.push( d["solar_production_in_megawatts"] + d["hydraulic_production_in_megawatts"] + d["wind_power_production_in_megawatts"]); 
        });
                
        console.log(dato);    
        ver();
            
    } 

    

    async function ver(){
        console.log(axisX.length)
        console.log(capacidadTotal.length)
      
        new Chartkick.PieChart("chart-1", [[[axisX[0]], capacidadTotal[0]],
        [[axisX[1]], capacidadTotal[1]],
        [[axisX[2]], capacidadTotal[2]],
        [[axisX[3]], capacidadTotal[3]],
        [[axisX[4]], capacidadTotal[4]],
        [[axisX[5]], capacidadTotal[5]],
        [[axisX[6]], capacidadTotal[6]],
        [[axisX[7]], capacidadTotal[7]],
        [[axisX[8]], capacidadTotal[8]],
        [[axisX[9]], capacidadTotal[9]],
        [[axisX[10]], capacidadTotal[10]],
        [[axisX[11]], capacidadTotal[11]]])
        
    }

</script>

<svelte:head>
    <script src="https://www.gstatic.com/charts/loader.js" on:load="{cargarDatos}"></script>
</svelte:head>


<main>
    <br/>
    <center><p>En esta gráfica recogemos todo los datos proporcionados por diferentes paises y realizamos la suma total de energia renovable producida, mostrando así el total de energia producida por diferentes paises.</p>
            <p>Tambien podemos hacer comparaciones entre diferentes paises para ver así quien es el que mas genera energia renovable y quien menos.</p>
    </center>
    <hr/>
    <div id="chart-1" style="height: 300px;"></div>
    <br/>
    <p class="backbutton">
        <center> <Button color="secondary" on:click={pop}>Volver</Button> </center>
     </p> 
    <br/>
</main>
    
<style>

  
</style>