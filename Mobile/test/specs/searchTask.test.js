const { remote } = require("webdriverio");
const ToDoPage = require("../pages/ToDoPage");
const selectors = require("../utils/selectors");
const capabilities = require("../utils/capabilities");

let driver, page;

describe("Flujo: Buscar tarea por título", () => {
  beforeAll(async () => {
    driver = await remote({ port: 4723, capabilities });
    page = new ToDoPage(driver);
  });  

  afterAll(async () => {
    if (driver) await driver.deleteSession();
  });

  it("debe buscar una tarea existente y encontrarla", async () => {
    // Usa un nombre de tarea que sabes que existe en el dashboard, por ejemplo "Configurar entorno de desarrollo"
    const nombreExistente = "Configurar entorno de desarrollo";
    await page.searchTask(selectors.dashboardBuscadorEditText, nombreExistente);
    expect(await page.taskExists(nombreExistente)).toBe(true);
  });

  it("debe buscar una tarea inexistente y no encontrarla", async () => {
    const nombreInexistente = "Tarea que no existe";
    await page.searchTask(
      selectors.dashboardBuscadorEditText,
      nombreInexistente
    );
    expect(await page.taskExists(nombreInexistente)).toBe(false);
  });
});
