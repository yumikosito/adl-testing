const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// Background
Given(
  'hizo click en registrar artículo',
  async function () {
    await this.productsPage.createProduct()
    await expect(this.page).toHaveURL(/.*\/articulos\/nuevo/)
  }
)

When(
  'el usuario completa y envía el formulario con:',
  async function (dataTable) {
    const data = Object.fromEntries(dataTable.rows())
    await this.productsPage.fillForm(data)
    await this.productsPage.saveProduct()
  }
)

Then('debería ver un mensaje {string}', async function (expectedMessage) {
  await this.page.waitForTimeout(5000);
  const message = await this.productsPage.getSuccessMessage()
  expect(message).toContain(expectedMessage)
})

Then(
  'el nuevo producto {string} debería aparecer en la listado',
  async function (newProduct) {
    const product = await this.productsPage.checkCreatedProduct(newProduct)
    expect(product).toBeTruthy()
  }
)
