const { remote } = require("webdriverio");
const ToDoPage = require("../pages/ToDoPage");
const selectors = require("../utils/selectors");
const capabilities = require("../utils/capabilities");

let driver, page;

describe("Flujo: Filtrar tareas por estado", () => {
  beforeAll(async () => {
    driver = await remote({ port: 4723, capabilities });
    page = new ToDoPage(driver);
  });

  afterAll(async () => {
    if (driver) await driver.deleteSession();
  });

  it('debe filtrar por cada estado y restaurar la lista completa al volver a "Todos"', async () => {
    // Guardar la lista original
    await page.filterTasks(selectors.dashboardFiltroTodos);
    const listaOriginal = await page.taskList();

    // Filtrar y validar cada estado
    await page.filterTasks(selectors.dashboardFiltroPendiente);
    expect(await page.allTasksAreState("Pendiente")).toBe(true);

    await page.filterTasks(selectors.dashboardFiltroEnProgreso);
    expect(await page.allTasksAreState("En Progreso")).toBe(true);

    await page.filterTasks(selectors.dashboardFiltroRealizada);
    expect(await page.allTasksAreState("Realizada")).toBe(true);

    // Volver a Todos y validar restauración
    await page.filterTasks(selectors.dashboardFiltroTodos);
    const listaTodos = await page.taskList();
    expect(listaTodos.sort()).toEqual(listaOriginal.sort());
  });
});
