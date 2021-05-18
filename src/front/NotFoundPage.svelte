<script>
	import Button from "sveltestrap/src/Button.svelte";
	import { push } from "svelte-spa-router";

</script>
 <main>
	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>¡Error 404!</h1>
			</div>
			<h2>¡Oops! La vista que buscas no existe</h2>
			<p>La vista la la que intentas acceder no existe, se ha eliminado, su nombre ha cambiado o está temporalmente fuera de servicio.</p>
			<Button on:click={()=>push("#/")}>Volver a la página principal</Button>
		</div>
	</div>


</main>
<style>

    .notfound {
    text-align: center;
    margin-top: 15em;
	margin-bottom: 20em;
}
</style>