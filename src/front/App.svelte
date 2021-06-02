<script>
	import { onMount } from "svelte";
	import Router from "svelte-spa-router";
	import HomePage from "./HomePage.svelte";
	import Footer from "./Footer.svelte";
	import NotFoundPage from "./NotFoundPage.svelte";
	import InfoPage from "./InfoPage.svelte";
	import AboutPage from "./AboutPage.svelte";
	import IntegrationPage from "./IntegrationPage.svelte";
	import UnifiedChart from "./Integrations/UnifiedChart.svelte";
	import BikesChart from "./Integrations/BikesChart.svelte";
	import BikesTable from "./Integrations/BikesTable.svelte";
	import WeatherTable from "./Integrations/WeatherTable.svelte";
	import WeatherChart from "./Integrations/WeatherChart.svelte";
	import CovidChart from "./Integrations/CovidChart.svelte";
	import CovidTable from "./Integrations/CovidTable.svelte";
	import HdiTable from "./Integrations/HdiTable.svelte";
	import HdiGGEGraph from "./Integrations/HdiGGEGraph.svelte";
	import PovertyRisksTable from "./Integrations/PovertyRisksTable.svelte";
	import PovertyRisksGraph from "./Integrations/PovertyRisksGraph.svelte";
	import CadizTable from "./Integrations/CadizTable.svelte";
	import CadizGraph from "./Integrations/CadizGraph.svelte";
	//import VuelosTable from "./Integrations/FlightsTable.svelte";
	import FoundsResearchSourcesStats from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStats.svelte";
	import FoundsResearchSourcesStatsDataEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataEdit.svelte"
	import FoundsResearchSourcesStatsDataMultipleEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataMultipleEdit.svelte";
	import FoundsResearchSourcesStatsChart from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsChart.svelte";
	import GreenhouseGasEmissions from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissions.svelte";
	import GreenhouseGasEmissionsEdit from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissionsEdit.svelte";
	import GreenhouseGasEmissionsGraph from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissionsGraph.svelte";
	import RenewablePowerCapacities from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacities.svelte";
	import RenewablePowerCapacitiesEdit from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacitiesDataEdit.svelte";
	import RenewablePowerCapacitiesChar from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacitiesChar.svelte";
	import Renewable_Api1Import from "./RenewablePowerCapacitiesStatsGUI/Api1Import.svelte";
	import Renewable_Api2Import from "./RenewablePowerCapacitiesStatsGUI/Api2Import.svelte";
	import Renewable_Api3Import from "./RenewablePowerCapacitiesStatsGUI/Api3Import.svelte";
	import Renewable_Api4Import from "./RenewablePowerCapacitiesStatsGUI/Api4Import.svelte";
	import Renewable_Grafica from "./RenewablePowerCapacitiesStatsGUI/Grafica.svelte";
	import Renewable_Grafica2 from "./RenewablePowerCapacitiesStatsGUI/Grafica2.svelte";

	const routes = {
		"/": HomePage,
		"/info": InfoPage,
		"/about": AboutPage,
		"/integrations": IntegrationPage,
		"/unified-chart":UnifiedChart,
		"/foundsresearchsources-stats": FoundsResearchSourcesStats,
		"/foundsresearchsources-stats/:country/:year": FoundsResearchSourcesStatsDataEdit,
		"/foundsresearchsources-stats/update-data": FoundsResearchSourcesStatsDataMultipleEdit,
		"/foundsresearchsources-stats/chart": FoundsResearchSourcesStatsChart,
		"/greenhousegasemissions-stats": GreenhouseGasEmissions,
	    "/greenhousegasemissions-stats/:country/:year": GreenhouseGasEmissionsEdit,
		"/greenhousegasemissions-stats/graph": GreenhouseGasEmissionsGraph,
		"/renewablepowercapacities-stats": RenewablePowerCapacities,
		"/renewablepowercapacities-stats/:country/:year": RenewablePowerCapacitiesEdit,
		"/renewablepowercapacities-stats/char": RenewablePowerCapacitiesChar,
		"/renewablepowercapacities-stats/Api1_import": Renewable_Api1Import,
		"/renewablepowercapacities-stats/Api2_import": Renewable_Api2Import,
		"/renewablepowercapacities-stats/Api3_import": Renewable_Api3Import,
		"/renewablepowercapacities-stats/Api4_import": Renewable_Api4Import,
		"/renewablepowercapacities-stats/grafica": Renewable_Grafica,
		"/renewablepowercapacities-stats/grafica2": Renewable_Grafica2,
		"/integrations/bikes": BikesChart,
		"/integrations/weather": WeatherChart,
		"/integrations/covid": CovidChart,
		"/integrations/bikes/rawData": BikesTable,
		"/integrations/weather/rawData": WeatherTable,
		"/integrations/covid/rawData": CovidTable,
		"/integrations/hdi/tableData": HdiTable,
		"/integrations/hdi": HdiGGEGraph,
		"/integrations/povertyRisks/tableData": PovertyRisksTable,
		"/integrations/povertyRisks": PovertyRisksGraph,
		"/integrations/lugaresInteres/tableData": CadizTable,
		"/integrations/vuelos/tableData": VuelosTable,
		//"/integrations/lugaresInteres": CadizGraph,
		"*": NotFoundPage,
	};

	// Clock
	let time = new Date();
	$: hours = (time.getHours()<10?'0':'') +time.getHours();
	$: minutes = (time.getMinutes()<10?'0':'')+ time.getMinutes();
	$: seconds = (time.getSeconds()<10?'0':'')+time.getSeconds();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

