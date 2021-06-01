<script>

import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import { Button, Col, Row } from "sveltestrap";
    import { Input, Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
    import {pop} from "svelte-spa-router"
    import * as c3 from 'c3';
    
    let datos = [];
    let axisX = [];
    let solar_production_in_megawatts= [];
    let hydraulic_production_in_megawatts = [];
    let wind_power_production_in_megawatts = [];
     //RUTA DE LA API
     const RUTA_API = "/api/v1/renewablepowercapacities-stats";

    onMount(cargarDatos);

async function cargarDatos() {
        
        console.log("Buscando datos...");
        

        
        const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        console.log(res.status);
        if (res.status != 200) {
            console.log("Error");
            alert("Error");
        } else {
            console.log("Ok cargando datos.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
            datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
            console.log(`Tenemos ${datos.length} datos.`);
            
        }

      verGrafica();
}


async function verGrafica(){


    
    datos.forEach(d => {
        axisX.push(d.country+" "+d.year);
        console.log(axisX);
        solar_production_in_megawatts.push(d["solar_production_in_megawatts"]);
        hydraulic_production_in_megawatts.push(d["hydraulic_production_in_megawatts"]);
        wind_power_production_in_megawatts.push(d["wind_power_production_in_megawatts"]);  
    });

   
    
   
    var columna_solar=["SOLAR"];
    var columna_hidraulica=["HIDRAULICA"];
    var columna_eolica=["EOLICA"];

    solar_production_in_megawatts.forEach(d => {
        
        columna_solar.push(d);
    });
    hydraulic_production_in_megawatts.forEach(d => {
        
        columna_hidraulica.push(d);
    });
    wind_power_production_in_megawatts.forEach(d => {
        
        columna_eolica.push(d);
    });



    console.log(columna_solar)
    

    var chart = c3.generate({
    data: {
        columns: [
            columna_solar,
            columna_hidraulica,
            columna_eolica,
            
        ],
        type: 'bar',
		colors: {
            Active: '#6BC95A',
            Idle: '#F73B38',
        },
    },
	axis: {
		x : {
			type: 'category',
        categories:  axisX
    },
				tick: {
          x:{
					// values: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
					multiline:false,
					culling: {
						max: 1
					},
			},
			label : {
				text: 'Pais/Año',
				position: 'center-bottom',
				
			},
		},
		y: {
			label : {
                text: 'MW generados',
                position: 'outer-middle',
			},
            max: 10000000,
            min: 0,
            padding: {top:0, bottom:0}
        }
	}
});



    

}


</script>

<svelte:head>
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.css" integrity="sha512-GQSxWe9Cj4o4EduO7zO9HjULmD4olIjiQqZ7VJuwBxZlkWaUFGCxRkn39jYnD2xZBtEilm0m4WBG7YEmQuMs5Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.js" integrity="sha512-11Z4MD9csmC3vH8Vd0eIPJBQu3uEHEqeznWEt3sLBCdQx3zm9mJbBcJH8WTcyGY9EXDE81BNpjE2vLosPK8cFQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css" integrity="sha512-cznfNokevSG7QPA5dZepud8taylLdvgr0lDqw/FEZIhluFsSwyvS81CMnRdrNSKwbsmc43LtRd2/WMQV+Z85AQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.js" integrity="sha512-+IpCthlNahOuERYUSnKFjzjdKXIbJ/7Dd6xvUp+7bEw0Jp2dg6tluyxLs+zq9BMzZgrLv8886T4cBSqnKiVgUw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<main>
    <br/>
    <center><h3 style="color: cadetblue;"> ENERGIA RENOVABLE PRODUCIDA - AÑO 2018 </h3></center>
    <br/>
    <hr/>
    <div id="chart">
        
    </div>

    <p class="backbutton">
        <Button color="secondary" on:click={pop}>Volver</Button>
    </p>

</main>
<style>

</style>