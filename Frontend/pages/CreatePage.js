class ProductsPage {
  constructor(page) {
    this.page = page
    this.selectors = {
      createProductButton: 'button:has-text("Crear Artículo")',
      inputSKU: '#sku',
      inputDescription: '#name',
      inputActualStock: '#stock_quantity',
      inputCost: '#cost_price',
      inputSaleCost: '#sale_price',
      inputUnit: '#unit',
      saveProductButton: 'button:has-text("Guardar Cambios")',
      productNotification: '[data-in="true"]',
      productsList: 'tbody td',
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
      const value = fields[field].toString()

      if (!selector) continue

      if (field === 'Unidad de medida') {
        await this.page.selectOption(selector, { label: value })
      } else {
        await this.page.fill(selector, value)
      }
    }
  }

  async saveProduct() {
    await this.page.click(this.selectors.saveProductButton)
  }

  getMessageLocator() {
    return this.page.locator(this.selectors.productNotification)
  }

  async checkCreatedProduct(sku) {
    const productCell = this.page.locator(this.selectors.productsList, {
      hasText: sku,
    })
    await productCell.waitFor({ state: 'visible' })
    return await productCell.isVisible()
  }
}

module.exports = { ProductsPage }
