<script>
    import { onMount } from "svelte";
    export let foundsResearchsourcesNumReg = null;
    let greenhouseGasEmissionsNumReg = null;
    let renewablePowerCapacitiesNumReg = null;
    const API_1_PATH = "/api/v1/foundsresearchsources-stats";
    const API_2_PATH = "/api/v1/renewablepowercapacities-stats";
    const API_3_PATH = "/api/v1/greenhousegasemissions-stats";
    // Retrieves all data from DB
    async function getRegistersNumFoundsResearchSources() {
        const res = await fetch(API_1_PATH);
        if (res.ok) {
            const returnedJson = await res.json();
            
            foundsResearchsourcesNumReg = returnedJson.length;
        } else {
            console.log("Error");
        }
    }
    async function getRegistersNumRenewablePowerCapacities() {
        const res = await fetch(API_2_PATH);
        if (res.ok) {
            const returnedJson = await res.json();
            
            renewablePowerCapacitiesNumReg = returnedJson.length;
        } else {
            console.log("Error");
        }
    }
    async function getRegistersNumGreenhouseGasEmissions() {
        const res = await fetch(API_3_PATH);
        if (res.ok) {
            const returnedJson = await res.json();
            
            greenhouseGasEmissionsNumReg = returnedJson.length;
        } else {
            console.log("Error");
        }
    }
    
    onMount(getRegistersNumFoundsResearchSources);
    onMount(getRegistersNumGreenhouseGasEmissions);
    onMount(getRegistersNumRenewablePowerCapacities);
</script>


<!-- Footer -->
<footer class="bg-light text-center text-lg-start bottom">
    <!-- Grid container -->
    <div class="container p-4">
      <!--Grid row-->
      <div class="row">
        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Fuentes de financiación de la investigación</h5>
  
          <ul class="list-unstyled mb-0">
            <li>
              Registros en base de datos: <strong>{foundsResearchsourcesNumReg}</strong>
            </li>
            
          </ul>
        </div>
        <!--Grid column-->
         <!--Grid column-->
         <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Emisiones de gases de efecto invernadero</h5>
    
            <ul class="list-unstyled mb-0">
              <li>
                Registros en base de datos: <strong>{greenhouseGasEmissionsNumReg}</strong>
              </li>
              
            </ul>
          </div>
          <!--Grid column-->
           <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Capacidad de producción de energia renovable</h5>
    
            <ul class="list-unstyled mb-0">
              <li>
                Registros en base de datos: <strong>{renewablePowerCapacitiesNumReg}</strong>
              </li>
              
            </ul>
          </div>
          <!--Grid column-->
      </div>
      <!--Grid row-->
    </div>
    <!-- Grid container -->
  
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2021 Copyright:
      <a class="text-dark" href="https://sos2021-20.herokuapp.com/">sos2021-20.herokuapp.com</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
