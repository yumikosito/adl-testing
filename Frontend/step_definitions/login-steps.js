const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('el usuario esta previamente registrado y en la pagina de login', async function () {
  await this.page.goto('/login');
  await expect(this.page).toHaveURL(/.*\/login/)
})

When ('el usuario ingresa {string} en el campo de email', async function (username) {
  if (username === '<email>') username = this.parameters.credentials.email;
  await this.loginPage.fillEmail(username)
  

})

When ('el usuario ingresa {string} en el campo de contraseña', async function (password) {
  if (password === '<password>') password = this.parameters.credentials.password;
  await this.loginPage.fillPassword(password)
  
  await this.loginPage.clickLogin()
})

Then('se debe mostrar el dashboard del sistema', async function () {
  await expect(this.page).toHaveURL(/.*\/dashboard/);
  await expect(this.page.locator('h1')).toHaveText('Dashboard')
})

Then('se debe mostrar una alerta de {string}', async function(){
  await this.page.locator('.Toastify__toast-container')
 .toHaveText('Las credenciales proporcionadas son incorrectas.')
})

Then('se debe mostrar un mensaje de que se requiere llenado de {string}',async function (id) {
  const input = this.page.locator(`input#${id}`);
  const isValid = await input.evaluate(item => item.checkValidity());
  expect(isValid).toBe(false);
})


