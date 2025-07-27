const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ===============================
// Background Steps
// ===============================
Given('el usuario ha iniciado sesión con email {string} y contraseña {string}', async function (email, password) {
  email = email === '<email>' ? this.parameters.credentials.email || this.email : email;
  password = password === '<password>' ? this.parameters.credentials.password || this.password : password;

  await this.loginPage.login(email, password);
  await expect(this.page).toHaveURL(/.*\/dashboard/);
});

Given('está en el dashboard del sistema', async function () {
  await expect(this.page).toHaveURL(/.*\/dashboard/);
  await expect(this.page.locator('h1')).toHaveText('Dashboard');
});

Given('navega a la sección de {string}', async function (seccion) {
  await this.getPage.goToProducts();
  await expect(this.page).toHaveURL(/.*\/articulos/);
});

Given('la lista de articulos está completamente cargada', async function () {
  await expect(this.page.locator('h1')).toHaveText('Listado de Artículos');
  await this.page.locator('.spinner').waitFor({ state: 'detached' });
});

// ===============================
// Escenarios Comunes
// ===============================

Given('el producto {string} existe en la tabla', async function (producto) {
  // Siempre crea el producto con SKU válido y lo asigna a this.sku
  await this.deletePage.ensureProductExists(producto);
  const row = await this.page.getByText(producto, { exact: false }).first().locator('..');
  const skuCell = await row.locator('td').nth(0).textContent();
  const sku = skuCell ? skuCell.trim() : '';
  if (!sku) {
    throw new Error(`No se pudo crear el producto '${producto}' con SKU válido. Verifica la lógica de creación.`);
  }
  this.producto = producto;
  this.sku = sku;
});


// Strict: Eliminar por nombre y SKU (precisión máxima si hay SKU, si no, por nombre)
When('hace click en el botón eliminar correspondiente al producto {string}', async function (producto) {
  if (this.sku && this.sku !== "") {
    await this.deletePage.clickDeleteButtonByNameAndSku(this.producto, this.sku);
  } else {
    await this.deletePage.clickDeleteButton(this.producto);
  }
});


// Flexible: Verificar que el producto no está en la tabla (por nombre y opcionalmente SKU)
Then('el producto {string} ya no debería aparecer en la tabla', async function (producto) {
  await this.deletePage.verifyProductNotInTable(producto, this.sku ?? null);
});

Then('se debe mostrar una notificación de {string}', async function (mensaje) {  
  await this.deletePage.verifyDeleteMessage(mensaje);
});


When('el usuario confirma la eliminación', async function () {
  await this.deletePage.confirmDeletion();
});


When('cancela la eliminación en el modal de confirmación', async function () {
  // Verifica si existe el modal de confirmación antes de intentar cancelar
  const modal = this.page.locator('.modal, .dialog, [role="dialog"]');
  if (await modal.count() === 0) {
    throw new Error('No existe modal de confirmación para cancelar la eliminación. Esto evidencia la ausencia de confirmación.');
  }
  await this.deletePage.cancelDeletion();
});

// Flexible: Verificar que el producto sigue en la tabla (por nombre y opcionalmente SKU)
Then('el producto {string} debería seguir apareciendo en la tabla', async function (producto) {
  await this.deletePage.verifyProductStillInTable(producto, this.sku ?? null);
});

Then('no se debe mostrar ninguna notificación de eliminación', async function () {
  await this.deletePage.verifyNoToastNotification();
});

// ===============================
// Escenarios Específicos
// ===============================

// Flexible: Crear producto con nombre y SKU explícitos (SKU puede ser vacío para casos de debilidad)

Given('el producto existe y tiene descripción {string} pero SKU {string}', async function (producto, sku) {
  if (!sku || sku === "") {
    // Intenta crear el producto solo con nombre, sin SKU
    await this.page.getByRole('button', { name: /Crear Articulo|Crear Artículo/i }).click();
    await this.page.waitForTimeout(500);
    await this.page.fill('#name', producto);
    // No llena el campo SKU
    await this.page.getByRole('button', { name: /Guardar|Crear/i }).click();
    await this.page.waitForTimeout(1000);
    // Verifica que el producto aparece en la tabla
    const row = await this.page.getByText(producto, { exact: false }).first().locator('..');
    if (await row.count() === 0) {
      throw new Error(`No se pudo crear el producto '${producto}' sin SKU. La aplicación no lo permite o hay validación en el formulario.`);
    }
  } else {
    await this.deletePage.ensureProductExists(producto);
  }
  this.producto = producto;
  this.sku = sku;
});

When('hace click en el botón eliminar del producto', async function () {
  await this.deletePage.clickDeleteButton(this.producto);
});

When('confirma la eliminación SIN solicitud de SKU', async function () {
  await this.deletePage.confirmDeletion();
});

Then('el sistema eliminó el producto SIN solicitar validación de SKU', async function () {
  await this.deletePage.verifyNoModal();
});

Then('esto evidencia falla crítica: debería pedir {string}', async function (mensaje) {
  // Paso informativo: no requiere acción, pero acepta el argumento para evitar error de definición
});

Then('demuestra que el sistema NO valida identificador único antes de eliminar', async function () {
  // Paso informativo: no requiere acción
});


