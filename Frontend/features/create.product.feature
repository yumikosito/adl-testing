@create-products
Feature: Registro de productos
    Como usuario registrado
    Quiero poder acceder al sistema
    Para registrar un nuevo producto con sus datos completos

  Background:
    Given el usuario ingresó con email "<email>" y contraseña "<password>" validos, navegó a lista de artículos e hizo click en registrar artículo

  Scenario: Registrar un nuevo producto con datos válidos
    When el usuario completa y envía el formulario con:
      | campo           | valor           |
      | Código SKU      | IPH16-001       |
      | Descripción     | iPhone 16       |
      | Stock actual    | 50              |
      | Costo           | 900             |
      | Precio de venta | 1200            |
      | Unidad de medida| Unidad          |
    Then debería ver un mensaje 'Artículo iPhone 16 creado con éxito'
    And el nuevo producto "iPhone 16" debería aparecer en la listado

 # Scenario: Intentar registrar un producto sin descripción
 #    Given el usuario hace click en el botón "Entidades"
 #    And selecciona la opción "Artículos"
 #    And se encuentra en la lista de artículos
 #    When hace clic en "Crear Artículo"
 #    And completa el formulario con:
 #      | campo           | valor       |
 #      | Código SKU      | TEST-999    |
 #      | Stock actual    | 10          |
 #      | Costo           | 100         |
 #      | Precio de venta | 200         |
 #      | Unidad de medida| Unidad      |
 #    And hace clic en "Guardar cambios"
 #    Then debería ver un mensaje de error que indique que la descripción es obligatoria
# 
 #  Scenario: Intentar registrar un producto con solo descripción
 #    Given el usuario hace click en el botón "Entidades"
 #    And selecciona la opción "Artículos"
 #    And se encuentra en la lista de artículos
 #    When hace clic en "Crear Artículo"
 #    And completa el formulario con:
 #      | campo           | valor           |
 #      | Descripción     | iPhone 16       |
 #    And hace clic en "Guardar cambios"
 #    Then debería ver un mensaje 'Artículo "iPhone 16" creado con éxito'
 #    And el nuevo producto "iPhone 16" debería aparecer en la listado
# 
 #  Scenario: Intentar registrar un producto sin completar ningún campo
 #    Given el usuario hace click en el botón "Entidades"
 #    And selecciona la opción "Artículos"
 #    And se encuentra en la lista de artículos
 #    When hace clic en "Crear Artículo"
 #    And no completa ningún campo del formulario
 #    And hace clic en "Guardar cambios"
 #    Then debería ver un mensaje de error que indique que la descripción es obligatoria
# 
 #  Scenario: Intentar registrar un producto con un Código SKU ya existente
 #    Given el usuario hace click en el botón "Entidades"
 #    And selecciona la opción "Artículos"
 #    And se encuentra en la lista de artículos
 #    When hace clic en "Crear Artículo"
 #    And completa el formulario con:
 #      | campo           | valor     |
 #      | Código SKU      | IPH16-001 |  # mismo SKU del producto creado anteriormente
 #      | Descripción     | iPhone 16 |
 #      | Stock actual    | 20        |
 #      | Costo           | 850       |
 #      | Precio de venta | 1100      |
 #      | Unidad de medida| Unidad    |
 #    And hace clic en "Guardar cambios"
 #    Then debería ver un mensaje de error que indique que el Código SKU ya existe