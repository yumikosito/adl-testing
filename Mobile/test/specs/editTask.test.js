const { remote } = require("webdriverio");
const ToDoPage = require("../pages/ToDoPage");
const selectors = require("../utils/selectors");
const capabilities = require("../utils/capabilities");

let driver, page;

describe("Flujo: Editar tarea existente", () => {
  beforeAll(async () => {
    driver = await remote({ port: 4723, capabilities });
    page = new ToDoPage(driver);
  });  

  afterAll(async () => {
    if (driver) await driver.deleteSession();
  });

  it("debe cambiar el estado de una tarea correctamente", async () => {
    // Crear tarea original si no existe
    const tareaOriginal = "Tarea para cambiar estado";
    const tareaEditada = "Tarea con estado cambiado";
    if (!(await page.taskExists(tareaOriginal))) {
      await page.openNewTaskModal(selectors.fabAdd);
      await page.fillTaskForm({
        titleSelector: selectors.inputTitleNewTask,
        descSelector: selectors.inputDescNewTask,
        stateSelector: selectors.btnPendienteNewTask,
        title: tareaOriginal,
        desc: "Descripción original",
        state: "Pendiente",
      });
      await page.saveTask(selectors.btnGuardarNewTask);
    }

    // Cambiar el estado de la tarea
    await page.openEditTaskModalByTitle(tareaOriginal);
    await page.fillTaskForm({
      titleSelector: selectors.inputTitleEditTask,
      descSelector: selectors.inputDescEditTask,
      stateSelector: selectors.btnEnProgresoEdit,
      title: tareaOriginal, // No cambiamos el título
      desc: "Descripción editada",
      state: "En Progreso",
    });
    await page.saveTask(selectors.btnGuardarEdit);
    await driver.pause(1000);
    // Validar que el estado de la tarea cambió a "En Progreso"
    const estado = await page.getTaskState(tareaOriginal);
    console.log(`Estado detectado tras cambio: ${estado}`);
    expect(estado).toBe("En Progreso");
  });

  it("debe editar el título de una tarea correctamente", async () => {
    // Crear tarea original si no existe
    const tareaOriginal = "Tarea para editar título";
    const tareaEditada = "Tarea con título editado";
    if (!(await page.taskExists(tareaOriginal))) {
      await page.openNewTaskModal(selectors.fabAdd);
      await page.fillTaskForm({
        titleSelector: selectors.inputTitleNewTask,
        descSelector: selectors.inputDescNewTask,
        stateSelector: selectors.btnPendienteNewTask,
        title: tareaOriginal,
        desc: "Descripción original",
        state: "Pendiente",
      });
      await page.saveTask(selectors.btnGuardarNewTask);
    }

    // Editar el título de la tarea
    await page.openEditTaskModalByTitle(tareaOriginal);
    await page.fillTaskForm({
      titleSelector: selectors.inputTitleEditTask,
      descSelector: selectors.inputDescEditTask,
      stateSelector: selectors.btnPendienteEdit,
      title: tareaEditada,
      desc: "Descripción editada",
      state: "Pendiente",
    });
    await page.saveTask(selectors.btnGuardarEdit);
    await driver.pause(1000);
    // Validar que el nuevo título aparece y el anterior no
    const tituloNuevo = await page.getTaskTitle(tareaEditada);
    const tituloViejo = await page.getTaskTitle(tareaOriginal);
    console.log("Título detectado tras edición:", tituloNuevo);
    expect(tituloNuevo).toBe(tareaEditada);
    expect(tituloViejo).toBe(null);

    // Validar que el estado sigue siendo correcto tras editar el título
    const estadoNuevo = await page.getTaskState(tareaEditada);
    expect(estadoNuevo).toBe("Pendiente");
  });
});
