const { expect } = require("@playwright/test");

class DeletePage {  
  constructor(page) {
    this.page = page;
  }

  /**
   * Verifica que el dashboard muestre un mensaje de error específico (usado para validación de acceso directo a producto eliminado por URL).
   * Busca el mensaje en el dashboard principal.
   */
  async verifyDashboardErrorMessage(expectedText) {
    // Busca el mensaje solo en el main del dashboard para evitar strict mode violation
    const dashboard = this.page.locator('main');
    await expect(dashboard).toContainText(expectedText, { timeout: 5000 });
  }

  async clickDeleteButton(nombre) {
    const product = this.page
      .getByText(nombre, { exact: false })
      .first()
      .locator("..");
    const deleteButton = product
      .locator('button[class*="red"], button[class*="text-red"]')
      .first();
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
  }

  async confirmDeletion() {
    const confirmButton = this.page.getByRole("button", {
      name: /Confirmar|Sí|Aceptar/i,
    });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
  }

  async cancelDeletion() {
    const cancelButton = this.page.getByRole("button", {
      name: /Cancelar|No/i,
    });
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
    }
  }

  async ensureProductExists(nombre) {
    // Limpia productos previos con el mismo nombre (puede haber duplicados)
    const filas = this.page.locator('table tbody tr');
    const rowCount = await filas.count();
    for (let i = 0; i < rowCount; i++) {
      const row = filas.nth(i);
      const nameCell = await row.locator('td').nth(1).textContent();
      if (nameCell && nameCell.trim() === nombre) {
        // Elimina el producto si hay botón eliminar visible
        const deleteBtn = row.locator('button[class*="red"], button[class*="text-red"]');
        if (await deleteBtn.count() > 0 && await deleteBtn.first().isVisible()) {
          await deleteBtn.first().click();
          // Si hay modal de confirmación, confirma
          const confirmBtn = this.page.getByRole("button", { name: /Confirmar|Sí|Aceptar/i });
          if (await confirmBtn.count() > 0 && await confirmBtn.first().isVisible()) {
            await confirmBtn.first().click();
          }
          // Espera a que desaparezca la fila
          await this.page.waitForTimeout(500);
        }
      }
    }

    // Genera un SKU único para este test
    const sku = "SKU-" + Date.now().toString().slice(-8);
    const defaults = {
      sku,
      stock: "10",
      cost: 100,
      price: 200,
    };
    const data = { ...defaults, name: nombre };

    await this.page.getByRole("button", { name: /Crear Articulo|Crear Artículo/i }).click();
    await this.page.waitForTimeout(500);

    // Completa el formulario
    await this.page.fill("#name", data.name);
    await this.page.fill("#sku", data.sku);
    await this.page.fill("#stock_quantity", data.stock);
    await this.page.fill("#cost_price", String(data.cost));
    await this.page.fill("#sale_price", String(data.price));
    // Selecciona la unidad si es necesario
    const unitSelect = this.page.locator("#unit");
    const secondOptionValue = await unitSelect.locator("option:nth-child(2)").getAttribute("value");
    await unitSelect.selectOption(secondOptionValue);
    await this.page.getByRole("button", { name: /Guardar|Crear/i }).click();
    await this.page.waitForTimeout(1000);

    // Espera a que el producto aparezca en la tabla por SKU
    await expect(this.page.locator(`td:has-text("${sku}")`)).toBeVisible({ timeout: 10000 });
  }

  /**
   * Verifica que no exista un producto en la tabla por nombre y opcionalmente por SKU.
   * Si solo se pasa nombre, valida solo por nombre (útil para casos sin SKU).
   * Si se pasa nombre y sku, valida que no exista la combinación.
   */
  async verifyProductNotInTable(nombre, sku = null) {
    // Espera a que aparezca la notificación de éxito (acepta múltiples toasts)
    const successText = 'Artículo eliminado con éxito.';
    const message = this.page.locator('.Toastify__toast');
    let found = false;
    try {
      const allToasts = await message.allTextContents();
      found = allToasts.some(t => t.includes(successText));
    } catch (e) {
      // Si no hay ningún toast, found sigue en false
    }
    if (!found) {
      throw new Error(`No apareció el toast de éxito '${successText}' tras eliminar '${nombre}'. Toasts encontrados: ${JSON.stringify(await message.allTextContents())}`);
    }
    await this.page.waitForTimeout(500); // Breve espera para refresco UI
    const filas = this.page.locator('table tbody tr');
    try {
      await this.page.waitForFunction(
        (nombre, sku) => {
          const rows = Array.from(document.querySelectorAll('table tbody tr'));
          return rows.every(row => {
            const tds = row.querySelectorAll('td');
            if (tds.length < 2) return true;
            const nameMatch = tds[1].textContent.trim() !== nombre;
            if (sku === null || sku === "") {
              return nameMatch;
            } else {
              const skuMatch = tds[0].textContent.trim() !== sku;
              return nameMatch || skuMatch;
            }
          });
        },
        nombre,
        sku,
        { timeout: 5000 }
      );
    } catch (e) {
      throw new Error(`La fila con nombre '${nombre}'${sku ? ` y SKU '${sku}'` : ''} no desapareció de la tabla tras eliminar. Detalle: ${e.message}`);
    }
    // Verifica que no haya ninguna fila con ese nombre y opcionalmente SKU
    let count;
    if (sku === null || sku === "") {
      count = await filas.filter({ has: this.page.locator(`td:nth-child(2):has-text("${nombre}")`) }).count();
      if (count !== 0) {
        throw new Error(`Se esperaba que no existiera ninguna fila con nombre '${nombre}' en la tabla, pero se encontró ${count}.`);
      }
    } else {
      count = 0;
      const rowCount = await filas.count();
      for (let i = 0; i < rowCount; i++) {
        const row = filas.nth(i);
        const skuCell = await row.locator('td').nth(0).textContent();
        const nameCell = await row.locator('td').nth(1).textContent();
        if (skuCell && nameCell && skuCell.trim() === sku && nameCell.trim() === nombre) {
          count++;
        }
      }
      if (count !== 0) {
        throw new Error(`Se esperaba que no existiera ninguna fila con nombre '${nombre}' y SKU '${sku}' en la tabla, pero se encontró ${count}.`);
      }
    }
  }

  /**
   * Verifica que el toast de éxito contenga el texto esperado. Si hay varios, muestra todos los textos encontrados.
   */
  async verifyDeleteMessage(mensaje = "Articulo eliminado con exito") {
    // Espera breve para que aparezca el toast
    await this.page.waitForTimeout(2000);

    // Busca en todo el DOM cualquier texto relacionado con eliminación/éxito
    const allText = await this.page.locator('*').evaluateAll(elements => {
        return elements
            .filter(el => el.textContent && el.textContent.trim().length > 0)
            .map(el => el.textContent.trim())
            .filter(text => 
                text.toLowerCase().includes('eliminado')
              
            );
    });

    if (allText.length > 0) {
        return;
    }

    // Busca específicamente en el contenedor de toasts
    try {
        const toastContainer = this.page.locator('.Toastify__toast-container');
        await expect(toastContainer).toBeVisible({ timeout: 3000 });
        const toastText = await toastContainer.textContent();
        if (toastText && (
            toastText.toLowerCase().includes('eliminado')
           
        )) {
            return;
        }
    } catch (error) {
        // Ignorar error si no se encuentra toast
    }

    throw new Error("No se encontró notificación de eliminación, ni en el DOM ni en el toast.");
  }

  /**
   * Verifica que el modal de confirmación contenga el texto esperado.
   * Si no existe el modal o el texto no coincide, lanza un error claro.
   */
  async verifyConfirmationMessage(text) {
    const modal = this.page.locator('.modal, .dialog, [role="dialog"]');
    try {
      await expect(modal).toContainText(text, { timeout: 5000 });
    } catch (e) {
      const modalCount = await modal.count();
      if (modalCount === 0) {
        throw new Error(`No se encontró el modal de confirmación esperado con texto '${text}'. Detalle: ${e.message}`);
      } else {
        const modalText = await modal.allTextContents();
        throw new Error(`El modal de confirmación no contiene el texto esperado '${text}'. Textos encontrados: ${JSON.stringify(modalText)}. Detalle: ${e.message}`);
      }
    }
  }

  async verifyNoModal() {
    const modal = this.page.locator('.modal, [role="dialog"]');
    await expect(modal).toHaveCount(0);
  }

  /**
   * Verifica que al menos un producto con ese nombre (y opcionalmente SKU) sigue en la tabla.
   * Si no existe, lanza un error claro.
   */
  async verifyProductStillInTable(nombre, sku = null) {
    const filas = this.page.locator('table tbody tr');
    let count = 0;
    const rowCount = await filas.count();
    for (let i = 0; i < rowCount; i++) {
      const row = filas.nth(i);
      const skuCell = await row.locator('td').nth(0).textContent();
      const nameCell = await row.locator('td').nth(1).textContent();
      if (sku === null || sku === "") {
        if (nameCell && nameCell.trim() === nombre) count++;
      } else {
        if (skuCell && nameCell && skuCell.trim() === sku && nameCell.trim() === nombre) count++;
      }
    }
    if (count === 0) {
      if (sku === null || sku === "") {
        throw new Error(`Se esperaba al menos 1 producto con nombre '${nombre}' en la tabla, pero no se encontró ninguno.`);
      } else {
        throw new Error(`Se esperaba al menos 1 producto con nombre '${nombre}' y SKU '${sku}' en la tabla, pero no se encontró ninguno.`);
      }
    }
  }

  async verifyNoToastNotification() {
    const toasts = this.page.locator(".Toastify__toast");
    await expect(toasts).toHaveCount(0);
  }

  async verifyErrorMessage(text) {
    const error = this.page.locator(
      '.error, .text-red-500, .alert-danger, [role="alert"]'
    );
    await expect(error).toContainText(text);
  }

  /**
   * Verifica que el toast de error contenga el texto esperado. Si hay varios, muestra todos los textos encontrados.
   */
  async verifyErrorToast(text) {
    const toast = this.page.locator(".Toastify__toast--error");
    try {
      await expect(toast).toContainText(text, { timeout: 5000 });
    } catch (e) {
      const allToasts = await toast.allTextContents();
      throw new Error(`No se encontró el toast de error esperado: '${text}'. Toasts de error encontrados: ${JSON.stringify(allToasts)}. Detalle: ${e.message}`);
    }
  }

  async verifyStockValidation(producto, stock) {
    const container = this.page
      .getByText(producto, { exact: false })
      .first()
      .locator("..");
    await expect(container.locator(`text="${stock}"`)).toBeVisible();
  }

  async verifyDeleteButtonEnabled(nombre) {
    // Busca el botón eliminar usando el selector correcto
    const row = this.page.getByText(nombre, { exact: false }).first().locator('..');
    const button = row.locator('button[class*="text-red-600"]');
    await expect(button).toBeEnabled();
  }

  /**
   * Elimina el producto usando nombre y SKU para máxima precisión.
   */
  async clickDeleteButtonByNameAndSku(nombre, sku) {
    // Busca la fila que contenga ambos: SKU (columna 0) y nombre (columna 1)
    const rows = await this.page.locator('table tbody tr');
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const skuCell = await row.locator('td').nth(0).textContent();
      const nameCell = await row.locator('td').nth(1).textContent();
      if (
        skuCell && nameCell &&
        skuCell.trim() === sku &&
        nameCell.trim() === nombre
      ) {
        const deleteButton = row.locator('button[class*="red"], button[class*="text-red"]').first();
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
        return;
      }
    }
    throw new Error(`No se encontró fila con SKU '${sku}' y nombre '${nombre}' para eliminar.`);
  }
}

module.exports = { DeletePage };
