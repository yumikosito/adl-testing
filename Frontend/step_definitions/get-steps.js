const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('está en la página de dashboard', async function(){
  await expect(this.page).toHaveURL(/.*\/dashboard/);
  await expect(this.page.locator('h1')).toHaveText('Dashboard')
  await expect(this.page.getByText('Bienvenido al sistema ERP.')).toBeVisible();
})


When('se navega a la sección de Articulos', async function (){
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)
})


When ('se ingresa al detalle del producto {string}', async function (product){
  await this.page.locator('.spinner').waitFor({ state: 'detached'});
  await this.page.waitForTimeout(5000);
  const isVisible = await this.page.locator('button', { hasText: 'Código' }).isVisible();
  
  if (isVisible) {
    const productClick = await this.page.locator(`tbody tr:has(td:nth-child(1):text-is("${product}"))`);
    await productClick.click();
    
  } else {
    await expect(this.page.locator('h3')).toHaveText('No hay artículos')
    console.log("No hay artículos en la cuenta del usuario"); 
  }
})


Then('se deben mostrar todos los productos en tu cuenta', async function () {
  await expect(this.page.locator('h1')).toHaveText('Listado de Artículos')
  await expect(this.page.locator('p')).toHaveText('Una lista de todos los artículos en tu cuenta.')
  await this.page.locator('.spinner').waitFor({ state: 'detached'});
  await this.page.waitForTimeout(5000);

  const isVisible = await this.page.locator('button', { hasText: 'Código' }).isVisible();
    
  if (isVisible) {
    const rows = this.page.locator('table tbody tr');
    await rows.first().waitFor({ state: 'visible' });

    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    const headers = this.page.locator('table thead th');
    await expect(headers.first()).toBeVisible(); 
  
  } else {
    await expect(this.page.locator('h3')).toHaveText('No hay artículos')
    console.log("No hay artículos en la cuenta del usuario"); 
  }
})


When('se selecciona el producto con ID {string}', async function(id){
  await this.page.goto(`/articulos/${id}`);
})


Then('se debe mostrar en pantalla {string}', async function(product){
  await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
  await expect(this.page.locator('h3')).toHaveText(product)
  await expect(this.page.locator('p')).toHaveText('Detalles completos del registro seleccionado.')
})


Then('se debe mostrar un mensaje de error {string}', async function(error){
  if(error == "Error al guardar el artículo."){
    await this.putPage.clickSave()
  }
  await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
  await this.page.waitForTimeout(5000);
  await expect(this.page.locator('div.text-red-500')).toHaveText(error);
})