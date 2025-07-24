const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// Background
Given(
  'el usuario ingresó con email {string} y contraseña {string} validos, navegó a lista de artículos e hizo click en registrar artículo',
  async function (username, password) {
    await this.loginPage.login(username, password)
    await this.getPage.goToProducts()
    await expect(this.page).toHaveURL(/.*\/articulos/)
    await productsPage.createProduct()
    await expect(this.page).toHaveURL(/.*\/articulos\/nuevo/)
  }
)

When(
  'el usuario completa y envía el formulario con:',
  async function (dataTable) {
    const data = Object.fromEntries(dataTable.rows())
    await productsPage.fillForm(data)
    await productsPage.saveProduct()
  }
)

Then('debería ver un mensaje {string}', async function (expectedMessage) {
  const message = await productsPage.getSuccessMessage()
  expect(message).toContain(expectedMessage)
})

Then(
  'el nuevo producto {string} debería aparecer en la listado',
  async function (newProduct) {
    const product = await productsPage.checkCreatedProduct(newProduct)
    expect(product).toBeTruthy()
  }
)
