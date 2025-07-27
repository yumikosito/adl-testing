
class ToDoPage {
  // --- TAREAS: CRUD Y LISTA ---
  async addTask(titulo, desc = 'Descripción por defecto', estado = 'Pendiente', selectors) {
    if (!selectors) selectors = require('../utils/selectors');
    await this.openNewTaskModal(selectors.fabAdd);
    let stateSelector;
    switch ((estado || '').toLowerCase()) {
      case 'pendiente':
        stateSelector = selectors.btnPendienteNewTask;
        break;
      case 'en progreso':
        stateSelector = selectors.btnEnProgresoNewTask;
        break;
      case 'realizada':
        stateSelector = selectors.btnRealizadaNewTask;
        break;
      default:
        stateSelector = selectors.btnPendienteNewTask;
    }
    await this.fillTaskForm({
      titleSelector: selectors.inputTitleNewTask,
      descSelector: selectors.inputDescNewTask,
      stateSelector,
      title: titulo,
      desc: desc,
      state: estado,
    });
    await this.saveTask(selectors.btnGuardarNewTask);
  }

  async openNewTaskModal(fabSelector) {
    const fab = await this.findElement(fabSelector, 7000);
    await fab.click();
  }

  async openEditTaskModalByTitle(title, selectors) {
    if (!selectors) selectors = require('../utils/selectors');
    const container = await this.driver.$(selectors.dashboardContenedorCards);
    const cards = await container.$$(selectors.cardViewGroup);
    for (const card of cards) {
      const textViews = await card.$$(selectors.cardTextView);
      if (textViews.length > 0) {
        const cardTitle = await textViews[0].getText();
        if (
          cardTitle &&
          (cardTitle.trim() === title.trim() || cardTitle.trim().includes(title.trim()))
        ) {
          let editBtn;
          try {
            editBtn = await card.$(selectors.btnEditarCard);
            await editBtn.waitForDisplayed({ timeout: 5000 });
          } catch {
            const possibleBtns = await card.$$(selectors.cardButton);
            for (const btn of possibleBtns) {
              const btnText = await btn.getText().catch(() => "");
              if (btnText && btnText.toLowerCase().includes("editar")) {
                editBtn = btn;
                break;
              }
            }
            if (!editBtn) throw new Error('No se encontró el botón Editar en el card');
          }
          await editBtn.click();
          return;
        }
      }
    }
    throw new Error(`No se encontró el card con título (exacto o parcial): ${title}`);
  }

  async openDeleteTaskModal(btnEliminarSelector) {
    if (!btnEliminarSelector) btnEliminarSelector = require('../utils/selectors').btnEliminarCard;
    const btnEliminar = await this.findElement(btnEliminarSelector);
    await btnEliminar.click();
  }

  async confirmDeleteTask(btnConfirmarSelector) {
    if (!btnConfirmarSelector) btnConfirmarSelector = require('../utils/selectors').dialogBtnConfirmarEliminar;
    const btnConfirmar = await this.findElement(btnConfirmarSelector);
    await btnConfirmar.click();
  }

  async fillTaskForm({
    titleSelector,
    descSelector,
    stateSelector,
    title,
    desc,
    state,
  }) {
    if (titleSelector && typeof title !== 'undefined') {
      const titleInput = await this.findElement(titleSelector);
      try {
        await titleInput.clearValue();
      } catch {
        await titleInput.setValue('');
      }
      if (title !== null) {
        await titleInput.setValue(title);
      }
    }
    if (descSelector && typeof desc !== 'undefined') {
      const descInput = await this.findElement(descSelector);
      try {
        await descInput.clearValue();
      } catch {
        await descInput.setValue('');
      }
      if (desc !== null) {
        await descInput.setValue(desc);
      }
    }
    if (stateSelector && typeof state !== 'undefined') {
      const stateBtn = await this.findElement(stateSelector);
      await stateBtn.click();
    }
  }

  async saveTask(saveBtnSelector) {
    const saveBtn = await this.findElement(saveBtnSelector);
    await saveBtn.click();
  }

  // --- TAREAS: LISTADO Y CONSULTA ---
  async taskList(selectors) {
    if (!selectors) selectors = require('../utils/selectors');
    const container = await this.driver.$(selectors.dashboardContenedorCards);
    const cards = await container.$$(selectors.cardViewGroup);
    let titles = [];
    for (const card of cards) {
      const textViews = await card.$$(selectors.cardTextView);
      // Considera solo cards que tengan al menos 2 TextView: título y estado
      if (textViews.length >= 2) {
        const title = await textViews[0].getText();
        const state = await textViews[1].getText();
        // Filtra cards que tengan título y estado no vacíos y que el estado sea válido
        if (
          title && title.trim().length > 0 &&
          state && ["Pendiente", "En Progreso", "Realizada"].includes(state.trim())
        ) {
          titles.push(title);
        }
      }
    }
    return titles;
  }

  async taskExists(text) {
    const titles = await this.taskList();
    return titles.some(title => title.includes(text));
  }

  async getTaskState(title, selectors) {
    if (!selectors) selectors = require('../utils/selectors');
    const container = await this.driver.$(selectors.dashboardContenedorCards);
    const cards = await container.$$(selectors.cardViewGroup);
    for (const card of cards) {
      const textViews = await card.$$(selectors.cardTextView);
      if (textViews.length > 0) {
        const cardTitle = await textViews[0].getText();
        if (
          cardTitle &&
          (cardTitle.trim() === title.trim() || cardTitle.trim().includes(title.trim()))
        ) {
          if (textViews.length > 1) {
            return await textViews[1].getText();
          }
        }
      }
    }
    return null;
  }

  async getTaskTitle(title, selectors) {
    if (!selectors) selectors = require('../utils/selectors');
    const container = await this.driver.$(selectors.dashboardContenedorCards);
    const cards = await container.$$(selectors.cardViewGroup);
    for (const card of cards) {
      const textViews = await card.$$(selectors.cardTextView);
      if (textViews.length > 0) {
        const cardTitle = await textViews[0].getText();
        if (cardTitle && (cardTitle.trim() === title.trim() || cardTitle.trim().includes(title.trim()))) {
          return cardTitle;
        }
      }
    }
    return null;
  }

  // --- FILTRO Y BÚSQUEDA ---
  async filterTasks(filtroSelector) {
    if (!filtroSelector) filtroSelector = require('../utils/selectors').dashboardFiltroTodos;
    const filtroBtn = await this.findElement(filtroSelector);
    await filtroBtn.click();
    await this.driver.pause(500);
  }

  // Valida que todas las tareas visibles tengan el estado esperado
  async allTasksAreState(expectedState) {
    const titles = await this.taskList();
    if (titles.length === 0) return true; // Si no hay tareas, se considera válido
    for (const title of titles) {
      const state = await this.getTaskState(title);
      if (!state || state.trim() !== expectedState.trim()) {
        return false;
      }
    }
    return true;
  }

  async searchTask(buscadorSelector, texto) {
    if (!buscadorSelector) buscadorSelector = require('../utils/selectors').dashboardBuscadorInput;
    const buscador = await this.findElement(buscadorSelector);
    await buscador.setValue(texto);
    await this.driver.pause(500);
  }

  // --- UTILIDADES Y CONSTRUCTOR ---
  constructor(driver) {
    this.driver = driver;
  }

  async findElement(selector, timeout = 5000) {
    const el = await this.driver.$(selector);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  async isElementVisible(selector, timeout = 5000) {
    try {
      const el = await this.findElement(selector, timeout);
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = ToDoPage;
