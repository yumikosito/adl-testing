const { Given, When, Then, AfterStep } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let tableTR;

Given('el usuario ingresó con email {string} y contraseña {string}, esta en Listado de Articulos y el producto existe', async function (username, password) {
  await this.loginPage.login(username,password)
  await this.getPage.goToProducts()
  await expect(this.page).toHaveURL(/.*\/articulos/)

})

When ('se ingresa al detalle del producto {string} y se hace click en el boton editar', async function (product) {
  const productTr = await this.page.locator(`tbody tr:has(td:nth-child(2):text("${product}"))`);
  tableTR = productTr

  await productTr.click();
  await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
  await expect(this.page.locator('h3')).toHaveText(`Artículo: ${product}`)
  await this.putPage.clickEdit()
  await this.page.locator('text=Cargando detalle del artículo').waitFor({ state: 'detached' });
  await expect(this.page.getByLabel('Descripción')).toHaveValue(product)
})

When ('se modifica el campo de {string} a {string}', async function (input,edit) {
  await this.page.getByLabel(input).fill(edit)
  await this.putPage.clickSave()
})

When ('se modifica el campo de Unidad de medida a {string}', async function (edit) {
  await this.page.selectOption('#unit', edit);
  await this.putPage.clickSave()
})


Then ('aparece un mensaje de edición exitosa de {string} y en el sistema cambia el campo de {string} a {string}', async function (item, input, edit) {
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




// When('se modifica el {string} a {string}', async function (input, edit){
//   const inputField = this.page.getByLabel(input);

// })

// Then('aparece un mensaje de error en {string} de tipo inválido', async function (input){
//   const inputField = this.page.getByLabel(input);
//   await this.putPage.clickSave();
//   const isValid = await inputField.evaluate(el => el.checkValidity());
//   expect(isValid).toBe(false);
//   await expect(this.page).toHaveURL(/.*\/editar/)

// })
