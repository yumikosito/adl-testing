const { Before, After, AfterStep } = require('@cucumber/cucumber')
const { setDefaultTimeout } = require('@cucumber/cucumber')
const LoginPage = require('../pages/LoginPage')
const GetPage = require('../pages/GetPage')
const fs = require('fs')
const PutPage = require('../pages/PutPage')
const { DeletePage } = require('../pages/DeletePage')
// const path = require('path');
// const LoginPage = require('../step_definitions/pom/loginPage');
// const SecurePage = require('../step_definitions/pom/securePage');

setDefaultTimeout(60 * 1000) // Set timeout to 60 seconds

Before(async function () {
  // 'this' es una instancia de tu CustomWorld
  await this.init()

  const screenshotDir = 'reports/screenshots'
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
  }
  // Instanciamos los Page Objects para cada escenario, pasándoles la nueva página

  this.loginPage = new LoginPage(this.page)
  this.getPage = new GetPage(this.page)
  this.putPage = new PutPage(this.page)
  this.deletePage = new DeletePage(this.page)
})

AfterStep(async function (scenario) {
  if (this.page) {
    //Si desean screenshots en cada paso

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')
    const filename = `step-${scenarioName}-${timestamp}.png`

    await this.page.screenshot({
      path: `reports/screenshots/${filename}`,
      fullPage: true,
    })
  }
})

After(async function (scenario) {
  //Solo toma screenshoot cuando falla
  //if (scenario.result.status === Status.FAILED) {
  // page.screenshot() sin 'path' devuelve la imagen como un buffer
  // const screenshot = await this.page.screenshot({ fullPage: true });

  // Adjunta la imagen al reporte de Cucumber.
  // Esto es lo que permite que cucumber-html-reporter la muestre.
  // this.attach(screenshot, 'image/png');
  //}

  //Grabando video.
  // const videoPath = await this.page.video()?.path();

  await this.cleanup()
  productCode = null
  tableTR = null

  // if (videoPath) {
  //     const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  //     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  //     const newVideoPath = `reports/videos/${scenarioName}-${timestamp}.webm`;

  //     // Renombrar video con nombre descriptivo
  //     if (fs.existsSync(videoPath)) {
  //         fs.renameSync(videoPath, newVideoPath);
  //         console.log(`🎥 Video guardado: ${newVideoPath}`);

  //         // Adjuntar video al reporte (si el reporter lo soporta)
  //         const videoBuffer = fs.readFileSync(newVideoPath);
  //         this.attach(videoBuffer, 'video/webm');
  //     }
  // }
})
