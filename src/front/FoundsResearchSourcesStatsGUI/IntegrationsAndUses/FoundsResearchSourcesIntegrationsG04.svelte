<script>
    import { onMount } from "svelte";

    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    const API_PATH = "/api/v3/integrations";

    const spanish = {
        viewFullscreen: "Ver en pantalla completa",
        downloadJPEG: "Descargar en formato JPEG",
        downloadPDF: "Descargar en formato PDF",
        downloadPNG: "Descargar en formato JPEG",
        downloadSVG: "Descargar en formato JPEG",
        exitFullscreen: "Salir de pantalla completa",
        printChart: "Imprimir gráfico",
    };

    async function educationExpenditureIntegration() {
        //Integration with group 1
        const educationData = await fetch(API_PATH + "/education-expenditures");
        const foundsData = await fetch(
            "/api/v4/foundsresearchsources-stats?year=2016"
        );
        let educationStats = await educationData.json();
        let foundsStats = await foundsData.json();
        let categoriesSpa = [
            "Fianciación privada",
            "Financiación gubernamental",
            "Financiacion ONGs",
            "Gasto en educación relativo al PIB",
        ];
        let countries = [];
        let graphData = [];

        // First iterates over biggest array
        educationStats.forEach((education) => {
            // Then we do the same with the smallest one
            foundsStats.forEach((founds) => {
                // Only retrieve data for the same country on the same year,
                // we format data to lowercase to normalize it
                if (
                    education.country.toLowerCase() ===
                        founds["country"].toLowerCase() &&
                    education.year === founds.year
                ) {
                    let categoriesData = [
                        founds.percentage_of_private_financing,
                        founds.percentage_of_government_funding,
                        founds.percentage_of_non_profit_funding,
                        education.education_expenditure_gdp,
                    ];
                    // Get properties and insert on the final array
                    countries.push(founds.country);
                    let i = 0;
                    while (i < categoriesSpa.length) {
                        graphData.push([
                            i,
                            countries.indexOf(founds.country),
                            categoriesData[i],
                        ]);
                        i += 1;
                    }
                }
            });
        });

        function getPointCategoryName(point, dimension) {
            var series = point.series,
                isY = dimension === "y",
                axis = series[isY ? "yAxis" : "xAxis"];
            return axis.categories[point[isY ? "y" : "x"]];
        }

        Highcharts.chart("container", {
            chart: {
                type: "heatmap",
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1,
            },

            title: {
                text: "Gráfica de tipo Heatmap",
            },
            lang: spanish,

            xAxis: {
                categories: categoriesSpa,
            },

            yAxis: {
                categories: countries,
                title: null,
                reversed: true,
            },

            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            xName = getPointCategoryName(point, "x"),
                            yName = getPointCategoryName(point, "y"),
                            val = point.value;
                        return (
                            ix +
                            ". " +
                            xName +
                            " sales " +
                            yName +
                            ", " +
                            val +
                            "."
                        );
                    },
                },
            },

            colorAxis: {
                min: 0,
                minColor: "#FFFFFF",
                maxColor: Highcharts.getOptions().colors[0],
            },

            legend: {
                align: "right",
                layout: "vertical",
                margin: 0,
                verticalAlign: "top",
                y: 25,
                symbolHeight: 280,
            },

            tooltip: {
                formatter: function () {
                    return (
                        getPointCategoryName(this.point, "x") +
                        "<b> " +
                        this.point.value +
                        "%</b> en <br><b>" +
                        getPointCategoryName(this.point, "y") +
                        "</b>"
                    );
                },
                pointFormat:
                    '<span style="color:{point.color}">\u25A0 </span>' +
                    "{series.name}:sdfsdfsdf <b>{point.formattedValue}sdfsdfsdf</b><br/>",
            },

            series: [
                {
                    name: "Data",
                    borderWidth: 1,
                    data: graphData,
                    dataLabels: {
                        enabled: true,
                        color: "#000000",
                    },
                },
            ],

            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            yAxis: {
                                labels: {
                                    formatter: function () {
                                        return this.value.charAt(0);
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

onMount(educationExpenditureIntegration);
</script>

<main>
    <h4>INTEGRACIÓN CON GRUPO 04</h4>
    <p>
        En este widget se muestra la integración de los datos referentes al porcentaje de financiación
        de la investigación y desarrollo proviniente de diversas fuentes,<br> con los datos del grupo 04 referentes 
        al gasto en educación de distintos paises.
    </p>
    <figure class="highcharts-figure">
        <div id="container" />
        <p>
            Este widget ha sido desarrollado por <a
                href="https://github.com/JorgeMarinC">Jorge Marín Cordero</a
            >
        </p>
    </figure>
    <div class="text-center">
        <Button style="margin-bottom: 3em;" color="secondary" on:click={pop}
            >Volver</Button
        >
    </div>
</main>

<style>
    h4 {
        color: rgba(0, 0, 0, 0.7);
        margin-top: 1em;
        text-align: center;
    }
    p {
        text-align: center;
        margin-bottom: 2em;
        margin-top: 1em;
        opacity: 0.7;
        font-size: 0.8em;
    }
    #container {
        padding-left: 15em;
        padding-right: 15em;
        margin-top: 3em;
    }
</style>
