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
	import BikesChart from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/BikesChart.svelte";
	import PopulationChart from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/PopulationChart.svelte";	
	import BikesTable from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/BikesTable.svelte";
	import WeatherTable from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/WeatherTable.svelte";
	import WeatherChart from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/WeatherChart.svelte";
	import CovidChart from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/CovidChart.svelte";
	import CovidTable from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/CovidTable.svelte";
	import HdiTable from "./Integrations/HdiTable.svelte";
	import HdiGGEGraph from "./Integrations/HdiGGEGraph.svelte";
	import PovertyRisksTable from "./Integrations/PovertyRisksTable.svelte";
	import PovertyRisksGraph from "./Integrations/PovertyRisksGraph.svelte";
	import CadizTable from "./Integrations/CadizTable.svelte";
	import CadizGraph from "./Integrations/CadizGraph.svelte";
	import OTTTable from "./Integrations/OTTTable.svelte";
	import OTTGraph from "./Integrations/OTTGraph.svelte";
	import PeriodicTableGraph from "./Integrations/PeriodicTableGraph.svelte";
	import FoundsResearchSourcesStats from "./FoundsResearchSourcesStatsGUI/FoundsResearchSourcesStats.svelte";
	import FoundsResearchSourcesStatsDataEdit from "./FoundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataEdit.svelte"
	import FoundsResearchSourcesStatsDataMultipleEdit from "./FoundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataMultipleEdit.svelte";
	import FoundsResearchSourcesStatsChart from "./FoundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsChart.svelte";
	import FoundsResearchSourcesIntegrationsG01 from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/FoundsResearchSourcesIntegrationsG01.svelte";
	import FoundsResearchSourcesIntegrationsG04 from "./FoundsResearchSourcesStatsGUI/IntegrationsAndUses/FoundsResearchSourcesIntegrationsG04.svelte";
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
		"/analytics":UnifiedChart,
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
		"/integrations/population": PopulationChart,
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
		"/integrations/lugaresInteres": CadizGraph,
		"/integrations/ottdetails/tableData": OTTTable,
		"/integrations/ottdetails": OTTGraph,
		"/integrations/periodicTable": PeriodicTableGraph,
		"/integrations/foundsresearchsourcesG01": FoundsResearchSourcesIntegrationsG01,
		"/integrations/foundsresearchsourcesG04": FoundsResearchSourcesIntegrationsG04,
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
					<a class="dropdown-item" href="/#/analytics">Gráfico conjunto</a>
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
					  <a class="dropdown-item" href="/#/integrations/ottdetails/tableData">Uso 2 API OTT details</a>
					  <a class="dropdown-item" href="/#/integrations/periodicTable">Uso 3 API Tabla Periódica</a>
					  <div class="dropdown-divider"></div>
					  <a class="dropdown-item" href="/#/integrations/foundsresearchsourcesG01">Integracion fuentes de financiación con G01</a>
					  <a class="dropdown-item" href="/#/integrations/foundsresearchsourcesG04">Integracion fuentes de financiación con G04</a>
					  <a class="dropdown-item" href="/#/integrations/bikes">Uso de API Sevici</a>
					  <a class="dropdown-item" href="/#/integrations/weather">Uso de API AEMET</a>
					  <a class="dropdown-item" href="/#/integrations/covid">Uso de API TrackCorona</a>
					  <a class="dropdown-item" href="/#/integrations/population">Uso de RapidApi Spott Población España</a>
					   <!-- RENEWABLE -->
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="#/renewablepowercapacities-stats/Api1_import">API del GRUPO 3 - air-pollution</a>
						<a class="dropdown-item" href="#/renewablepowercapacities-stats/Api2_import">API del GRUPO 23 - unemployment</a>
						<a class="dropdown-item" href="#/renewablepowercapacities-stats/Api3_import">API el-tiempo.net - Temperatura Max</a>
						<a class="dropdown-item" href="#/renewablepowercapacities-stats/Api4_import">API RapidApi - Nº Habitantes/Paises</a>
					 <!-- FIN RENEWABLE -->
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
