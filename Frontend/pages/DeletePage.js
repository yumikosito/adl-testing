const { expect } = require('@playwright/test');

class DeletePage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            searchInput: 'input[placeholder="Buscar"]',              
            toastMessage: '.Toastify__toast'
        }
    }

    async searchProduct(nombre) {
        // Esperar a que la página esté completamente cargada
        await this.page.locator('.spinner').waitFor({ state: 'detached' });
        
        // Buscar el campo de búsqueda - si no existe, lanzar error específico
        const searchInput = this.page.locator('input[placeholder="Buscar"]');
        await expect(searchInput).toBeVisible({ 
            timeout: 5000,
            message: 'Campo de búsqueda no encontrado en la página de artículos'
        });
        
        await searchInput.fill(nombre);
        await this.page.waitForTimeout(1000); // Espera para que se actualicen los resultados
    }

    async clickDeleteButton(nombre) {
        // Buscar la fila que contiene el producto específico
        const productRow = this.page.locator(`tbody tr:has(td:text("${nombre}"))`);
        
        // Verificar que el producto existe en la tabla
        await expect(productRow).toBeVisible({ 
            timeout: 5000,
            message: `El producto "${nombre}" no se encontró en la tabla de productos`
        });
        
        // Hacer clic en el botón eliminar de esa fila específica
        const deleteButton = productRow.locator('button:has-text("Eliminar")');
        await expect(deleteButton).toBeVisible({
            message: `El botón "Eliminar" no está visible para el producto "${nombre}"`
        });
        
        await deleteButton.click();
        await this.page.waitForTimeout(1000); // Espera para que se procese la eliminación
    }

    async confirmDeletion(nombre) {
        // Verificar que el producto ya no aparece en la tabla después de la eliminación
        const productRow = this.page.locator(`tbody tr:has(td:text("${nombre}"))`);
        
        await expect(productRow).toHaveCount(0, { 
            timeout: 10000,
            message: `El producto "${nombre}" aún aparece en la tabla después de la eliminación`
        });
    }

    async verifyDeleteMessage(mensaje) {    
        // Esperar a que aparezca el toast de notificación
        const toastMessage = this.page.locator(this.selectors.toastMessage);
        await expect(toastMessage).toBeVisible({ 
            timeout: 10000,
            message: `No se mostró ninguna notificación de eliminación`
        });
        
        // Verificar que el mensaje contiene el texto esperado
        await expect(toastMessage).toContainText(mensaje, {
            timeout: 5000,
            message: `La notificación no contiene el mensaje esperado: "${mensaje}"`
        });
    }

}

module.exports = { DeletePage };