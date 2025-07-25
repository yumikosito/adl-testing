@login
Feature: Servicio de Login
  Como usuario 
  Quiero iniciar sesion
  Para ingresar al sistema
  
  Background:
	  Given el usuario esta previamente registrado y en la pagina de login

  Scenario: Intento de ingreso con credenciales validas
    When el usuario ingresa "<email>" en el campo de email
    And el usuario ingresa "<password>" en el campo de contraseña
    Then se debe mostrar el dashboard del sistema

  #Caso de prueba 5 - Como usuario no registrado, quiero validar que no puedo acceder al sistema

	Scenario: Intento de ingreso con credenciales invalidas
	  When el usuario ingresa "<email>" en el campo de email
    And el usuario ingresa "password123" en el campo de contraseña
	  Then se debe mostrar una alerta de "Las credenciales proporcionadas son incorrectas."

  Scenario: Intento de ingreso con ambos campos vacios
	  When el usuario ingresa "" en el campo de email
    And el usuario ingresa "" en el campo de contraseña
	  Then se debe mostrar un mensaje de que se requiere llenado de "email"

  Scenario: Intento de ingreso con campo vacio de email
	  When el usuario ingresa "" en el campo de email
    And el usuario ingresa "Tester" en el campo de contraseña
	  Then se debe mostrar un mensaje de que se requiere llenado de "email"
	  
 	Scenario: Intento de ingreso con campo vacio de contraseña
	  When el usuario ingresa "correo@correo.com" en el campo de email
    And el usuario ingresa "" en el campo de contraseña
	  Then se debe mostrar un mensaje de que se requiere llenado de "password"

  Scenario: Intento de recuperar contraseña
	  When el usuario ingresa a la página de Recuperar contraseña
    And el usuario ingresa "<email>" en el campo de email
	  Then se debe mostrar una alerta de "Si existe una cuenta con ese email, recibirás un correo con las instrucciones."