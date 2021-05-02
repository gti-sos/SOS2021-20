<script>
	import Router from "svelte-spa-router";
	import HomePage from "./HomePage.svelte";
	import Footer from "./Footer.svelte";
	import NotFoundPage from "./NotFoundPage.svelte";
	import AboutPage from "./AboutPage.svelte";
	import FoundsResearchSourcesStats from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStats.svelte";
	import FoundsResearchSourcesStatsDataEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataEdit.svelte"
	import FoundsResearchSourcesStatsDataMultipleEdit from "./foundsResearchSourcesStatsGUI/FoundsResearchSourcesStatsDataMultipleEdit.svelte"
	import GreenhouseGasEmissions from "./GreenhouseGasEmissionsStatsGUI/GreenhouseGasEmissions.svelte";
	import RenewablePowerCapacities from "./RenewablePowerCapacitiesStatsGUI/RenewablePowerCapacities.svelte";

	import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "sveltestrap";

	const routes = {
		"/": HomePage,
		"/info": AboutPage,
		"/foundsresearchsources-stats": FoundsResearchSourcesStats,
		"/foundsresearchsources-stats/:country/:year": FoundsResearchSourcesStatsDataEdit,
		"/foundsresearchsources-stats/update-data": FoundsResearchSourcesStatsDataMultipleEdit,
		"/greenhousegasemissions-stats": GreenhouseGasEmissions,
		"/renewablepowercapacities-stats": RenewablePowerCapacities,
		"*": NotFoundPage,
	};
</script>
	<header>
		<Navbar color="bg-ligth" light expand="xl">
			<NavbarBrand href="/">SOS2021-20</NavbarBrand>
			<Nav navbar>
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
		</Navbar>
	</header>
	
		<Router {routes} />
		
	<Footer/>
	


