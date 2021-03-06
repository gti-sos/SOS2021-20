const puppeteer = require('puppeteer');
const path = require('path');
const appDir = path.dirname(require.main.filename);

(async () => {

  //-------------------- MAIN APP -------------------//

  const browser = await puppeteer.launch();
  console.log("Browser opened...");
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  console.log("Starting tests for the main APP");
  await page.goto('http://localhost:10000');
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: appDir + '/screenshots/main-app-01.png' });
  const [response01] = await Promise.all([
    page.waitForNavigation(),
    page.click('button.btn:nth-child(5)'),
  ]);
  console.log("Clicked \"Integraciones\" link, waiting page load");
  await page.waitForTimeout(1000);
  console.log("Page opened! Taking a screenshot...");
  await page.screenshot({ path: appDir + '/screenshots/main-app-02.png' });
  //---------------------------------------------------//

  //------------- FOUNDS RESEARCH SOURCES -------------//
  console.log("Starting tests for Founds Research Sources Stats");

  // Open data management page 
  await page.goto('http://localhost:10000/#/foundsresearchsources-stats', { waitUntil: 'load', timeout: 0 });
  await page.waitForTimeout(1000);
  console.log("Data management page opened! Taking a screenshot...");
  await page.screenshot({ path: appDir + '/screenshots/founds-research-01.png' });

  // Check if data loads successfully
  var rowCount1 = (await page.$$(".table > tbody > tr")).length;
  var loaded1 = parseInt(rowCount1) > 2;
  console.log("Loaded elements correctly? " + loaded1);

  // Individual element deletion
  console.log("Deleting element...");
  const [response02] = await Promise.all([
    page.click('.table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(6) > button:nth-child(1)'),
    page.evaluate(`window.confirm = () => true`),
  ]);
  console.log("Clicked \"Delete element\" link, waiting page load");
  await page.waitForTimeout(1000);

  // Check if the element has been deleted
  var rowCount2 = (await page.$$(".table > tbody > tr")).length;
  var loaded2 = parseInt(rowCount1) > parseInt(rowCount2);
  console.log("Element deleted succesfully? " + loaded2);
  console.log("Taking a screenshot...");
  await page.screenshot({ path: appDir + '/screenshots/founds-research-02.png' });

  // All data deletion
  console.log("Deleting all data...");
  const [response03] = await Promise.all([
    page.click('#buttns > button:nth-child(3)'),
    page.evaluate(`window.confirm = () => true`),
  ]);
  console.log("Clicked \"Delete entire dataset\" link, waiting page load");
  await page.waitForTimeout(1000);

  // Check the dataset has been deleted
  var rowCount3 = (await page.$$(".table > tbody > tr")).length;
  var loaded3 = parseInt(rowCount3) == 1;
  console.log("Entire dataset deleted succesfully? " + loaded3);
  console.log("Taking a screenshot...");
  await page.screenshot({ path: appDir + '/screenshots/founds-research-03.png' });
  await page.goto('http://localhost:10000/api/v1/foundsresearchsources-stats/loadInitialData');
  console.log("Finishing tests for Founds Research Sources Stats");
  //---------------------------------------------------//

  //--- RENEWABLE POWERCAPACITIES --

  // RENEWABLE - ABRO PAGINA PRINCIPAL 
  await page.goto('http://localhost:10000');

  // PRIMERA FOTO
  await page.screenshot({ path: appDir + '/screenshots/renewable-01.png' });
  console.log("Pagina Abierta - Foto 1 capturada correctamente");

  // RENEWABLE - ABRO DESCRIPCION GRUPO 
  const [response2] = await Promise.all([
    page.waitForNavigation(),
    page.click("body > div > div > button"),
  ]);

  //SEGUNDA FOTO
  await page.screenshot({ path: appDir + '/screenshots/renewable-02.png' })
  console.log("Pagina Abierta - Foto 2 capturada correctamente");

  //RENEWABLE - ABRO PAGINA API RENEWABLEPOWERCAPACITIES    
  await page.goto('http://localhost:10000/#/renewablepowercapacities-stats');
  await page.waitForTimeout(1000);


  //VER DATOS CARGADOS API RENEWABLEPOWERCAPACITIES
  var rowCount = (await page.$$("body > main > div.table-responsive > table > tbody > tr")).length;

  if (rowCount >= 2) {

    console.log("DATOS CARGADOS CORRECTAMENTE");

    await page.screenshot({ path: appDir + '/screenshots/renewable-03.png' });
    console.log("Datos cargados - Foto 3 capturada correctamente");

  } else {
    //console.log("Error - No se ha cargado 2 datos o mas.");
  }


  //----- FIN RENEWABLEPOWERCAPACITIES ---

  //------------- GREENHOUSE GAS EMISSIONS -------------//

  //PRINCIPAL PAGE OF GREENHOUSEGASEMISSIONS//

  await page.goto('http://localhost:10000/#/greenhousegasemissions-stats');
  await page.waitForTimeout(1000);
  console.log("Page opened");
  await page.screenshot({ path: appDir + '/screenshots/greenhouse-gas-01.png', fullPage: true });
  console.log("Screenshot taken");

  //DELETE ELEMENT OF DB//

  const [responesejes] = await Promise.all([
    console.log("Click on delete data"),
    page.click(".table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(6) > div:nth-child(1) > button:nth-child(2)"),
    console.log("Confirm deletion of data in pop-up"),
    page.evaluate('window.confirm = () => true'),
    await page.waitForTimeout(1000),
    await page.screenshot({ path: appDir + '/screenshots/greenhouse-gas-02.png', fullPage: true }),
    console.log("Screenshot taken"),
  ]);


  //CHECK NUMBER OF ROWS IN DATA TABLE//
  var rowCount1 = (await page.$$(".table > tbody > tr")).length;
  console.log(`Initial row count = ${rowCount1}`);

  //DELETE ALL DATA IN DATABASE//
  const [responesejes1] = await Promise.all([
    console.log("Click on delete all data"),
    page.click(".elimi"),
    console.log("Confirm deletion of all data in pop-up"),
    page.evaluate('window.confirm = () => true'),
    await page.waitForTimeout(1000),
    await page.screenshot({ path: appDir + '/screenshots/greenhouse-gas-03.png', fullPage: true }),
    console.log("Screenshot taken"),
  ]);

  //LOAD INITIAL DATA//
  const [responesejes3] = await Promise.all([
    console.log("Click on delete all data"),
    page.click(".btn-success"),
    console.log("Confirm load initial data in pop-up"),
    page.evaluate('window.confirm = () => true'),
    await page.waitForTimeout(1000),
    await page.screenshot({ path: appDir + '/screenshots/greenhouse-gas-04.png', fullPage: true }),
    console.log("Screenshot taken"),
  ]);

  //---------------------------------------------------//

  await browser.close();
  console.log("Browser closed");
  process.exit(0);
})();
