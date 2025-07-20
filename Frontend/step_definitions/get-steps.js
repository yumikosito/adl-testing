const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario ingresó con email {string} y contraseña {string}, y está en el dashboard', async function (username,password) {
  await this.loginPage.login(username,password)
  await expect(this.page).toHaveURL(/.*\/dashboard/);
})

When('se navega a la sección de Articulos', async function (){
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)
})

Then('se deben mostrar todos los productos en tu cuenta', async function () {
  await expect(this.page.locator('h1')).toHaveText('Listado de Artículos')
  await this.page.locator('.spinner').waitFor({ state: 'detached'});
  const rows = this.page.locator('table tbody tr');
  await rows.first().waitFor({ state: 'visible' });

  const count = await rows.count();
  expect(count).toBeGreaterThan(0);
})

When('se selecciona el producto con ID {int}', async function(id){
  await this.page.goto(`/articulos/${id}`);
})

Then('se debe mostrar en pantalla {string}', async function(product){
  await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });

  await expect(this.page.locator('h3')).toHaveText(product)
  await expect(this.page.locator('p')).toHaveText('Detalles completos del registro seleccionado.')
})

Then('se debe mostrar un mensaje de error {string}', async function(error){
  await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
  await expect(this.page.locator('div.text-red-500')).toHaveText(error);

})