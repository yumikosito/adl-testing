class PutPage {
  constructor(page) {
    this.page = page;
    this.selectors = {

    }
  }

  async clickEdit() {
    await this.page.getByRole('button', { name: 'Editar' }).click();
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Guardar Cambios' }).click();
  }
  

}

module.exports = PutPage