@put-products
Feature: Modificación de información de productos
	Como usuario
	Quiero poder acceder al sistema
	Para actualizar los datos de mis productos
	
	Background:
	  Given el usuario ingresó con email "<email>" y contraseña "<password>"
		And esta en la página Listado de Articulos
		And el producto con código "IPH16-005" existe

	Scenario: Modificacion exitosa de campo <input> de producto
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
	  Then aparece un mensaje de edición exitosa y en el sistema cambia el campo de "<inputTable>" a "<value>"
		Examples:
			| input            | value             | inputTable   |
      | Código (SKU)     | IPH16-007         | Código       |
			| Descripción      | Iphone 16 Pro Max | Descripción  |
      | Stock Actual     | 20                | Stock        |
      | Costo            | 200               | Costo        |
      | Precio venta     | 300               | Precio Venta |
      | Unidad de medida | Caja              | Unidad       |
			| Unidad de medida | Kg                | Unidad       |
			| Unidad de medida | Unidad            | Unidad       |
	
	Scenario: Modificacion invalida por codigo (SKU) <value> en uso
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "Código (SKU)" a "<value>"
	  Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| value      |
			| IPH16-006  |

#Prueba negativa costo, deja mandar vacio y lo pone como 0 (1 caso)
	Scenario: Modificacion invalida de <input> con campos vacios
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a ""
	  Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | 
			| Descripción  | 
      | Stock Actual | 
      | Costo        | 
      | Precio venta |

#Prueba negativa costo, deja mandar vacio y lo pone como 0 (1 caso)
	Scenario: Modificacion invalida de <input> con texto en input tipo numerico
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
	  Then el campo de "<input>" queda vacío al no ser número válido
		And se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | value | inputTable   |
      | Stock Actual | dos   | Stock        |
      | Costo        | dos   | Costo        |
      | Precio venta | dos   | Precio Venta |

# Prueba negativa, no debería dejar vacío (1 caso)
  Scenario: Modificacion invalida de <input> 
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
		And se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input            | value      |
      | Unidad de medida | Selecciona |

# Prueba negativa, no debería dejar poner campos negativos (3 casos)
  Scenario: Modificacion invalida de <input> con numeros negativos
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
		Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | value | inputTable   |
      | Stock Actual | -10   | Stock        |
      | Costo        | -100  | Costo        |
      | Precio venta | -200  | Precio Venta |

# Prueba negativa en SKU, no debería dejar guardar con campo en blanco (1 caso)
	Scenario: Modificacion invalida de <input> con campos vacio
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a ""
	  Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        |
      | Código (SKU) |