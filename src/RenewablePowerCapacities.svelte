<script>

    import{
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import { Button, Col, Row } from 'sveltestrap';
    
    let datos = [];
    let  datos_aux = []; 

    //CARGA DATOS EN LA TABLA loadInitialData
    async function cargarDatos(){
        console.log("Buscando datos...");
        const res_iniciar = await fetch("/api/v1/renewablepowercapacities-stats/loadInitialData");
        const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        console.log(res_iniciar.status)
        if(res_iniciar.status != 200){
            console.log("Error datos ya cargados");
        }else{
            console.log("Ok cargando datos.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
            datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
            console.log(`Tenemos ${datos.length} datos.`)
          
        }

    }

    //MUESTRA LOS DATOS DE LA BD EN LA TABLA
    async function verTabla(){
        console.log("Buscando datos...");
       
        const res = await fetch("/api/v1/renewablepowercapacities-stats"); //ESPERO A QUE TERMINE LA BUSQUEDA con await

        if(res.ok){
            console.log("Ok.");
            const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS

                if(datos_aux.length != 0){
                    //SI ENTRAMOS AQUI ES QUE ANTES HEMOS FILTRADO
                    datos = datos_aux;
                }else{
                    datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
                     console.log(`Tenemos ${datos.length} datos.`)
                }
            
          
        }else{
            console.log("Error");
        }
    }

    //BORRA LOS DATOS DE LA BD 
    async function borrarDatos() {
        
        console.log("borrando datos......");

        const res = await fetch("/api/v1/renewablepowercapacities-stats", {
        method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("DATOS BORRADOS");
                datos = [];
                
            } else if (res.status = 404) {
                
                console.log("ERROR DB NO ENCONTRADA");
            } else {
                
                console.log("ERROR");
            }
        });
    }
   
    //ACTUALIZA UN REGISTRO DE LA BD
    async function actualizar() {
        
        var pais = prompt("Inserte el nombre del pais:");
        var ano = prompt("Inserte el año:");
        var solar = prompt("Producción Solar en MegaWatios:");
        var hidraulica = prompt("Producción Hidraulica en MegaWatios:");
        var eolica = prompt("Producción Eolica en MegaWatios:");
        
        var error=false;
        if(pais=="" || pais==null 
            || ano=="" || pais==null
            || solar=="" || pais==null
            || hidraulica=="" || pais==null
            || eolica=="" || pais==null
        ){
            error=true;
        }

        if(error==true){
            console.log("Error en los datos, no se ha podido actualizar.");
        }else{
            console.log("el pais es: "+pais);
            console.log("el año es: "+ano);
            console.log("solar es: "+solar);
            console.log("hidraulica es: "+hidraulica);
            console.log("eolica es: "+eolica);

            ano = parseInt(ano, 10);
            solar = parseInt(solar, 10);
            hidraulica = parseInt(hidraulica, 10);
            eolica = parseInt(eolica, 10);

            var datoActualizado=JSON.stringify( {"country":pais,"year":ano,"solar_production_in_megawatts":solar,"hydraulic_production_in_megawatts":hidraulica,"wind_power_production_in_megawatts":eolica} );
            var url = "/api/v1/renewablepowercapacities-stats/"+pais+"/"+ano;
            
           // postData(url,datoActualizado);
           fetch('/api/v1/renewablepowercapacities-stats/'+pais+'/'+ano, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"country":pais,"year":ano,"solar_production_in_megawatts":solar,"hydraulic_production_in_megawatts":hidraulica,"wind_power_production_in_megawatts":eolica})
                }).then(res => res.json())
                .then(res => console.log(res));

            }

       verTabla();
    }

    //ELIMINA UN REGISTRO DE LA BD
    async function eliminar() {
        
        var pais = prompt("Inserte el nombre del pais:");
        var ano = prompt("Inserte el año:");
        var error=false;
        
        var error=false;
        if(pais=="" || pais==null || ano=="" || pais==null){
            error=true;
        }

        if(error==true){
            console.log("Error en los datos, no se ha podido borrar.");
        }else{
            console.log("el pais es: "+pais);
            console.log("el año es: "+ano);
            
            var url = "/api/v1/renewablepowercapacities-stats/"+pais+"/"+ano;
            
            fetch(url, {
                method: 'DELETE'
            });

            verTabla();
        }
    }

    //AÑADE UN NUEVO REGISTRO A LA BD
    async function addRegistro() {
        
        var pais = prompt("Inserte el nombre del pais:");
        var ano = prompt("Inserte el año:");
        var solar = prompt("Producción Solar en MegaWatios:");
        var hidraulica = prompt("Producción Hidraulica en MegaWatios:");
        var eolica = prompt("Producción Eolica en MegaWatios:");
        
        var error=false;
        if(pais=="" || pais==null 
            || ano=="" || pais==null
            || solar=="" || pais==null
            || hidraulica=="" || pais==null
            || eolica=="" || pais==null
        ){
            error=true;
        }

        if(error==true){
            console.log("Error en los datos, no se ha podido actualizar.");
        }else{
            console.log("el pais es: "+pais);
            console.log("el año es: "+ano);
            console.log("solar es: "+solar);
            console.log("hidraulica es: "+hidraulica);
            console.log("eolica es: "+eolica);

           ano = parseInt(ano, 10);
           solar = parseInt(solar, 10);
           hidraulica = parseInt(hidraulica, 10);
           eolica = parseInt(eolica, 10);

            var datoActualizado=JSON.stringify( {"country":pais,"year":ano,"solar_production_in_megawatts":solar,"hydraulic_production_in_megawatts":hidraulica,"wind_power_production_in_megawatts":eolica} );
            var url = "/api/v1/renewablepowercapacities-stats/"+pais+"/"+ano;
            
           
           fetch('/api/v1/renewablepowercapacities-stats/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"country":pais,"year":ano,"solar_production_in_megawatts":solar,"hydraulic_production_in_megawatts":hidraulica,"wind_power_production_in_megawatts":eolica})
                }).then(res => res.json())
                .then(res => console.log(res));

            }

       verTabla();
    }

    //VISUALIZA UN DATO DE LA BD
    async function verRegistro() {
        
        var pais = prompt("Inserte el nombre del pais:");
        var ano = prompt("Inserte el año:");
        var error=false;
        
        if(pais=="" || pais==null || ano=="" || pais==null){
            error=true;
        }

        if(error==true){
            console.log("Error en los datos, no se ha podido actualizar.");
        }else{
            
            console.log("VIENDO UN REGISTRO...");
            var ruta="/api/v1/renewablepowercapacities-stats?country="+pais+"&year="+ano;
            console.log(ruta);
            const res = await fetch(ruta); //ESPERO A QUE TERMINE LA BUSQUEDA con await

            if(res.ok){
                console.log("Ok verRegistro.");
                const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
                 datos_aux = datos;
                datos = [] //BORRO LA TABLA
                datos = json; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
                console.log(`Tenemos ${datos.length} REGISTROS.`)
                
            }else{
                console.log("Error");
            }
        }
        
    }

   

   onMount(verTabla); //METODO QUE ACTUALIZA EL ESTADO DE LA TABLA

  
