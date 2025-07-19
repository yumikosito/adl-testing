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
    await this.page.fillField(this.emailInput, email)
    await this.page.waitForTimeout(500)
    await this.page.fillField(this.selectors.passwordInput, password)
    await this.page.waitForTimeout(500)
    await this.page.clickLogin()
  }

}

module.exports = LoginPage;