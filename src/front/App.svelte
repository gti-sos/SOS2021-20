<script>
	import { onMount } from "svelte";
	import Router from "svelte-spa-router";
	import HomePage from "./HomePage.svelte";
	import Footer from "./Footer.svelte";
	import NotFoundPage from "./NotFoundPage.svelte";
	import AboutPage from "./AboutPage.svelte";
	import UnifiedChart from "./UnifiedChart.svelte";
	import FoundsResearchSourcesStats from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStats.svelte";
	import FoundsResearchSourcesStatsDataEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataEdit.svelte"
	import FoundsResearchSourcesStatsDataMultipleEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataMultipleEdit.svelte"
	import FoundsResearchSourcesStatsChart from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsChart.svelte";
	import GreenhouseGasEmissions from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissions.svelte";
	import GreenhouseGasEmissionsEdit from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissionsEdit.svelte";
	import GreenhouseGasEmissionsGraph from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissionsGraph.svelte";
	import RenewablePowerCapacities from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacities.svelte";
	import RenewablePowerCapacitiesEdit from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacitiesDataEdit.svelte";
	import RenewablePowerCapacitiesChar from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacitiesChar.svelte";
	import GrupalGraph from "./GrupalGraph.svelte";

	const routes = {
		"/": HomePage,
		"/info": AboutPage,
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
		"/grupal-graph":GrupalGraph,
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
					<a class="dropdown-item" href="/#/grupal-graph">Gráfico conjunto 2</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="/#/foundsresearchsources-stats/chart">Fuentes de financiación de la investigación</a>
					<a class="dropdown-item" href="/#/greenhousegasemissions-stats/graph">Emisiones de gases de efecto invernadero</a>
					<a class="dropdown-item" href="/#">Capacidad de producción de energia renovable</a>
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