</script>

<main>
    <Table bordered>
        <thead>
            <tr>
                <td><b>Pais</b></td>
                <td><b>Año</b></td>
                <td><b>Producción Solar en MegaWatios</b></td>
                <td><b>Producción Hidraulica en MegaWatios</b></td>
                <td><b>Producción Eolica en MegaWatios</b></td>
            </tr>
      </thead>
      <tbody>
        {#each datos as dato}
            <tr>
                <td>{dato.country}</td>
                <td>{dato.year}</td>
                <td>{dato.solar_production_in_megawatts}</td>
                <td>{dato.hydraulic_production_in_megawatts}</td>
                <td>{dato.wind_power_production_in_megawatts}</td>
            </tr>
        {/each}
      </tbody>
    </Table>
    <Button color="success"  on:click={verTabla}>Ver Registros Actuales</Button>
    <br><br>
    <Button  on:click={cargarDatos}>Cargar Datos</Button>
    <Button  color="primary" on:click={actualizar}>Actualizar Dato</Button>
    <Button  color="primary" on:click={addRegistro}>Añadir un registro</Button>
    <Button color="primary" on:click={verRegistro}>Ver un registro</Button>
    <Button  color="danger" on:click={eliminar}>Eliminar un registro</Button>
    <Button  color="danger" on:click={borrarDatos}>Eliminar Datos</Button>
    <br/><br/>
   
</main>

<style>


</style>