class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      emailInput: '#email',
      passwordInput: '#password',
    }

  }

  async fillField(selector, value ) {
    await this.page.locator(selector).fill(value)
  }

  async fillEmail(value){
    await this.fillField(this.selectors.emailInput,value)
  }

  async fillPassword(value) {
    await this.fillField(this.selectors.passwordInput, value)

  }
  async clickLogin() {
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
  }

  async login(email, password) {
    await this.page.goto('/login');
    await this.fillEmail(email)
    await this.page.waitForTimeout(500)
    await this.fillPassword(password)
    await this.page.waitForTimeout(500)
    await this.clickLogin()
  }

  async clickLogout() {
    await this.page.getByRole('button', { name: 'Cerrar Sesión' }).click();
  }

  async clickRecover() {
    await this.page.getByRole('button', { name: 'Solicitar Enlace' }).click();
  }

}

module.exports = LoginPage;