@put-products
Feature: Modificación de información de productos
	Como usuario
	Quiero poder acceder al sistema
	Para actualizar los datos de mis productos
	
	Background:
	  Given el usuario ingresó con email "<email>" y contraseña "<password>", esta en Listado de Articulos y el producto existe

	# Scenario: Modificación exitosa de campo de descripcion de producto
	# 	When se ingresa al detalle del producto "<itemCode>" y se hace click en el boton editar
	#   And se modifica el campo de "<input>" a "<value>"
	#   Then aparece un mensaje de edición exitosa y en el sistema cambia el campo de "<inputTable>" a "<value>"
	# 	Example:
	# 		| itemCode     | input           | value        | inputTable   |
  #     | HP-14.1-2025 | Descripción     | Laptop HP 15 | Descripción  |

	Scenario: Modificación exitosa de campos de producto
		When se ingresa al detalle del producto "<itemCode>" y se hace click en el boton editar
	  And se modifica el campo de "<input>" a "<value>"
	  Then aparece un mensaje de edición exitosa y en el sistema cambia el campo de "<inputTable>" a "<value>"
		Examples:
			| itemCode     | input            | value        | inputTable   |
      | HP-14.1-2024 | Código (SKU)     | HP-14.1-2025 | Código       |
			| HP-14.1-2025 | Descripción      | Laptop HP 15 | Descripción  |
      | HP-14.1-2025 | Stock actual     | 20           | Stock        |
      | HP-14.1-2025 | Costo            | 200          | Costo        |
      | HP-14.1-2025 | Precio venta     | 300          | Precio Venta |
      | HP-14.1-2025 | Unidad de medida | Caja         | Unidad       |

	
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