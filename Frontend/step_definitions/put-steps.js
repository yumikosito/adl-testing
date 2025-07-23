const { Given, When, Then, AfterStep } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let tableTR;

Given('el usuario ingresó con email {string} y contraseña {string}, esta en Listado de Articulos y el producto existe', async function (username, password) {
  await this.loginPage.login(username,password)
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)

})

When ('se ingresa al detalle del producto {string} y se hace click en el boton editar', async function (product) {
  await this.page.locator('.spinner').waitFor({ state: 'detached'});
  await this.page.waitForTimeout(2000);
  const isVisible = await this.page.locator('button', { hasText: 'Código' }).isVisible();
  
  if (isVisible) {
    const productTr = await this.page.locator(`tbody tr:has(td:nth-child(1):text-is("${product}"))`);
    const productName = await productTr.locator('td:nth-child(2)').innerText();
    
    tableTR = productTr
    await productTr.click();
    await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
    
    await expect(this.page.locator('h3')).toHaveText(`Artículo: ${productName}`)
    await this.putPage.clickEdit()
    await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
    await expect(this.page.getByLabel('Código')).toHaveValue(product)

  } else {
    expect(this.page.getByText('No hay artículos')).toBe(true)
    expect(this.page.locator('p')).toHaveText('Empieza por crear el primer registro')
  }
  

})

When ('se modifica el campo de {string} a {string}', async function (selectInput,edit) {
  const input = await this.page.getByLabel(selectInput)
  await input.fill('')
  await input.click()
  for (const char of edit) {
    await input.press(char);
  }
})

When ('se modifica el campo de Unidad de medida a {string}', async function (edit) {
  await this.page.selectOption('#unit', edit);
  await this.putPage.clickSave()
})


Then ('aparece un mensaje de edición exitosa de {string} y en el sistema cambia el campo de {string} a {string}', async function (item, input, edit) {
  await this.putPage.clickSave()
  await this.page.locator('.Toastify__toast-container')
  await expect(this.page.locator('.Toastify__toast-container')).toHaveText(`Artículo \"${item}\" actualizado con éxito!`)
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

  tableTR=''
})


Then('el campo de {string} queda vacío al no permitir valores no numéricos', async function (input){
  const inputField = this.page.getByLabel(input);
  expect(inputField).toHaveValue('')

})

Then('el campo de {string} muestra un mensaje de requisito', async function (input){
  await this.putPage.clickSave()
  const inputField = this.page.getByLabel(input);
  const isValid = await inputField.evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
  await expect(this.page).toHaveURL(/.*\/editar/)
})


