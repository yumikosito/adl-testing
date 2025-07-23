@create-produts
Feature: Registro de productos
    Como usuario registrado
    Quiero poder acceder al sistema
    Para registrar un nuevo producto con sus datos completos

  Background:
    Given que el usuario navega a la página de login
    When ingresa su correo "testeradl@test.com" y contraseña "Tester@2025" 
    And hace clic en "Ingresar"
    Then debería ver el panel principal

  Scenario: Registrar un nuevo producto con datos válidos
    Given el usuario hace click en el botón "Entidades"
    And selecciona la opción "Artículos"
    And se encuentra en la lista de artículos
    When hace clic en "Crear Artículo"
    And completa el formulario con:
      | campo           | valor           |
      | Código SKU      | IPH16-001       |
      | Descripción     | iPhone 16       |
      | Stock actual    | 50              |
      | Costo           | 900             |
      | Precio de venta | 1200            |
      | Unidad de medida| Unidad          |
    And hace clic en "Guardar cambios"
    Then debería ver un mensaje 'Artículo "iPhone 16" creado con éxito'
    And el nuevo producto "iPhone 16" debería aparecer en la listado

 Scenario: Intentar registrar un producto sin descripción
    Given el usuario hace click en el botón "Entidades"
    And selecciona la opción "Artículos"
    And se encuentra en la lista de artículos
    When hace clic en "Crear Artículo"
    And completa el formulario con:
      | campo           | valor       |
      | Código SKU      | TEST-999    |
      | Stock actual    | 10          |
      | Costo           | 100         |
      | Precio de venta | 200         |
      | Unidad de medida| Unidad      |
    And hace clic en "Guardar cambios"
    Then debería ver un mensaje de error que indique que la descripción es obligatoria

  Scenario: Intentar registrar un producto con solo descripción
    Given el usuario hace click en el botón "Entidades"
    And selecciona la opción "Artículos"
    And se encuentra en la lista de artículos
    When hace clic en "Crear Artículo"
    And completa el formulario con:
      | campo           | valor           |
      | Descripción     | iPhone 16       |
    And hace clic en "Guardar cambios"
    Then debería ver un mensaje 'Artículo "iPhone 16" creado con éxito'
    And el nuevo producto "iPhone 16" debería aparecer en la listado

  Scenario: Intentar registrar un producto sin completar ningún campo
    Given el usuario hace click en el botón "Entidades"
    And selecciona la opción "Artículos"
    And se encuentra en la lista de artículos
    When hace clic en "Crear Artículo"
    And no completa ningún campo del formulario
    And hace clic en "Guardar cambios"
    Then debería ver un mensaje de error que indique que la descripción es obligatoria