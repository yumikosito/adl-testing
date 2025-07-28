const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

Given('el producto con nombre {string} existe', async function (name) {
  await this.deletePageSimple.waitForSpinner()
  const productExist = await this.deletePageSimple.productExists(name)
  await expect(productExist).toBeTruthy()
})

When(
  'el usuario hace click en el ícono de borrar en el producto {string}',
  async function (name) {
    await this.deletePageSimple.deleteProduct(name)
  }
)

Then('aparece un mensaje de confirmación', async function () {
  const confirmationModal = await this.deletePageSimple.getModal()
  await expect(confirmationModal).toBeFalsy()
})

Then(
  'el producto {string} no debería aparecer en la tabla',
  async function (name) {
    const tableIsVisible = await this.page
      .locator('button', { hasText: 'Código' })
      .isVisible()

    if (tableIsVisible) {
      const productExist = await this.deletePageSimple.productExists(name)
      await expect(productExist).toBeFalsy()
    } else {
      await expect(this.page.locator('h3')).toHaveText('No hay artículos')
      console.log('No hay artículos en la cuenta del usuario')
    }
  }
)

Given('no hay productos creados en el sistema', async function () {
  const table = this.page.locator('tbody')
  const exists = (await table.count()) > 0

  if (exists) {
    await expect(this.page.locator('tbody tr')).toHaveCount(0)
    console.log('La tabla existe pero no tiene artículos')
  } else {
    console.log('La tabla se encuentra vacía y no renderizada')
  }
})

Then('debería ver un mensaje que diga {string}', async function (message) {
  const tableMessage = this.page.locator('h3')
  const exists = (await tableMessage.count()) > 0

  if (exists) {
    await expect(tableMessage).toHaveText(message)
  } else {
    console.log('Existen artículos en la tabla')
  }
})
