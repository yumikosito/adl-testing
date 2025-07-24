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
      | Stock actual     | 20           | Stock        |
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

# #Pruebas negativas
#   Scenario: Modificación inválida con texto en input tipo numérico
# 		When se ingresa al detalle del producto "<itemCode>" y se hace click en el boton editar
# 	  And se modifica el campo de "<input>" a "<value>"
# 	  Then el campo de "<input>" muestra un mensaje de requisito no válido
# 		Examples:
# 			| itemCode     | input        | value | inputTable   |
#       | HP-14.1-2025 | Stock actual | dos   | Stock        |
#       | HP-14.1-2025 | Costo        | tres  | Costo        |
#       | HP-14.1-2025 | Precio venta | uno   | Precio Venta |

# #prueba negativa
# 	Scenario: Modificación inválida con campos vacíos
# 		When se ingresa al detalle del producto "<itemCode>" y se hace click en el boton editar
# 	  And se modifica el campo de "<input>" a ""
# 	  Then el campo de "<input>" muestra un mensaje de requisito no válido
# 		Examples:
# 			| itemCode     | input            | inputTable   |
#       | HP-14.1-2025 | Código (SKU)     | Código       |
#       | HP-14.1-2025 | Stock actual     | Stock        |
#       | HP-14.1-2025 | Costo            | Costo        |
#       | HP-14.1-2025 | Precio venta     | Precio Venta |
#       | HP-14.1-2025 | Unidad de medida | Unidad       |

# #Prueba negativa
#   Scenario: Modificación inválida con números negativos
# 		When se ingresa al detalle del producto "<itemCode>" y se hace click en el boton editar
# 	  And se modifica el campo de "<input>" a "<value>"
# 	  Then el campo de "<input>" muestra un mensaje de requisito no válido
# 		Examples:
# 			| itemCode     | input        | value | inputTable   |
#       | HP-14.1-2025 | Stock actual | -10   | Stock        |
#       | HP-14.1-2025 | Costo        | -100  | Costo        |
#       | HP-14.1-2025 | Precio venta | -200  | Precio Venta |