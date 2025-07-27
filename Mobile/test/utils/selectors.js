  // Selectores centralizados para pruebas automatizadas

// Nombres claros y consistentes para cada flujo/modal
module.exports = {
  // Input de título y descripción en ambos modales (crear y editar)
  inputTitleNewTask: 'android=new UiSelector().className("android.widget.EditText").instance(0)',
  inputDescNewTask: 'android=new UiSelector().className("android.widget.EditText").instance(1)',
  inputTitleEditTask: 'android=new UiSelector().className("android.widget.EditText").instance(0)',
  inputDescEditTask: 'android=new UiSelector().className("android.widget.EditText").instance(1)',
  // Dashboard
  dashboardTitulo: 'android=new UiSelector().text("Gestor de Tareas")',
  dashboardBuscadorInput: 'android=new UiSelector().text("Buscar por título...")',
  dashboardBuscadorEditText:
    'android=new UiSelector().className("android.widget.EditText")',
  dashboardFiltroTodos: "~Todos",
  dashboardFiltroPendiente: "~Pendiente",
  dashboardFiltroEnProgreso: "~En Progreso",
  dashboardFiltroRealizada: "~Realizada",
  dashboardCardTarea:
    'android=new UiSelector().className("android.view.ViewGroup").instance(6)',
  dashboardCardTitulo: 'android=new UiSelector().text("Crear proyecto React Native")',
  dashboardCardEstado: 'android=new UiSelector().className("android.view.ViewGroup").instance(7)',
  dashboardContenedorCards:
    'android=new UiSelector().className("android.view.ViewGroup").instance(5)',
  btnEditarCard: 'android=new UiSelector().description("Editar").instance(0)',
  btnEliminarCard:
    'android=new UiSelector().description("Eliminar").instance(0)',
  // Botón FAB para agregar tarea
  fabAdd: "~+",

  // Modal Nueva Tarea
  modalCreateTitle: 'android=new UiSelector().text("Nueva Tarea")',
  inputTitleNewTask: 'android=new UiSelector().text("Ej: Comprar víveres")',
  inputDescNewTask:
    'android=new UiSelector().text("Descripción detallada de la tarea...")',
  btnPendienteNewTask: "~Pendiente",
  btnEnProgresoNewTask: "~En Progreso",
  btnRealizadaNewTask: "~Realizada",
  btnGuardarNewTask: "~Guardar",
  btnCancelarNewTask: "~Cancelar",

  // Modal Editar Tarea
  modalEditTitle: 'android=new UiSelector().text("Editar Tarea")',
  btnEditarPrimera:
    'android=new UiSelector().description("Editar").instance(0)',
  tareaTitulo:
    'android=new UiSelector().text("Configurar entorno de desarrollo")',
  tareaDescripcion:
    'android=new UiSelector().text("Instalar Node, Watchman, JDK y configurar Android Studio.")',
  btnPendienteEdit: "~Pendiente",
  btnEnProgresoEdit: "~En Progreso",
  btnRealizadaEdit: "~Realizada",
  btnCancelarEdit: "~Cancelar",
  btnGuardarEdit: "~Guardar",

  // Eliminar tarea
  btnEliminarPrimera:
    'android=new UiSelector().description("Eliminar").instance(0)',
  dialogEliminarTitulo:
    'android=new UiSelector().resourceId("com.gestortareasapp:id/alert_title")',
  dialogBtnConfirmarEliminar:
    'android=new UiSelector().resourceId("android:id/button1")',
  dialogBtnCancelarEliminar:
    'android=new UiSelector().resourceId("android:id/button2")',

  
  // Puedes agregar más selectores aquí según los flujos y vistas

  // Alert genérico
  alertTitle: 'android=new UiSelector().resourceId("com.gestortareasapp:id/alert_title")',
  alertMsg: 'android=new UiSelector().resourceId("android:id/message")',
  alertBtnOk: 'android=new UiSelector().resourceId("android:id/button1")',

   // Genéricos para cards y vistas
  cardViewGroup: '//android.view.ViewGroup',
  cardTextView: './/android.widget.TextView',
  cardButton: './/android.widget.Button',
};
