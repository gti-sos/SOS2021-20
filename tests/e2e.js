const puppeteer = require('puppeteer');
const path = require('path');
const appDir = path.dirname(require.main.filename);

(async () => {

  //-------------------- MAIN APP -------------------//
  const browser = await puppeteer.launch();
  console.log("Browser opened...");
  const page = await browser.newPage();
  await page.goto('http://localhost:10000');
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: appDir+'/screenshots/main-app-01.png' });
  const [response] = await Promise.all([
    page.waitForNavigation(), 
    page.click('button.btn:nth-child(5)'), 
  ]);
  console.log("Clicked \"Integraciones\" link, waiting page load");
  await page.waitForTimeout(1000);
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: appDir+'/screenshots/main-app-02.png' });
  //---------------------------------------------------//

  //------------- FOUNDS RESEARCH SOURCES -------------//
  await page.goto('http://localhost:10000/#/foundsresearchsources-stats');
  await page.waitForTimeout(1000);
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: appDir+'/screenshots/founds-research-01.png' });

  var rowCount = (await page.$$(".table > tbody > tr")).length;
  var loaded = parseInt(rowCount) > 2;
  console.log("Loaded elements correctly? " + loaded  );

  //---------------------------------------------------//

   //--- RENEWABLE POWERCAPACITIES --

// RENEWABLE - ABRO PAGINA PRINCIPAL 
await page.goto('http://localhost:10000');
    
// PRIMERA FOTO
await page.screenshot({ path: appDir+'/screenshots/renewable-01.png' });
console.log("Pagina Abierta - Foto 1 capturada correctamente");

// RENEWABLE - ABRO DESCRIPCION GRUPO 
const [response2] = await Promise.all([
page.waitForNavigation(),
page.click("body > div > div > button"),
]); 

//SEGUNDA FOTO
await page.screenshot({path: appDir+'/screenshots/renewable-02.png'})
console.log("Pagina Abierta - Foto 2 capturada correctamente");

//RENEWABLE - ABRO PAGINA API RENEWABLEPOWERCAPACITIES    
await page.goto('http://localhost:10000/#/renewablepowercapacities-stats');
await page.waitForTimeout(1000);


//VER DATOS CARGADOS API RENEWABLEPOWERCAPACITIES
var rowCount = (await page.$$("body > main > div.table-responsive > table > tbody > tr")).length;

if(rowCount >=2 ){

console.log("DATOS CARGADOS CORRECTAMENTE");

await page.screenshot({ path: appDir+'/screenshots/renewable-03.png' });
console.log("Datos cargados - Foto 3 capturada correctamente");

}else{
//console.log("Error - No se ha cargado 2 datos o mas.");
}


//----- FIN RENEWABLEPOWERCAPACITIES ---

//------------- GREENHOUSE GAS EMISSIONS -------------//

//PRINCIPAL PAGE OF GREENHOUSEGASEMISSIONS//

await page.goto('http://localhost:10000/#/greenhousegasemissions-stats');
await page.waitForTimeout(1000);
console.log("Page opened");
await page.setViewport({width: 1920, height: 1080}), //Ajustar vista de la página
await page.screenshot({ path: appDir +'/screenshots/greenhouse-gas-01.png', fullPage: true});
console.log("Screenshot taken");

//DELETE ELEMENT OF DB//

const [responesejes] = await Promise.all([
  page.waitForNavigation(),
  console.log("Click on delete data"),
  page.click(".table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(6) > div:nth-child(1) > button:nth-child(2)"),
  console.log("Confirm deletion of data in pop-up"),
  page.evaluate('window.confirm = () => true'),
  await page.setViewport({width: 1920, height: 1080}),
  await page.waitForTimeout(1000),
  await page.screenshot({ path: appDir +'/screenshots/greenhouse-gas-02.png', fullPage: true }),
  console.log("Screenshot taken"),
]);


//CHECK NUMBER OF ROWS IN DATA TABLE//












//---------------------------------------------------//
 
  await browser.close();
  console.log("Browser closed");
  process.exit(0);
})();
