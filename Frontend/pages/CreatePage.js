class ProductsPage {
  constructor(page) {
    this.page = page
    this.selectors = {
      createProductButton: 'button:has-text("Crear Articulo")',
      inputSKU: '#sku',
      inputDescription: '#name',
      inputActualStock: '#stock_quantity',
      inputCost: '#cost_price',
      inputSaleCost: '#sale_price',
      inputUnit: '#unit',
      saveProductButton: 'button:has-text("Guardar Cambios")',
      successMessage: '[data-in="true"]',
      productsList: 'tbody tr',
    }
  }

  async createProduct() {
    await this.page.click(this.selectors.createProductButton)
  }

  async fillForm(fields) {
    const fieldMap = {
      'Código SKU': this.selectors.inputSKU,
      'Descripción': this.selectors.inputDescription,
      'Stock actual': this.selectors.inputActualStock,
      'Costo': this.selectors.inputCost,
      'Precio de venta': this.selectors.inputSaleCost,
      'Unidad de medida': this.selectors.inputUnit,
    }

    for (const field in fields) {
      const selector = fieldMap[field]
      if (selector) {
        await this.page.fill(selector, fields[field].toString())
      }
    }
  }

  async saveProduct() {
    await this.page.click(this.selectors.saveProductButton)
  }

  async getSuccessMessage() {
    await this.page.waitForSelector(this.selectors.successMessage, {
      state: 'visible',
    })
    return this.page.textContent(this.selectors.successMessage)
  }

  async getErrorMessage() {
    await this.page.waitForSelector(this.selectors.successMessage, {
      state: 'visible',
    })
    return this.page.textContent(this.selectors.errorMessage)
  }

  async checkCreatedProduct(name) {
    const product = this.page.locator(`${this.selectors.productsList}`, {
      hasText: name,
    })
    return await product.isVisible()
  }
}

module.exports = { ProductsPage }
