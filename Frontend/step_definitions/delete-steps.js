const { Given, When, Then } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');

Given('el usuario ha iniciado sesión ingresó con email {string} y contraseña {string} y se encuentra en el listado de productos', async function (username, password) {
  
  await this.loginPage.login(username, password)  
  await expect(this.page).toHaveURL(/.*\/dashboard/);
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)
  
  // Esperar a que la tabla de productos esté completamente cargada
  await expect(this.page.locator('h1')).toHaveText('Listado de Artículos');
  await this.page.locator('.spinner').waitFor({ state: 'detached' });
  
  // Verificar que hay productos en la tabla
  const rows = this.page.locator('table tbody tr');
  await rows.first().waitFor({ state: 'visible' });
});

When('el usuario busca el producto {string} en la tabla', async function (producto) {
  await this.deletePage.searchProduct(producto);
});

When('hace clic en el botón eliminar correspondiente al producto {string}', async function (producto) {
  await this.deletePage.clickDeleteButton(producto);
});

Then('el producto {string} ya no debería aparecer en la tabla', async function (producto) {
  await this.deletePage.confirmDeletion(producto);
});

Then('se debe mostrar una notificación de {string}', async function (mensaje) {
  await this.deletePage.verifyDeleteMessage(mensaje);
});



