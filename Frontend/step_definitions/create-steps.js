const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// Background
Given('hizo click en registrar artículo', async function () {
  await this.productsPage.createProduct()
  await expect(this.page).toHaveURL(/.*\/articulos\/nuevo/)
})

When(
  'el usuario completa y envía el formulario con:',
  async function (dataTable) {
    const data = Object.fromEntries(dataTable.rows())
    await this.productsPage.fillForm(data)
    await this.productsPage.saveProduct()
  }
)

Then(
  'debería ver un mensaje que contenga {string}',
  async function (expectedMessage) {
    const messageLocator = await this.productsPage.getMessageLocator()
    await expect(messageLocator).toContainText(expectedMessage)
  }
)

Then(
  'el nuevo producto {string} debería aparecer en la listado',
  async function (sku) {
    const product = await this.productsPage.checkCreatedProduct(sku)
    expect(product).toBeTruthy()
  }
)

Then('no debería ver un mensaje de éxito', async function () {
  const toast = this.productsPage.getMessageLocator()
  await expect(toast).not.toBeVisible()
})

Then('debería permanecer en la página de creación', async function () {
  await expect(this.page).toHaveURL(/.*\/articulos\/nuevo/)
})

When('el usuario envía el formulario vacio', async function () {
  await this.productsPage.fillForm({})
  await this.productsPage.saveProduct()
})
