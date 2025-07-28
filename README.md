# Proyecto de Evaluación - Test Automation Engineer

### Introducción

Este repositorio contiene los proyectos de automatización de pruebas para la evaluación del curso de Test Automation Engineer. Incluye suites para Backend (API), Frontend (web) y Mobile (app móvil), cada una con sus propias tecnologías y comandos. El objetivo es validar los flujos principales de la aplicación proporcionada por el profesor, cubriendo casos positivos y negativos, y generando reportes de ejecución.

---

## Estructura General

```
adl-testing/
├── Backend/   # Pruebas API con Jest y Supertest
├── Frontend/  # Pruebas E2E web con Playwright y Cucumber
├── Mobile/    # Pruebas E2E mobile con WebdriverIO, Appium y Jest
```

---

## Backend

**Tecnologías:** Node.js, Jest, Supertest, jest-html-reporters

**Estructura:**

```
Backend/
├── jest.config.js
├── package.json
├── jest_html_reporters.html
├── test/
│   ├── clients.test.js
```

**Instalación:**

```bash
cd Backend
npm install
```

**Ejecución de pruebas:**

```bash
npm run test
```

**Hallazgos recientes:**

- 6 tests fallidos, 20 pasaron (ver `jest_html_reporters.html` para detalles)
- Pruebas fallidas:
  - Esperado status 500, recibido 400/422 en validación de campos requeridos
  - El backend no valida correctamente datos ausentes o formatos inválidos
  - Pruebas de duplicados y validaciones de email fallan

---

## Frontend

**Tecnologías:** Node.js, Playwright, Cucumber.js, cucumber-html-reporter

**Estructura:**

```
Frontend/
├── cucumber.js
├── playwright.config.js
├── package.json
├── reports
│   ├── cucumber-report.html
├── features/
│   ├── create.product.feature
│   ├── delete.feature
│   ├── get.feature
│   ├── login.feature
│   ├── put.feature
├── pages/
│   ├── CreatePage.js
│   ├── DeletePage.js
│   ├── GetPage.js
│   ├── LoginPage.js
│   ├── PutPage.js   
├── step_definitions/
│   ├── create-steps.js
│   ├── delete-steps.js
│   ├── get-steps.js
│   ├── login-steps.js
│   ├── put-steps.js   
├── support/
│   ├── hooks.js
│   ├── world.js   
```
**Instalación:**

```bash
cd Frontend
npm install
```

**Ejecución de pruebas:**

```bash
npx cucumber-js
```

**Hallazgos recientes:**
- 10 tests fallidos, 34 tests exitosos (ver `cucumber-report.html` para detalles)
- Pruebas fallidas:
  - Modificación a campo vacío el input de Costo.
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Modificación a string el input de Costo.
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Modificación a campo sin opción ("Selecciona") de Unidad de medida.
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Modificación a número negativo el input de Stock Actual.
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Modificación a número negativo el input de Costo.
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Modificación a número negativo el input de Precio Venta.
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Modificación a campo vacío el input de Código (SKU).
      - Resultado esperado: que no lo permita y salga mensaje "Error al guardar el artículo"
  - Mostrar mensaje de confirmación antes de eliminar producto.
      - Resultado esperado: que aparezca una confirmacion "¿Está seguro de eliminar el producto?"
  - Cancelar eliminación desde el modal de confirmacion.
      - Resultado esperado: que aparezca un boton para confirmar decisión
  - Impedir eliminación si el producto tiene stock disponible.
      - Resultado esperado: debe mostrar error "No se puede eliminar producto con stock disponible"

---

## Mobile

**Tecnologías:** Node.js, Jest, WebdriverIO, Appium, Allure

**Estructura:**

```
Mobile/
Mobile/
├── jest.config.js          
├── package.json            
├── reports/                 
├── test/
│   ├── pages/
│   │   └── ToDoPage.js      
│   ├── specs/              
│   │   ├── addTask.test.js
│   │   ├── deleteTask.test.js
│   │   ├── editTask.test.js
│   │   ├── filterTask.test.js
│   │   ├── searchTask.test.js
│   └── utils/
│       ├── capabilities.js  
│       └── selectors.js     
```

**Instalación:**

```bash
cd Mobile
npm install
```

**Ejecución de pruebas:**

```bash
npm test
```

**Reportes:**

```bash
npm run allure:report   # Genera reporte Allure
npm run allure:open     # Abre reporte Allure
```

**Hallazgos recientes:**

- Si ves errores de `dynamic import callback` ejecuta los tests con:
  ```
  node --experimental-vm-modules ./node_modules/jest/bin/jest.js test/specs --runInBand
  ```
- Si los tests aparecen duplicados o como "Unknown" en Allure, revisa que no haya archivos duplicados y que la configuración de Jest sea correcta.

All Rights Reserved "BigTeam2025 - TAE"