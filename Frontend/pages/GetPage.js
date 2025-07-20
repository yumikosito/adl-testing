class GetPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      entButton: (page) => page.locator('span:has-text("Entidades")'),
      productsButton: (page) => page.getByRole('link', { name: 'Artículos' }),
      tableRow:'tr[.cursor-pointer hover:bg-gray-50]'
      
    }
  }

 async clickSelector(selector){
  await selector(this.page).click();
}

  async goToProducts() {
    await this.clickSelector(this.selectors.entButton);
    await this.clickSelector(this.selectors.productsButton);
    // await this.page.locator('span', { hasText: 'Entidades' }).click();
    // await this.page.getByRole('link', { name: 'Artículos' }).click();
  }

}
module.exports = GetPage;