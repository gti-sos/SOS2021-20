
<script>
	import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    const API_PATH_1 = "/api/v1/foundsresearchsources-stats";
	const API_PATH_2 = "/api/v1/greenhousegasemissions-stats";
	const API_PATH_3 = "/api/v1/renewablepowercapacities-stats";

	async function loadGraph() {

		const foundsSourcesApiResponse = await fetch(API_PATH_1);
		const greenHouseGasApiResponse = await fetch(API_PATH_2);
		const renewablesApiResponse = await fetch(API_PATH_3);
		
		let foundsResearchSourcesData = await foundsSourcesApiResponse.json();
		let greenhouseGasEmissionsData = await greenHouseGasApiResponse.json();
		let renewablePowerCapacitiesData = await renewablesApiResponse.json();

		
		let foundsSourcesData = foundsResearchSourcesData.map((d) => {
			let res1 = {
				name: d.country + "/" + d.year,
				value: d["percentage_of_government_funding"]
			};
			let res2 = {
				name: d.country + "/" + d.year,
				value: d["percentage_of_private_financing"]
			};
			let res3 = {
				name: d.country + "/" + d.year,
				value: d["percentage_of_non_profit_funding"]
			};
			return [res1,res2,res3];		
		});

        let gasEmissionsData = greenhouseGasEmissionsData.map((d) => {
			let res1 = {
				name: d.country + "/" + d.year,
				value: d["carbon_dioxide"]
			};
			let res2 = {
				name: d.country + "/" + d.year,
				value: d["methane"]
			};
			let res3 = {
				name: d.country + "/" + d.year,
				value: d["nitrous_oxide"]
			};
			return [res1,res2,res3];
		});

        let renewablePowerData = renewablePowerCapacitiesData.map((d) => {
			let res1 = {
				name: d.country + "/" + d.year,
				value: d["solar_production_in_megawatts"]
			};
			let res2 = {
				name: d.country + "/" + d.year,
				value: d["hydraulic_production_in_megawatts"]
			};
			let res3 = {
				name: d.country + "/" + d.year,
				value: d["wind_power_production_in_megawatts"]
			};
			return [res1,res2,res3];
		});

		let chartData = [
            {
				name: "Porcentaje de financiación de la investigación por parte del gobierno",
				data: foundsSourcesData[0]
			},
			{
				name: "Porcentaje de financiación de la investigación porfuentes privadas",
				data: foundsSourcesData[1]
			},
			{
				name: "Porcentaje de financiación de la investigación por parte de ONGs",
				data: foundsSourcesData[2]
			},
			{
				name: "Emisiones de dióxido de carbono en miles de toneladas",
				data: gasEmissionsData[0]
			},
			{
				name: "Emisiones de metano en miles de toneladas",
				data: gasEmissionsData[1]
			},
			{
				name: "Emisiones de óxido nitroso en miles de toneladas",
				data: gasEmissionsData[2]
			},
			{
				name: "Capacidad de producción de energia solar en Megawatios",
				data: renewablePowerData[0]
			},
			{
				name: "Capacidad de producción de energia hidráulica en Megawatios",
				data: renewablePowerData[1]
			},
			{
				name: "Capacidad de producción de energia eólica en Megawatios",
				data: renewablePowerData[2]
			}
			
		];
		
		Highcharts.chart('container', {
			chart: {
				type: 'packedbubble',
				height: '40%'
			},
			lang: {
                viewFullscreen:"Ver en pantalla completa",
                downloadJPEG: "Descargar en formato JPEG",
                downloadPDF: "Descargar en formato PDF",
                downloadPNG:"Descargar en formato JPEG",
                downloadSVG:"Descargar en formato JPEG",
                exitFullscreen:"Salir de pantalla completa",
  	            printChart: 'Imprimir gráfico',
            },
			title: {
				text: ''
			},
			tooltip: {
				useHTML: true,
				pointFormat: '<b>{point.name}:</b> {point.value}'
			},
			plotOptions: {
				packedbubble: {
					minSize: '60%',
					maxSize: '120%',
					zMin: 0,
					zMax: 1000,
					layoutAlgorithm: {
						splitSeries: false,
						gravitationalConstant: 0.1
					},
					dataLabels: {
						enabled: true,
						format: '{point.name}',
						style: {
							color: 'black',
							textOutline: 'none',
							fontWeight: 'normal'
						}
					}
				}
			},
			series: chartData
		});
	}
	loadGraph();
</script>

<main>
	<h4>REPRESENTACION VISUAL SOBRE LOS DATOS DE LAS 3 APIs DESARROLLADAS POR EL GRUPO</h4>
	<figure class="highcharts-figure mr-sm-2">
		<div id="container"></div>
        <p>El gráfico muestra los datos para el conjunto de los países de la Unión Europea entre los años 2014 y 2018</p>
	</figure>
	<div class="text-center">
        <Button style="margin-bottom: 4em;" color="secondary" on:click="{pop}">Volver</Button>
    </div>

</main>
<style>
    h4{
        color: rgba(0, 0, 0, 0.7);
        margin-top: 2em;
        text-align: center;
    }
    p{
        text-align: center;
        margin-bottom: 2em;
        margin-top: 1em;
        opacity: 0.7;
        font-size: 0.8em;
    }
    #container{
        padding-left: 15em;
        padding-right: 15em;
        margin-top: 7em;
        
    }
</style>