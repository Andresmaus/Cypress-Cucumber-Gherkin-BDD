Feature: login cypress
    Validar login exitoso y fallido en saucedemo

    Background:
    Given el usuario ingresa a la app
    
@login-exitoso
  Scenario: login exitoso
    When ingresa el usaurio "standard_user"
    And ingresa la contrasenna "secret_sauce"
    And clickea en el boton login
    Then Valida que ingreso correctamente
    And cierra la sesion

@login-fallido
  Scenario: login fallido
    When ingresa el usaurio "standard_user"
    And ingresa una contrasenna errada "secret_sauce2"
    And clickea en el boton login
    Then Valida que el ingreso fue denegado

@filtrar-productos
  Scenario: filtrar productos por precio de menor a mayor
    When ingresa el usaurio "standard_user"
    And ingresa la contrasenna "secret_sauce"
    And clickea en el boton login
    And cambia el filtro default por precio menor a mayor
    Then Valida que el primer producto es del menor precio
    And cierra la sesion

@comprar-productos
  Scenario: comprar productos exitosamente
    When ingresa el usaurio "standard_user"
    And ingresa la contrasenna "secret_sauce"
    And clickea en el boton login
    And agrega varios productos al carrito
    And continua la compra de los productos en el carrito
    And llena los campos de informacion personal solicitada
    And finaliza la compra
    Then Valida que los productos fueron despachados satisfactoriamente
    And cierra la sesion