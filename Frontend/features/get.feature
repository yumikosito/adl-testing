@get-products
Feature: Consulta de productos
  Como usuario
  Quiero poder acceder al sistema
  Para consultar productos
  
  Background:
	  Given el usuario ingresó con email "testeradl@test.com" y contraseña "Tester@2025", y está en el dashboard

  Scenario: Consulta exitosa de productos generales
    When se navega a la sección de Articulos
    Then se deben mostrar todos los productos en tu cuenta

  Scenario: Consulta exitosa de detalle de producto individual existente
    When se navega a la sección de Articulos
    And se selecciona el producto con ID 3
    Then se debe mostrar en pantalla "Artículo: Laptop HP 14."

  Scenario: Consulta erronea de detalle de producto individual inexistente
    When se navega a la sección de Articulos
    And se selecciona el producto con ID 999
    Then se debe mostrar un mensaje de error "Error al cargar el artículo."