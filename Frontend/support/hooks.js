const { Before, After, AfterStep } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');


// const path = require('path');
// const LoginPage = require('../step_definitions/pom/loginPage');
// const SecurePage = require('../step_definitions/pom/securePage');

setDefaultTimeout(60 * 1000) // Set timeout to 60 seconds

Before(async function () {
  // 'this' es una instancia de tu CustomWorld
  await this.init()
  let productId

  const screenshotDir = 'reports/screenshots'
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
  }
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

    // Limpieza de productos solo para escenarios @delete
    if (scenario.pickle.tags.some(tag => tag.name === '@delete')) {
        const nombres = [
            'Iphone 16 Pro Max',
            'iPhone 16'
            // Agrega aquí otros nombres usados en los tests si es necesario
        ];
        for (const nombre of nombres) {
            let count = 0;
            while (true) {
                const elements = await this.page.locator(`td:has-text("${nombre}")`).count();
                if (elements === 0) break;
                await this.deletePage.clickDeleteButton(nombre);                
                await this.page.waitForTimeout(1000);                
                count++;
                if (count > 10) break;
            }
        }
    }


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
