@put-products
Feature: Modificación de información de productos
	Como usuario
	Quiero poder acceder al sistema
	Para actualizar los datos de mis productos
	
	Background:
	  Given el usuario ingresó con email "testeradl@test.com" y contraseña "Tester@2025", esta en Listado de Articulos y el producto existe

	Scenario: Modificación exitosa de campo de descripcion de producto
		When se ingresa al detalle del producto "TEST 1" y se hace click en el boton editar
	  And se modifica el campo de "Descripción" a "TEST"
	  Then aparece un mensaje de edición exitosa de "TEST" y en el sistema cambia el campo de "Descripción" a "TEST"

	# Scenario: Modificación exitosa de campo de código de producto
	# 	When se ingresa al detalle del producto "Laptop HP 14." y se hace click en el boton editar
	#   And se modifica el campo de "Código (SKU)" a "HP-14.2-2025"
	#   Then aparece un mensaje de edición exitosa de "Laptop HP 14." y en el sistema cambia el campo de "Código" a "HP-14.2-2025" 

	# Scenario: Modificación exitosa de campo de stock de producto
	# 	When se ingresa al detalle del producto "Laptop HP 14." y se hace click en el boton editar
	#   And se modifica el campo de "Stock Actual" a "25"
	#   Then aparece un mensaje de edición exitosa de "Laptop HP 14." y en el sistema cambia el campo de "Stock" a "25"
	
	# Scenario: Modificación exitosa de campo de costo de producto
	# 	When se ingresa al detalle del producto "Laptop HP 14." y se hace click en el boton editar
	#   And se modifica el campo de "Costo" a "450"
	#   Then aparece un mensaje de edición exitosa de "Laptop HP 14." y en el sistema cambia el campo de "Costo" a "450"
	  
	# Scenario: Modificación exitosa de campo de precio venta de producto
	# 	When se ingresa al detalle del producto "Laptop HP 14." y se hace click en el boton editar
	#   And se modifica el campo de "Precio Venta" a "650"
	#   Then aparece un mensaje de edición exitosa de "Laptop HP 14." y en el sistema cambia el campo de "Precio Venta" a "650"

	# Scenario: Modificación exitosa de campo de unidad de medida de producto
	# 	When se ingresa al detalle del producto "Laptop HP 14." y se hace click en el boton editar
	#   And se modifica el campo de Unidad de medida a "Unidad"
	#   Then aparece un mensaje de edición exitosa de "Laptop HP 14." y en el sistema cambia el campo de "Unidad" a "Unidad"
	  
  # Scenario: Modificación inválida de costo
	# 	When se ingresa al detalle del producto "Laptop HP 14." y se hace click en el boton editar
	#   And se modifica el "Costo" a "dos"
	#   Then aparece un mensaje de error en "Costo" de tipo inválido
	 
	#  Scenario: Modificación inválida de cantidad de stock
	#  	When se ingresa al detalle del producto "Iphone 16"
	#   And se modifica el "Stock Actual" a "dos"
	#   Then aparece un mensaje de error