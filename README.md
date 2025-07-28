# adl-testing / Proyecto de Evaluación - Test Automation Engineer

## Español

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

**Instalación:**

```bash
cd Backend
npm install
```

**Ejecución de pruebas:**

```bash
npm test
```

**Hallazgos recientes:**

- 6 tests fallidos, 20 pasaron (ver `jest_html_reporters.html` para detalles)
- Ejemplos de errores:
  - Esperado status 500, recibido 400/422 en validación de campos requeridos
  - El backend no valida correctamente datos ausentes o formatos inválidos
  - Pruebas de duplicados y validaciones de email fallan

---

## Frontend

**Tecnologías:** Node.js, Playwright, Cucumber.js, cucumber-html-reporter

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

- Todos los escenarios fallan en el paso de login por error de navegación: `Protocol error (Page.navigate): Cannot navigate to invalid URL`
- Esto afecta todos los flujos: creación, edición, eliminación y consulta de productos.
- Revisar la configuración de la URL base en los Page Objects.

---

## Mobile

**Tecnologías:** Node.js, Jest, WebdriverIO, Appium, Allure

**Estructura:**

```
Mobile/
├── jest.config.js
├── package.json
├── reports/
├── test/
│   ├── pages/ (Page Objects)
│   ├── specs/ (tests)
│   └── utils/ (capabilities, selectores)
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

**Buenas prácticas y problemas comunes:**

- Centraliza selectores en `selectors.js`.
- Usa Page Objects para mantener la lógica de interacción.
- Prepara datos de prueba en cada test.
- No subas `node_modules/`, `reports/`, `allure-results/` ni `.env`.
- Si ves errores de `dynamic import callback`, ejecuta:
  ```
  node --experimental-vm-modules ./node_modules/jest/bin/jest.js test/specs --runInBand
  ```

All Rights Reserved "BigTeam2025 - TAE"
