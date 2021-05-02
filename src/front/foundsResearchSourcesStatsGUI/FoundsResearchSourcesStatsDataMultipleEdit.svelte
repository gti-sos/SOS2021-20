<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import {onMount} from "svelte";
    import {pop} from "svelte-spa-router";
    
    let foundsResearchSourcesData = [];
    let updatedData = {
        country: "",
        year: "",
        percentage_of_government_funding: "",
        percentage_of_private_financing: "",
        percentage_of_non_profit_funding: "",
    };
     // Retrieves all data from DB
     async function getData() {
        console.log("fetchong data");
        const res = await fetch("/api/v1/foundsresearchsources-stats");
        if (res.ok) {
            console.log("Ok");
            const returnedJson = await res.json();
            foundsResearchSourcesData = returnedJson;
            console.log(
                "We have " + foundsResearchSourcesData.length + " registers."
            );
        } else {
            console.log("Error");
        }
    }

    // Update data on database
    async function updateData(row) {
        console.log("Updating data...");
        if(confirm("¿Está seguro de querer actualizar este registro?\nRecuerde que esta acción es irreversible")){
            const res = await fetch("/api/v1/foundsresearchsources-stats/"+row.country+"/"+row.year, {
                method: "PUT",
                body: JSON.stringify({
                    country: row.country,
                    year: parseInt(row.year),
                    percentage_of_government_funding: parseFloat(
                        row.percentage_of_government_funding
                    ),
                    percentage_of_private_financing: parseFloat(
                        row.percentage_of_private_financing
                    ),
                    percentage_of_non_profit_funding: parseFloat(
                        row.percentage_of_non_profit_funding
                    ),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) =>{
                            if(res.ok){
                                alert("El registro ha sido insertado correctamente.");
                                getData();
                            }
                            if(res.status == 400){
                                alert("La entrada de datos no es correcta:\nTodos los campos menos el país deben ser númericos.");
                            }
                            if(res.status == 409) {
                                alert("Los datos que intenta introducir ya se encuentran en la base de datos.");
                                }

                    
                            });
        }
        
    }

    onMount(getData);
</script>

<main>
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Porcentaje financiación estatal</th>
                    <th>Porcentaje financiación privado</th>
                    <th>Porcentaje financiación ongs</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#each foundsResearchSourcesData as row}
                    <tr>
                        <td>{row.country}</td>
                        <td>{row.year}</td>
                        <td><input bind:value={row.percentage_of_government_funding}></td>
                        <td><input bind:value={row.percentage_of_private_financing}></td>
                        <td><input bind:value={row.percentage_of_non_profit_funding}></td>
                        <td><Button color="warning" on:click={updateData(row)}>Actualizar</Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        <div class="container" >
            <div class="text-center">
            <Button color="secondary" on:click="{pop}">Volver</Button>
        </div>
    </div>
</main>

<style>
    th,
    td {
        text-align: center;
    }
    thead {
        font-weight: bold;
    }
    .text-center {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>