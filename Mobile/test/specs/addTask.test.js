const { remote } = require("webdriverio");
const ToDoPage = require("../pages/ToDoPage");
const selectors = require("../utils/selectors");
const capabilities = require("../utils/capabilities");

let driver, page;

describe("Flujo: Agregar nueva tarea", () => {
  beforeAll(async () => {    
    driver = await remote({ port: 4723, capabilities });
    page = new ToDoPage(driver);
  });  

  afterAll(async () => {
    if (driver) await driver.deleteSession();
  });

  it("debe agregar una tarea correctamente", async () => {
    await page.addTask(
      "Mi proyecto de Automation",
      "Proyecto finalizado para TAE",
      "En Progreso",
      selectors
    );
    // Validar que la tarea aparece en la lista
    const existe = await page.taskExists("Mi proyecto de Automation");
    expect(existe).toBe(true);
  });

  it("no debería agregar una tarea si el título está vacío", async () => {
    await page.addTask("");
    // Esperar a que aparezca el alert de error
    const isAlertVisible = await page.isElementVisible(
      selectors.alertTitle,
      3000
    );
    expect(isAlertVisible).toBe(true);
    const alertMsg = await driver.$(selectors.alertMsg).getText();
    expect(alertMsg.length).toBeGreaterThan(0); // O ajusta el texto esperado
    // Cerrar el alert
    const okBtn = await driver.$(selectors.alertBtnOk);
    await okBtn.click();
  });
});
