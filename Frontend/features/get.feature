@get-products
Feature: Consulta de productos
  Como usuario
  Quiero poder acceder al sistema
  Para consultar productos
  
  Background:
	  Given el usuario ingresó con email "<email>" y contraseña "<password>"
    And está en la página de dashboard

  Scenario: Consulta exitosa de productos generales
    When se navega a la sección de Articulos
    Then se deben mostrar todos los productos en tu cuenta

  Scenario: Consulta exitosa de detalle de producto <codigo>
    When se navega a la sección de Articulos
    And se ingresa al detalle del producto "<codigo>"
    Then se debe mostrar en pantalla "Artículo: <item>"
    Examples:
    | codigo    | item      |
    | IPH16-005 | iPhone 16 |

  Scenario: Consulta erronea de detalle de producto con id <id> inexistente
    When se navega a la sección de Articulos
    And se selecciona el producto con ID "<id>"
    Then se debe mostrar un mensaje de error "Error al cargar el artículo."
    Examples:
    | id   | 
    | 0    | 
    | 1003 |