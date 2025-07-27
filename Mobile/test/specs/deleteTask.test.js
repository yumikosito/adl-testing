const { remote } = require("webdriverio");
const ToDoPage = require("../pages/ToDoPage");
const selectors = require("../utils/selectors");
const capabilities = require("../utils/capabilities");

let driver, page;

describe("Flujo: Eliminar tarea", () => {
  beforeAll(async () => {    
    driver = await remote({ port: 4723, capabilities });
    page = new ToDoPage(driver);
  });  

  afterAll(async () => {
    if (driver) await driver.deleteSession();
  });

  it("debe eliminar una tarea existente correctamente", async () => {
    // Usar una tarea que sabes que existe, por ejemplo "Configurar entorno de desarrollo"
    const tareaExistente = "Configurar entorno de desarrollo";
    expect(await page.taskExists(tareaExistente)).toBe(true);
    await page.openDeleteTaskModal(selectors.btnEliminarCard);
    await page.confirmDeleteTask(selectors.dialogBtnConfirmarEliminar);
    // Validar que la tarea ya no aparece en la lista
    expect(await page.taskExists(tareaExistente)).toBe(false);
  });

  it("debe cancelar la eliminación y validar que la tarea sigue existiendo", async () => {
    const tareaExistente = "Desarrollar la UI de la App";
    expect(await page.taskExists(tareaExistente)).toBe(true);
    await page.openDeleteTaskModal(selectors.btnEliminarCard);
    // Cancelar en el diálogo
    const btnCancelar = selectors.dialogBtnCancelarEliminar;
    const cancelarBtn = await page.findElement(btnCancelar);
    await cancelarBtn.click();
    // Validar que la tarea sigue existiendo
    expect(await page.taskExists(tareaExistente)).toBe(true);
  });
});
