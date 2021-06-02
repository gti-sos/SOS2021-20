const puppeteer = require('puppeteer');



(async () => {

  const browser = await puppeteer.launch();
  console.log("Browser opened...");
  const page = await browser.newPage();
  await page.goto('http://localhost:10000');
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: '01.png' });



  const [response] = await Promise.all([
    page.waitForNavigation(), 
    page.click('button.btn:nth-child(5)'), 
  ]);
  console.log("Clicked \"Integraciones\" link, waiting page load");
  await page.waitForTimeout(1000);
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: '02.png' });

  await page.goto('http://localhost:10000/#/foundsresearchsources-stats');
  await page.waitForTimeout(1000);
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: '03.png' });

  var rowCount = (await page.$$(".table > tbody > tr")).length;
  var loaded = parseInt(rowCount) > 2;
  console.log("Loaded elements correctly? " + loaded  );
  await browser.close();
  console.log("Browser closed");

   //--- RENEWABLE POWERCAPACITIES --

//RENEWABLE - ABRO PAGINA PRINCIPAL 
const browser2 = await puppeteer.launch();
console.log("Browser opened...");
const page2 = await browser2.newPage();
await page2.goto('http://localhost:10000');
    
//PRIMERA FOTO
await page2.screenshot({ path: 'tests/renewable_1.png' });
console.log("Pagina Abierta - Foto 1 capturada correctamente");

//RENEWABLE - ABRO DESCRIPCION GRUPO 
const [response2] = await Promise.all([
page2.waitForNavigation(),
page2.click("body > div > div > button"),
]); 

//SEGUNDA FOTO
await page2.screenshot({path: 'tests/renewable_2.png'})
console.log("Pagina Abierta - Foto 2 capturada correctamente");

//RENEWABLE - ABRO PAGINA API RENEWABLEPOWERCAPACITIES    
await page2.goto('http://localhost:10000/#/renewablepowercapacities-stats');
await page2.waitForTimeout(1000);


//VER DATOS CARGADOS API RENEWABLEPOWERCAPACITIES
var rowCount = (await page2.$$("body > main > div.table-responsive > table > tbody > tr")).length;

if(rowCount >=2 ){

console.log("DATOS CARGADOS CORRECTAMENTE");

await page2.screenshot({ path: 'tests/renewable_3.png' });
console.log("Datos cargados - Foto 3 capturada correctamente");

}else{
console.log("Error - No se ha cargado 2 datos o mas.");
}


//----- FIN RENEWABLEPOWERCAPACITIES ---


  process.exit(0);

})();
