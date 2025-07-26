@create-products
Feature: Registro de productos
    Como usuario registrado
    Quiero poder acceder al sistema
    Para registrar un nuevo producto con sus datos completos

  Background:
    Given el usuario ingresó con email "<email>" y contraseña "<password>"
    And esta en la página debe Listado de Articulos
    And hizo click en registrar artículo

  Scenario: Registrar un nuevo producto con datos válidos
    When el usuario completa y envía el formulario con:
      | campo           | valor           |
      | Código SKU      | IPH16-005       |
      | Descripción     | iPhone 16       |
      | Stock actual    | 50              |
      | Costo           | 900             |
      | Precio de venta | 1200            |
      | Unidad de medida| Unidad          |
    Then debería ver un mensaje que contenga 'Articulo "iPhone 16" creado con éxito!'
    And el nuevo producto "IPH16-005" debería aparecer en la listado

  Scenario: Intentar registrar un producto sin descripción
    When el usuario completa y envía el formulario con:
       | campo           | valor       |
       | Código SKU      | TEST-999    |
       | Stock actual    | 10          |
       | Costo           | 100         |
       | Precio de venta | 200         |
       | Unidad de medida| Unidad      |
    Then no debería ver un mensaje de éxito
    And debería permanecer en la página de creación

  @bug
  Scenario: Intentar registrar un producto con solo descripción
    When el usuario completa y envía el formulario con:
      | campo           | valor           |
      | Descripción     | iPhone 16       |
    Then no debería ver un mensaje de éxito
    And debería permanecer en la página de creación
 
  Scenario: Intentar registrar un producto sin completar ningún campo
    When el usuario envía el formulario vacio
    Then no debería ver un mensaje de éxito
    And debería permanecer en la página de creación

  Scenario: Intentar registrar un producto con un Código SKU ya existente
    When el usuario completa y envía el formulario con:
      | campo           | valor     |
      | Código SKU      | IPH16-005 |  # mismo SKU del producto creado anteriormente
      | Descripción     | iPhone 16 |
      | Stock actual    | 20        |
      | Costo           | 850       |
      | Precio de venta | 1100      |
      | Unidad de medida| Unidad    |
    Then no debería ver un mensaje de éxito
    And debería permanecer en la página de creación