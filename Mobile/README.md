# Proyecto de Automatización de Pruebas Mobile

Este proyecto contiene una suite de pruebas automatizadas para una aplicación móvil de tareas (ToDo App), utilizando WebdriverIO, Appium y Jest. El objetivo es validar los flujos principales de la app, incluyendo casos positivos y negativos, y generar reportes de ejecución con Allure.

## Estructura del Proyecto

```
Mobile/
├── jest.config.js           # Configuración de Jest
├── package.json             # Dependencias y scripts
├── .gitignore               # Exclusiones para git
├── reports/                 # Reportes generados (Allure, HTML, etc.)
├── test/
│   ├── pages/
│   │   └── ToDoPage.js      # Page Object principal
│   ├── specs/               # Archivos de pruebas (cada flujo en un archivo)
│   │   ├── addTask.test.js
│   │   ├── deleteTask.test.js
│   │   ├── editTask.test.js
│   │   ├── filterTask.test.js
│   │   ├── searchTask.test.js
│   └── utils/
│       ├── capabilities.js  # Configuración de Appium
│       └── selectors.js     # Selectores centralizados
```

## Tecnologías y dependencias principales
- **Node.js**
- **Jest**: Framework de testing
- **WebdriverIO**: Automatización de UI
- **Appium**: Automatización de apps móviles
- **Allure**: Reportes de pruebas

## Instalación
1. Clona el repositorio o copia la carpeta `Mobile` a tu proyecto.
2. Instala las dependencias:
   ```
   npm install
   ```
3. Asegúrate de tener Appium y un emulador/dispositivo Android corriendo.

## Ejecución de pruebas
- Ejecuta todas las pruebas:
  ```
  npm test
  ```
  (Esto ejecuta Jest con los parámetros necesarios para WebdriverIO y Appium)

- Genera el reporte Allure:
  ```
  npm run allure:report
  ```

- Abre el reporte Allure en el navegador:
  ```
  npm run allure:open
  ```

## Sugerencias y buenas prácticas
- Mantén los selectores centralizados en `selectors.js` para facilitar el mantenimiento.
- Usa el Page Object (`ToDoPage.js`) para encapsular la lógica de interacción con la app.
- Prepara los datos de prueba en cada test para evitar dependencias entre ellos.
- Elimina archivos duplicados en `test/specs/` para evitar ejecuciones dobles.
- No subas carpetas como `node_modules/`, `reports/`, `allure-results/` ni archivos `.env` al repositorio (ya están en `.gitignore`).

## Contexto y alcance
- El proyecto está pensado para pruebas E2E de una app ToDo.
- Los scripts de npm permiten ejecutar y reportar fácilmente.

## Problemas comunes
- Si ves errores de `dynamic import callback` ejecuta los tests con:
  ```
  node --experimental-vm-modules ./node_modules/jest/bin/jest.js test/specs --runInBand
  ```
- Si los tests aparecen duplicados o como "Unknown" en Allure, revisa que no haya archivos duplicados y que la configuración de Jest sea correcta.

## Personalización
- Puedes agregar más flujos de prueba creando nuevos archivos en `test/specs/`.
- Ajusta las capacidades de Appium en `utils/capabilities.js` según tu entorno.
- Modifica los scripts de `package.json` según tus necesidades.

---

**Ante cualquier duda, revisa la configuración y la estructura, y asegúrate de que el entorno Appium/Android esté correctamente inicializado antes de ejecutar las pruebas.**

#### All Rights Reserved "BigTeam2025 - TAE"
