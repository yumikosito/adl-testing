@put-products
Feature: Modificación de información de productos
	Como usuario
	Quiero poder acceder al sistema
	Para actualizar los datos de mis productos
	
	Background:
	  Given existe el producto "Iphone 16"

  Scenario: Modificación exitosa de campo de nombre de producto
	  When se intenta modificar el nombre a "Iphone Pro Max"
	  Then aparece un mensaje de edición exitosa
	  And en el sistema se cambia el nombre a "Iphone Pro Max"
	  
  Scenario: Modificación exitosa de campo de descripción de producto
	  When se intenta modificar la descripción a "El Iphone de última generación"
	  Then aparece un mensaje de edición exitosa
	  And en el sistema se cambia la descripción a "El Iphone de última generación"
  Scenario: Modificación inválida de costo
	  When se intenta modificar el costo a "Iphone"
	  Then aparece un mensaje de error
	 
	 Scenario: Modificación inválida de cantidad de stock
	  When se intenta modificar la cantidad de stock a "dos"
	  Then aparece un mensaje de error