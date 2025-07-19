@get-products
Feature: Consulta de productos
  Como usuario
  Quiero poder acceder al sistema
  Para consultar productos
  
  Background:
	  Given el usuario esta autenticado e ingresó al sistema
	  And el sistema está disponible

 Scenario: Consulta exitosa de productos generales
    Given el usuario se encuentra en el dashboard
    When se navega a la sección de 'Articulos'
    Then se deben mostrar todos los productos en el sistema

  Scenario: Consulta exitosa de detalle de producto individual existente
    Given existe un producto con ID "3"
    When se navega a la sección de 'Articulos' y selecciona el producto con ID "3"
    Then se debe mostrar en pantalla "Artículo: Laptop HP 14"

  Scenario: Consulta erronea de detalle de producto individual inexistente
    Given no existe un producto con ID "999"
    When se navega a la sección de 'Articulos' y selecciona el producto con ID "999"
    Then se debe mostrar un mensaje de error "Error al cargar el artículo."