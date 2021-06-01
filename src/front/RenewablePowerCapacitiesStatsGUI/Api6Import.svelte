<script>

    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import {pop} from "svelte-spa-router"
    import { Button, Col, Row } from "sveltestrap";


    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

    onMount(cargarDatos); //CARGAR LOS DATOS AL INICIAR  
    
    let datos_ciudades=[];
    let maximas=[];
    let datos=[];
    
    let aux=[];
    
    fcRoot(FusionCharts, Charts, FusionTheme);
    let dataSource={};
    
    //CARGA DATOS EN LA TABLA loadInitialData
      async function cargarDatos() {
            
            console.log("Buscando datos...");
            const res = await fetch("https://www.el-tiempo.net/api/json/v2/home");
    
            console.log(res.status);
            
            if (res.status != 200) {
                console.log("Error");
                
            } else {
                console.log("Ok.");
                const json = await res.json(); //FORMA DE METER LOS DATOS DE LA VARIABLE CONTACTS
                datos_ciudades = json.ciudades; //METO LOS DATOS PARSEADOS EN LA VAR CONTACTS
                console.log(`Tenemos ${datos_ciudades.length} datos.`);
                 
                var i = 0;
                
                datos_ciudades.forEach(d => {
                    
                    maximas = d["temperatures"];
                    console.log(maximas);
                    console.log("maximas "+maximas.max);

                    aux[i] = maximas.max;
                    i++;
                    
                });
                
                ver();
               
            }
    
            
    }
    
    //CREO EL JSON
    async function ver(){
       
        var x = 0;

        datos_ciudades.forEach(d => {
            
            const myObj = {
                    label: d.name,
                    value: aux[x]
            };
            x++;
            const myObjStr = JSON.stringify(myObj);
            datos.push(myObjStr);

        });

        console.log("dat" +datos);
        //console.log(dataSource);
        cargar();

    }

    async function cargar(){
        console.log("ola");

        dataSource = {
                "chart": {
                    "caption": "Temperatura Máxima en las ciudades mas importantes de España para hoy",
                    "subCaption": "Api ofrecida por https://www.el-tiempo.net",
                    "xAxisName": "Country",
                    "yAxisName": "Temperatura Máx (Cº)",
                    "numberSuffix": "Cº",
                    "theme": "fusion"
                },
                "data":  [{
                    "label": datos_ciudades[0].name,
                    "value": aux[0]
                }, {
                    "label": datos_ciudades[1].name,
                    "value": aux[1]
                }, {
                    "label": datos_ciudades[2].name,
                    "value": aux[2]
                }, {
                    "label": datos_ciudades[3].name,
                    "value": aux[3]
                }, {
                    "label": datos_ciudades[4].name,
                    "value": aux[4]
                }, {
                    "label": datos_ciudades[5].name,
                    "value": aux[5]
                }]
        }

         
        console.log(dataSource)
        chartConfig = {
        type: 'column2d',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataSource
        };
    }

    let chartConfig={};
    let para;
        
    
  

  const rollOverHandler = customEvent => {
      let args = customEvent.detail.data;
      para.innerHTML = 'La temperatura máxima en <b>' + args.categoryLabel +
            '</b> para el día de será de <b>' + args.displayValue + '</b>';
    },
    rollOutHandler = () => {
      para.innerHTML = 'Seleccione un diagrama para ver los datos';
    };

 
</script>
    
    <main>
        <br/>
       <center> <p> Aqui puedes consultar las temperaturas máximas para las 6 ciudades más importantes de España.</p>
        <p> Podemos llegar a la conclusión si la temperatura máxima a dia de hoy es muy desorvitada, si debemos o no aprovechar mas las energías renovables, para así no favorecer el calentamiento global.</p>
    </center>
        <center> <SvelteFC
              {...chartConfig}
              on:dataplotRollOver={rollOverHandler}
              on:dataplotRollOut={rollOutHandler}
            />  </center> 
         <br><br><br>
          <div><br><br>
            <p bind:this={para} id="message" style="padding: 10px; background: rgb(245, 242, 240);" >
                Seleccione un diagrama para ver los datos
            </p>
          </div>
         
          <p class="backbutton">
            <Button color="secondary" on:click={pop}>Volver</Button>
        </p>
           
        <br/>
        

    </main>
    
    <style>
    
    </style>