const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const { ProductosPage } = require('../pages/CreatePage')

let productosPage

Given('que el usuario navega a la página de login', async function () {
  await this.page.goto('URL_LOGIN') // O variable env
})

When(
  'ingresa su correo {string} y contraseña {string}',
  async function (email, password) {
    await this.page.fill('input[name="email"]', email)
    await this.page.fill('input[name="password"]', password)
  }
)

When('hace clic en {string}', async function (boton) {
  await this.page.click(`text=${boton}`)
})

Then('debería ver el panel principal', async function () {
  await this.page.waitForSelector('selector-del-panel-principal')
})

// A partir de aquí, uso ProductosPage:

Given('el usuario hace click en el botón {string}', async function (boton) {
  productosPage = new ProductosPage(this.page)
  if (boton === 'Entidades') {
    await productosPage.navegarAArticulos()
  }
})

When('selecciona la opción {string}', async function (opcion) {
  // Esto ya lo hace navegarAArticulos, si quieres podrías hacer más granular
})

Then('se encuentra en la lista de artículos', async function () {
  await this.page.waitForSelector(productosPage.btnCrearArticulo)
})

When('hace clic en {string}', async function (boton) {
  if (boton === 'Crear Artículo') {
    await productosPage.clickCrearArticulo()
  } else if (boton === 'Guardar cambios') {
    await productosPage.guardarCambios()
  }
})

When('completa el formulario con:', async function (dataTable) {
  const datos = {}
  dataTable.rows().forEach(([campo, valor]) => {
    datos[campo] = valor
  })
  await productosPage.completarFormulario(datos)
})

Then('debería ver un mensaje {string}', async function (mensajeEsperado) {
  const mensaje = await productosPage.obtenerMensajeExito()
  expect(mensaje).toContain(mensajeEsperado)
})

Then(
  'debería ver un mensaje de error que indique que la descripción es obligatoria',
  async function () {
    const mensaje = await productosPage.obtenerMensajeError()
    expect(mensaje.toLowerCase()).toContain('descripción es obligatoria')
  }
)

Then(
  'el nuevo producto {string} debería aparecer en la listado',
  async function (nombreProducto) {
    const existe = await productosPage.productoExiste(nombreProducto)
    expect(existe).toBeTruthy()
  }
)