</script>
	<header>
		<nav class="navbar navbar-expand-lg">
			<a class="navbar-brand" href="/#">SOS2021-20</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon"></span>
			</button>
		  
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			  <ul class="navbar-nav mr-auto">
				<li class="nav-item dropdown">
				  <a class="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Gráficos
				  </a>
				  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="/#/unified-chart">Gráfico conjunto</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="/#/foundsresearchsources-stats/chart">Fuentes de financiación de la investigación</a>
					<a class="dropdown-item" href="/#/greenhousegasemissions-stats/graph">Emisiones de gases de efecto invernadero</a>
					<a class="dropdown-item" href="/#/renewablepowercapacities-stats/char">Capacidad de producción de energia renovable</a>
				  </div>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Integraciones
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <a class="dropdown-item" href="/#">Integración..</a>
					  <div class="dropdown-divider"></div> 
					  <a class="dropdown-item" href="/#/integrations/hdi/tableData">Integración 1 de API HDI-stats</a>
					  <a class="dropdown-item" href="/#/integrations/povertyRisks/tableData">Integración 2 de API poverty_risks-stats</a>
					  <a class="dropdown-item" href="/#/integrations/lugaresInteres/tableData">Uso 1 API Consorcio Transporte</a>
					  <div class="dropdown-divider"></div>
					  <a class="dropdown-item" href="/#/integrations/bikes">Uso de API Sevici</a>
					  <a class="dropdown-item" href="/#/integrations/weather">Uso de API AEMET</a>
					  <a class="dropdown-item" href="/#/integrations/covid">Uso de API TrackCorona</a>
					</div>
				  </li>
				<li class="nav-item">
					<a class="nav-link" href="/#/foundsresearchsources-stats">Fuentes de financiación de la investigación <span class="sr-only">(current)</span></a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/#/greenhousegasemissions-stats">Emisiones de gases de efecto invernadero</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="/#/renewablepowercapacities-stats">Capacidad de producción de energia renovable</a>
				  </li>
			  </ul>
			  <a class="navbar-brand mr-sm-2" href="/#">{hours}:{minutes}:{seconds}</a>
			</div>
		  </nav>
	</header>

	<Router {routes} />
	<Footer/>
