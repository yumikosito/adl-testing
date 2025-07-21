class GetPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      entButton: (page) => page.locator('span:has-text("Entidades")'),
      productsButton: (page) => page.getByRole('link', { name: 'Artículos' }),
      
    }
  }

  async clickSelector(selector){
    await selector(this.page).click();
  }

  async goToProducts() {
    await this.clickSelector(this.selectors.entButton);
    await this.clickSelector(this.selectors.productsButton);
    await this.page.waitForTimeout(500)
  }


}
module.exports = GetPage;