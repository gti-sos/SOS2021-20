<script>
import { push } from "svelte-spa-router";
import Button from "sveltestrap/src/Button.svelte";
</script>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>SOS2021-20</title>
</head>
    <div class="container">
        <div class="text-center">
        <h1>SOS 2021-20</h1>
        <p class="lead">Bienvenido a la página principal del grupo 20 de la asignatura, Sistemas Orientados a Servicios </p>

        <Button on:click={()=>push("#/info")}>Sobre nosotros</Button>
        </div>
    </div>
<style>

    .text-center {
    text-align: center;
    margin-top: 15em;
    margin-bottom: 23.1em;
}
</style>