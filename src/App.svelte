<script>

	import Router from "svelte-spa-router";
	import HomePage from "./HomePage.svelte";
	import NotFoundPage from "./NotFoundPage.svelte";
	import FoundsResearchSourcesStats from "./FoundsResearchSourcesStats.svelte";
	
	import {Navbar,NavbarBrand,Nav,NavItem,NavLink} from 'sveltestrap';
	
	const routes = {
		"/": HomePage,
		"/foundsresearchsources-stats": FoundsResearchSourcesStats,
		"*": NotFoundPage,
		
	};

</script>

<main>
	<body>
		<Navbar color="ligth" light expand>
            <NavbarBrand href="/">SOS2021-20</NavbarBrand>
            <Nav navbar >
              <NavItem  >
                <NavLink href="/">Página de inicio</NavLink>
              </NavItem>
			  <NavItem  >
                <NavLink href="/#/foundsresearchsources-stats">Fuentes de financiación de la investigación</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
	</body>
	<Router {routes}/>


</main>
