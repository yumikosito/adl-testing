class DeleteSimplePage {
  constructor(page) {
    this.page = page
    this.selectors = {
      deleteButton: 'button[aria-label="Eliminar"]',
      productsList: 'tbody tr',
      notification: '[data-in="true"]',
      spinnerTable: '.spinner',
    }
  }

  async deleteProduct(name) {
    const row = this.page.locator(this.selectors.productsList, {
      hasText: name,
    })
    const deleteBtn = row.locator('button:has(svg)').nth(1)
    await deleteBtn.click()
  }

  async getNotification() {
    return this.page.locator(this.selectors.notification)
  }

  async getModal() {
    const modal = await this.page.locator('.modal, [role="dialog"]')
    return await modal.isVisible()
  }

  async waitForSpinner() {
    await this.page
      .locator(this.selectors.spinnerTable)
      .waitFor({ state: 'detached' })
    await this.page.waitForTimeout(5000)
  }

  async productExists(name) {
    const product = this.page.locator(this.selectors.productsList, {
      hasText: name,
    })

    const count = await product.count()
    return count > 0
  }
}

module.exports = DeleteSimplePage
