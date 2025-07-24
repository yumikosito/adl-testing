@put-products
Feature: Modificación de información de productos
	Como usuario
	Quiero poder acceder al sistema
	Para actualizar los datos de mis productos
	
	Background:
	  Given el usuario ingresó con email "<email>" y contraseña "<password>"
		And esta en la página debe Listado de Articulos
		And el producto con código "HP-14.1-2025" existe

	Scenario: Modificación exitosa de campos de producto
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
	  Then aparece un mensaje de edición exitosa y en el sistema cambia el campo de "<inputTable>" a "<value>"
		Examples:
			| input            | value        | inputTable   |
      | Código (SKU)     | HP-14.1-2026 | Código       |
			| Descripción      | Laptop HP 15 | Descripción  |
      | Stock Actual     | 20           | Stock        |
      | Costo            | 200          | Costo        |
      | Precio venta     | 300          | Precio Venta |
      | Unidad de medida | Caja         | Unidad       |
			| Unidad de medida | Kg           | Unidad       |
			| Unidad de medida | Unidad       | Unidad       |
	
	Scenario: Modificación inválida por código (SKU) en uso
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "Código (SKU)" a "<value>"
	  Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| value        |
			| HP-14.1-2027 |

	Scenario: Modificación inválida con campos vacíos
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a ""
	  Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | 
			| Descripción  | 
      | Stock Actual | 
      | Costo        | 
      | Precio venta |


  Scenario: Modificación inválida con texto en input tipo numérico
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
	  Then el campo de "<input>" queda vacío al no ser número válido
		And se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | value | inputTable   |
      | Stock Actual | dos   | Stock        |
      | Costo        | dos   | Costo        |
      | Precio venta | dos   | Precio Venta |


# Prueba negativa, no debería dejar poner campos negativos
  Scenario: Modificación inválida con números negativos
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a "<value>"
		Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | value | inputTable   |
      | Stock Actual | -10   | Stock        |
      | Costo        | -100  | Costo        |
      | Precio venta | -200  | Precio Venta |

# Prueba negativa en SKU, no debería dejar guardar con campo en blanco
	Scenario: Modificación inválida con campos vacío de SKU
		When se ingresa al detalle del producto y se navega a la página de edición
	  And se modifica el campo de "<input>" a ""
	  Then se debe mostrar un mensaje de error "Error al guardar el artículo."
		Examples:
			| input        | 
      | Código (SKU) | 