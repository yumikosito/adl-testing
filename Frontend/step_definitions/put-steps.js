const { Given, When, Then, AfterStep } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let tableTR;

Given('el usuario ingresó con email {string} y contraseña {string}, esta en Listado de Articulos y el producto existe', async function (email, password) {
  if (email === '<email>') email = this.parameters.credentials.email;
  if (password === '<password>') password = this.parameters.credentials.password;
  await this.loginPage.login(email,password)
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)
})


When (/^se ingresa al detalle del producto "([^"]+)" y se hace click en el boton editar$/, async function (product) {
  await this.page.locator('.spinner').waitFor({ state: 'detached'});
  await this.page.waitForTimeout(5000);
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
    await expect(this.page.locator('h3')).toHaveText('No hay artículos')
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

  tableTR=''
})


Then('el campo de {string} muestra un mensaje de requisito no válido', async function (input){
  await this.putPage.clickSave()
  await this.page.waitForTimeout(5000);

  const inputField = this.page.getByLabel(input);
  const isValid = await inputField.evaluate(item => item.checkValidity());
  expect(isValid).toBe(false);
  await expect(this.page).toHaveURL(/.*\/editar/)


})


