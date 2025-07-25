@delete
Feature: Eliminación de Productos
  Como usuario registrado y logueado
  Quiero eliminar un producto especifico
  Para que ya no esté disponible en la tienda

  Background:
	  Given el usuario ingresó con email "<email>" y contraseña "<password>"
		And esta en la página debe Listado de Articulos

  Scenario: Eliminar producto "Iphone 16 Pro Max"
    # Given el usuario ha iniciado sesión ingresó con email "testeradl@test.com" y contraseña "Tester@2025" y se encuentra en el listado de productos
    When el usuario busca el producto "Iphone 10000" en la tabla
    And hace clic en el botón eliminar correspondiente al producto "Iphone 10000"
    Then el producto "Iphone 10000" ya no debería aparecer en la tabla
    And se debe mostrar una notificación de "Producto eliminado correctamente"

