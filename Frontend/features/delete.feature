@delete
Feature: Eliminación de Productos
  Como usuario registrado
  Quiero eliminar artículos desde el listado
  Para mantener actualizado el inventario

  Background:
    Given el usuario ha iniciado sesión con email "<email>" y contraseña "<password>"
    And está en el dashboard del sistema
    And navega a la sección de "Artículos"
    And la lista de articulos está completamente cargada

  #test pasa: porque cumple el ciclo general basico esperado acorde al requerimiento
  @positive @requirement
  Scenario: Eliminar un producto exitosamente
    Given el producto "Iphone 16 Pro Max" existe en la tabla
    When hace click en el botón eliminar correspondiente al producto "Iphone 16 Pro Max"
    Then se debe mostrar una notificación de "Artículo eliminado con éxito."
    Then el producto "Iphone 16 Pro Max" ya no debería aparecer en la tabla
  
    

  #test falla:  falla porque no existe modal de confirmación al intentar cancelar la eliminación. 
  @negative @confirmation
  Scenario: Mostrar mensaje de confirmación antes de eliminar
    Given el producto "Iphone 16 Pro Max" existe en la tabla
    When hace click en el botón eliminar correspondiente al producto "Iphone 16 Pro Max"
    Then aparece un mensaje de confirmación "¿Está seguro de eliminar el producto?"
    When el usuario confirma la eliminación
    Then el producto "Iphone 16 Pro Max" ya no debería aparecer en la tabla
    And se debe mostrar una notificación de "Artículo eliminado con éxito."

  #este pasa: porque no pide validacion de SKU
  @negative @validation @critical
  Scenario: Eliminar sin validación de SKU es una falla crítica
    Given el producto existe y tiene descripción "Iphone 16 Pro Max" pero SKU ""
    When hace click en el botón eliminar del producto
    Then el sistema eliminó el producto SIN solicitar validación de SKU
    And esto evidencia falla crítica: debería pedir "Especifique el SKU del producto a eliminar"
    And demuestra que el sistema NO valida identificador único antes de eliminar

  #test falla: falla porque al intentar eliminar el producto, el paso de confirmación no encuentra el botón de confirmación 
  @negative @cancellation
  Scenario: Cancelar eliminación desde el modal de confirmación
    Given el producto "Iphone 16 Pro Max" existe en la tabla
    When hace click en el botón eliminar correspondiente al producto "Iphone 16 Pro Max"
    And cancela la eliminación en el modal de confirmación
    Then el producto "Iphone 16 Pro Max" debería seguir apareciendo en la tabla
    And no se debe mostrar ninguna notificación de eliminación

  #test pasa: aunque el producto ya no existe, el sistema muestra el mensaje de error esperado y está protegido contra accesos directos.
  @negative @edge-case
  Scenario: Acceso directo a producto eliminado mediante URL
    Given el producto "Iphone 16 Pro Max" fue eliminado previamente
    When el usuario intenta acceder directamente al producto eliminado mediante URL
    Then se debe mostrar un mensaje de error en el dashboard "Error al cargar el artículo."
    And queda en evidencia que el articulo no puede ser accedido y esta protegido contra accesos directos

  #test falla: falla porque no se muestra el toast de error esperado
  #Esto evidencia que la aplicación no notifica el error esperado al intentar eliminar un producto con stock
  
  @negative @business-rule
  Scenario: Impedir eliminación si el producto tiene stock disponible
    Given el producto "Iphone 16 Pro Max" existe con stock 10
    When el usuario intenta eliminar el producto haciendo click en el botón eliminar   
    Then debe mostrar error "No se puede eliminar producto con stock disponible"
    And el producto debe permanecer en la tabla

  #test pasa: El botón con el icono para eliminar el producto "Iphone 16 Pro Max" es visible en la vista de artículos.
  @validation @ui
  Scenario: Verificar visibilidad del botón eliminar
    Given el producto "Iphone 16 Pro Max" existe en la tabla
    When se carga la vista de artículos
    Then debe aparecer el botón con el icono para eliminar el producto "Iphone 16 Pro Max"