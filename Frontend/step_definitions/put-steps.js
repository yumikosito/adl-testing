const { Given, When, Then, AfterStep, AfterAll } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let tableTR;
let productCode;


Given('esta en la página debe Listado de Articulos', async function (){
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)
})

Given('el producto con código {string} existe', async function (product){
  if (productCode == null){
    productCode = product
  }
  tableTR = await this.page.locator(`tbody tr:has(td:nth-child(1):text-is("${productCode}"))`);
})

When ('se ingresa al detalle del producto y se navega a la página de edición', async function () {
  await this.page.locator('.spinner').waitFor({ state: 'detached'});
  await this.page.waitForTimeout(5000);
  const isVisible = await this.page.locator('button', { hasText: 'Código' }).isVisible();
  
  if (isVisible) {
    const productName = await tableTR.locator('td:nth-child(2)').innerText();
    await tableTR.click();
    await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
    
    await expect(this.page.locator('h3')).toHaveText(`Artículo: ${productName}`)
    await this.putPage.clickEdit()
    await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
    await expect(this.page.getByLabel('Código (SKU)')).toHaveValue(productCode)

  } else {
    await expect(this.page.locator('h3')).toHaveText('No hay artículos')
    console.log("No hay artículos en la cuenta del usuario"); 
  }
  
})

When ('se modifica el campo de {string} a {string}', async function (selectInput,edit) {
  if(selectInput =='Unidad de medida'){
    await this.page.selectOption('#unit', edit);
    await this.putPage.clickSave()

  } else {
    const input = await this.page.getByLabel(selectInput)
    await input.fill('')
    await input.click()
    for (const char of edit) {
      await input.press(char);
    }
  }

})


Then ('aparece un mensaje de edición exitosa y en el sistema cambia el campo de {string} a {string}', async function (input, edit) {
  if(input =='Código') {
    productCode = edit
    tableTR = await this.page.locator(`tbody tr:has(td:nth-child(1):text-is("${productCode}"))`);
  }
  await this.putPage.clickSave()
  await this.page.locator('.Toastify__toast-container')
  await expect(this.page.locator('.Toastify__toast-container')).toContainText(/actualizado con éxito!/)
  await expect(this.page).toHaveURL(/.*\/articulos/)
 

  if (input == 'Código'){
    const col = await tableTR.locator('td').nth(0)
    await expect(col).toHaveText(edit)
  }
  else if (input == 'Descripción'){
    const col = await tableTR.locator('td').nth(1)
    await expect(col).toHaveText(edit)
  }
  else if (input == 'Stock'){
    const col = await tableTR.locator('td').nth(2)
    await expect(col).toHaveText(edit)
  }
  else if (input == 'Costo'){
    const col = await tableTR.locator('td').nth(3)
    await expect(col).toHaveText(`$ ${edit}.00`)
  }
  else if (input == 'Precio Venta'){
    const col = await tableTR.locator('td').nth(4)
    await expect(col).toHaveText(`$ ${edit}.00`)
  }
  else if (input == 'Unidad'){
    const col = await tableTR.locator('td').nth(5)
    await expect(col).toHaveText(edit)
  }
})

Then('el campo de {string} queda vacío al no ser número válido', async function (input){
  await expect(this.page.getByLabel(input)).toHaveValue('')
})