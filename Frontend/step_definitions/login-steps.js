const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('el usuario esta previamente registrado y en la pagina de login', async function () {
  await this.page.goto('/login');
  await expect(this.page).toHaveURL(/.*\/login/)
})

When ('el usuario ingresa {string} en el campo de email', async function (email) {
  if (email === '<email>') email = this.parameters.credentials.email;
  await this.loginPage.fillEmail(email)
})

When ('el usuario ingresa {string} en el campo de contraseña', async function (password) {
  if (password === '<password>') password = this.parameters.credentials.password;
  await this.loginPage.fillPassword(password)
})

Then('se debe mostrar el dashboard del sistema', async function () {
  await this.loginPage.clickLogin()
  await this.page.waitForTimeout(5000);
  await expect(this.page).toHaveURL(/.*\/dashboard/);
  await expect(this.page.locator('h1')).toHaveText('Dashboard')
})

Then('se debe mostrar una alerta de {string}', async function(text){
  if (text == "Las credenciales proporcionadas son incorrectas"){
    await this.loginPage.clickLogin()
  }
  else if( text == "Si existe una cuenta con ese email, recibirás un correo con las instrucciones."){
    await this.loginPage.clickRecover()
  }
  await this.page.waitForTimeout(5000);
  await expect(this.page.locator('.Toastify__toast-container')).toHaveText(text);
})

Then('se debe mostrar un mensaje de que se requiere llenado de {string}',async function (id) {
  await this.loginPage.clickLogin()
  const input = this.page.locator(`input#${id}`);
  const isValid = await input.evaluate(item => item.checkValidity());
  expect(isValid).toBe(false);
  await this.page.waitForTimeout(5000);
})

When('el usuario ingresa a la página de Recuperar contraseña', async function (){
  await this.page.getByRole('link', { name: '¿Olvidaste tu contraseña?' }).click();
  await expect(this.page).toHaveURL(/.*\/recuperar-password/)
})