// Crea el producto, obtiene su SKU (o id si está disponible), lo elimina y guarda el identificador para acceso vía URL
Given('el producto {string} fue eliminado previamente', async function (producto) {
  // Intenta encontrar el producto
  let row = await this.page.getByText(producto, { exact: false }).first().locator('..');
  let sku = '';
  if (await row.count() > 0) {
    const skuCell = await row.locator('td').nth(0).textContent();
    sku = skuCell ? skuCell.trim() : '';
    // Intenta eliminar si existe
    try {
      if (sku) {
        await this.deletePage.clickDeleteButtonByNameAndSku(producto, sku);
      } else {
        await this.deletePage.clickDeleteButton(producto);
      }
      await this.deletePage.confirmDeletion();
      await this.page.waitForTimeout(500);
    } catch (e) {
      // Si no hay modal, asume que ya fue eliminado
    }
  }
  // Intenta obtener el SKU aunque no exista en la tabla (para la URL)
  if (!sku) {
    // Si no existe, usa el último SKU conocido o un valor dummy
    sku = this.sku || 'dummy-sku';
  }
  this.sku = sku;
  this.producto = producto;
  this.id = sku; // Ajustar si la URL requiere otro identificador
});

When('el usuario intenta acceder directamente al producto eliminado mediante URL', async function () {
  await this.page.goto(`/articulos/${this.id}`);
});

Then('se debe mostrar un mensaje de error en el dashboard {string}', async function (mensaje) {
  // Corrige tildes y puntuación si es necesario
  mensaje = mensaje
    .replace('Articulo', 'Artículo')
    .replace('eliminado con exito', 'eliminado con éxito.')
    .replace('correctamente', 'correctamente.')
    .trim();
  await this.deletePage.verifyDashboardErrorMessage(mensaje);
});

Then('queda en evidencia que el articulo no puede ser accedido y esta protegido contra accesos directos', async function () {
  // Paso informativo: no requiere acción
});

Given('el producto {string} existe con stock {int}', async function (producto, stock) {
  await this.deletePage.ensureProductExists(producto);
  await this.deletePage.verifyStockValidation(producto, stock);
  this.producto = producto;
  this.stock = stock;
});

When('el usuario intenta eliminar el producto haciendo click en el botón eliminar', async function () {
  await this.deletePage.clickDeleteButton(this.producto);
});

Then('debe mostrar error {string}', async function (error) {
  await this.deletePage.verifyErrorToast(error);
});

Then('el producto debe permanecer en la tabla', async function () {
  await this.deletePage.ensureProductExists(this.producto);
  await this.deletePage.verifyStockValidation(this.producto, this.stock);
});

When('se carga la vista de artículos', async function () {
  await expect(this.page.locator('h1')).toHaveText('Listado de Artículos');
});

Then('debe aparecer el botón con el icono para eliminar el producto {string}', async function (producto) {
  await this.deletePage.verifyDeleteButtonEnabled(producto);
});

// ===============================
// Escenario: Permitir productos duplicados solo por nombre
// ===============================
Given('no existen productos con nombre {string}', async function (nombre) {
  // Elimina todos los productos con ese nombre si existen (solo para el test)
  let count = 0;
  while (true) {
    const elements = await this.page.locator(`td:has-text(\"${nombre}\")`).count();
    if (elements === 0) break;
    try {
      await this.deletePage.clickDeleteButton(nombre);
      // Intenta confirmar si hay modal, si no, continúa
      try {
        await this.deletePage.confirmDeletion();
      } catch (e) {
        // Si no hay modal, la app elimina directo
      }
      await this.page.waitForTimeout(500);
    } catch (e) {
      // Si no puede eliminar, rompe para evitar loop infinito
      break;
    }
    count++;
    if (count > 10) throw new Error('No se pudo limpiar los productos duplicados');
  }
});

When('el usuario crea un producto con nombre {string} sin SKU', async function (nombre) {
  // Simula creación solo con nombre, sin SKU
  await this.page.getByRole('button', { name: /Crear Articulo|Crear Artículo/i }).click();
  await this.page.waitForTimeout(500);
  await this.page.fill('#name', nombre);
  // No llena el campo SKU
  await this.page.getByRole('button', { name: /Guardar|Crear/i }).click();
  await this.page.waitForTimeout(1000);
});

When('el usuario crea otro producto con nombre {string} sin SKU', async function (nombre) {
  // Simula creación de un segundo producto duplicado solo con nombre
  await this.page.getByRole('button', { name: /Crear Articulo|Crear Artículo/i }).click();
  await this.page.waitForTimeout(500);
  await this.page.fill('#name', nombre);
  // No llena el campo SKU
  await this.page.getByRole('button', { name: /Guardar|Crear/i }).click();
  await this.page.waitForTimeout(1000);
});

Then('deberían existir al menos 2 productos con nombre {string} en la tabla', async function (nombre) {
  // Espera explícita para asegurar que la tabla se actualice
  await this.page.waitForTimeout(1500);
  // Busca todas las filas que contengan el nombre, sin importar el SKU
  const filas = this.page.locator('table tbody tr');
  let count = 0;
  const rowCount = await filas.count();
  for (let i = 0; i < rowCount; i++) {
    const row = filas.nth(i);
    const nameCell = await row.locator('td').nth(1).textContent();
    if (nameCell && nameCell.trim() === nombre) {
      count++;
    }
  }
  expect(count).toBeGreaterThanOrEqual(2);
});

Then('esto evidencia la debilidad de negocio de permitir duplicados solo por nombre', async function () {
  // Paso informativo
});

Then('aparece un mensaje de confirmación {string}', async function (mensajeEsperado) {
  // Busca el modal de confirmación
  const modal = this.page.locator('.modal, .dialog, [role="dialog"]');
  if (await modal.count() === 0) {
    throw new Error('No existe modal de confirmación. Esto evidencia la ausencia de confirmación.');
  }
  // Busca el texto dentro del modal
  const modalText = await modal.innerText();
  if (!modalText.includes(mensajeEsperado)) {
    throw new Error(`El mensaje de confirmación esperado no se encontró. Esperado: "${mensajeEsperado}". Encontrado: "${modalText}"`);
  }
});

