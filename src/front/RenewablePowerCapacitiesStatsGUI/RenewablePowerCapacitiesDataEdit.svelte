<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
    export let params = {};

    let solar_production_in_megawatts = null;
    let hydraulic_production_in_megawatts = null;
    let wind_power_production_in_megawatts = null;

    const RUTA_API = "/api/v1/renewablepowercapacities-stats";

    //Ver dato de la BD SEGUN PAIS ANO
    async function verTabla() {
        console.log("Buscando los datos para mostrar en la tabla...");
        var ruta= RUTA_API + "/" + params.country + "/" + params.year;
        const res = await fetch(ruta);

        if (res.ok) {
            const json = await res.json();
            solar_production_in_megawatts = json.solar_production_in_megawatts;
            hydraulic_production_in_megawatts = json.hydraulic_production_in_megawatts;
            wind_power_production_in_megawatts = json.wind_power_production_in_megawatts;
            console.log("Datos recibidos y mostrados.");
        } else {
            console.log("Error al cargar la tabla");
        }
    }
    
    // Actualiza un dato por pais y ano
    async function actualizarDato() {
        console.log("Actualizando dato...");
        var ruta= RUTA_API + "/" + params.country + "/" + params.year;
        const res = await fetch(ruta,{
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    solar_production_in_megawatts: parseFloat(solar_production_in_megawatts),
                    hydraulic_production_in_megawatts: parseFloat(hydraulic_production_in_megawatts ),
                    wind_power_production_in_megawatts: parseFloat(wind_power_production_in_megawatts),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => {
            if (res.ok) {
                alert("Dato actualizado.");
                verTabla();
            }
            if (res.status == 400) {
                alert(
                    "Los datos proporcionados son erroneos."
                );
            }
            if (res.status == 409) {
                alert("Los datos introducidos ya existen.");
            }
        });
    }

    onMount(verTabla);

</script>

<main>
    <br /><br /><hr/>
    <Table bordered responsive>
        <thead>
            <tr>
                <th>País</th>
                <th>Año</th>
                <th>Producción Solar en MegaWatios</th>
                <th>Producción Hidraulica en MegaWatios</th>
                <th>Producción Eolica en MegaWatios</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{params.country}</td>
                <td>{params.year}</td>
                <td><input bind:value={solar_production_in_megawatts} /></td>
                <td><input bind:value={hydraulic_production_in_megawatts} /></td>
                <td><input bind:value={wind_power_production_in_megawatts}/></td>
                <td><Button color="warning" on:click={actualizarDato(params)}>Actualizar</Button>
                </td>
            </tr>
        </tbody>
    </Table>

    <div class="container">
        <div class="text-center">
            <Button color="secondary" on:click={pop}>Volver</Button>
        </div>
        <br />
    </div>
</main>

<style>
   
</style>
