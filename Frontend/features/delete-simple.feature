@delete-simple
Feature: Eliminación simple de productos
  Como usuario
  Quiero eliminar productos del listado
  Para mantener el inventario actualizado

  Background:
    Given el usuario ingresó con email "<email>" y contraseña "<password>"
    And esta en la página Listado de Articulos

  Scenario: Mostrar mensaje cuando no hay productos en la tabla
    Given no hay productos creados en el sistema
    Then debería ver un mensaje que diga "No hay artículos"

  Scenario: Eliminar un producto por nombre
    Given el producto con nombre "Iphone 16 Pro Max 2" existe
    When el usuario hace click en el ícono de borrar en el producto "Iphone 16 Pro Max 2"
    And debería ver un mensaje que contenga 'Artículo eliminado con éxito.'
    Then el producto "Iphone 16 Pro Max 2" no debería aparecer en la tabla

  Scenario: Mostrar confirmación al intentar borrar un producto
    Given el producto con nombre "iPhone 16" existe
    When el usuario hace click en el ícono de borrar en el producto "iPhone 16"
    Then aparece un mensaje de confirmación


