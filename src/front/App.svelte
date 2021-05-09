<script>
	import { onMount } from "svelte";
	import Router from "svelte-spa-router";
	import HomePage from "./HomePage.svelte";
	import Footer from "./Footer.svelte";
	import NotFoundPage from "./NotFoundPage.svelte";
	import AboutPage from "./AboutPage.svelte";
	import FoundsResearchSourcesStats from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStats.svelte";
	import FoundsResearchSourcesStatsDataEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataEdit.svelte"
	import FoundsResearchSourcesStatsDataMultipleEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataMultipleEdit.svelte"
	import GreenhouseGasEmissions from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissions.svelte";
	import GreenhouseGasEmissionsEdit from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissionsEdit.svelte";
	import RenewablePowerCapacities from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacities.svelte";
	import RenewablePowerCapacitiesEdit from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacitiesDataEdit.svelte";
	

	import { 
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from "sveltestrap";

	const routes = {
		"/": HomePage,
		"/info": AboutPage,
		"/foundsresearchsources-stats": FoundsResearchSourcesStats,
		"/foundsresearchsources-stats/:country/:year": FoundsResearchSourcesStatsDataEdit,
		"/foundsresearchsources-stats/update-data": FoundsResearchSourcesStatsDataMultipleEdit,
		"/greenhousegasemissions-stats": GreenhouseGasEmissions,
	    "/greenhousegasemissions-stats/:country/:year": GreenhouseGasEmissionsEdit,
		"/renewablepowercapacities-stats": RenewablePowerCapacities,
		"/renewablepowercapacities-stats/:country/:year": RenewablePowerCapacitiesEdit,
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
		<Navbar style="background-color: rgba(0, 0, 0, 0.2);" light expand="xl">
			<NavbarBrand href="/">SOS2021-20</NavbarBrand>
			<Nav class="mr-auto" navbar>
				<NavItem>
					<NavLink href="/">
						Página de inicio
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/#/foundsresearchsources-stats">
						Fuentes de financiación de la investigación
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/#/greenhousegasemissions-stats">
						Emisiones de gases de efecto invernadero
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/#/renewablepowercapacities-stats">
						Capacidad de producción de energia renovable
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/#/info">
						Sobre nosotros
					</NavLink>
				</NavItem>
			</Nav>
			<NavbarBrand class="ml-auto" href="/">{hours}:{minutes}:{seconds}</NavbarBrand>
		</Navbar>
	</header>
	
		<Router {routes} />
		
		
	<Footer/>
