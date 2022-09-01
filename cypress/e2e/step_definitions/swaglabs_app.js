import {Given, When, Then, And} from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario ingresa a la app", ()=>{
    cy.visit('/');
})

When("ingresa el usaurio {string}", (usuario)=>{
    cy.get('#user-name').type(usuario);
})

And("ingresa la contrasenna {string}", (contrasenna)=>{
    cy.get('#password').type(contrasenna);
})

And("clickea en el boton login", ()=>{
    cy.get('#login-button').click();
})

And("ingresa una contrasenna errada {string}", (contrasenna_errada)=>{
    cy.get('#password').type(contrasenna_errada);
})

And("cambia el filtro default por precio menor a mayor", ()=>{
    cy.xpath(`//select[@class='product_sort_container']`).select('Price (low to high)');
})

And("agrega varios productos al carrito", ()=>{
    cy.get('#add-to-cart-sauce-labs-onesie').click();
    cy.get('#add-to-cart-sauce-labs-backpack').click({force:true});
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
})

And("continua la compra de los productos en el carrito", ()=>{
    cy.get('#shopping_cart_container > a').click();
    cy.get('#checkout').click();
})

And("llena los campos de informacion personal solicitada", ()=>{
    cy.get('#first-name').type("Andres");
    cy.get('#last-name').type("Sanchez");
    cy.get('#postal-code').type("230001");
})

And("finaliza la compra", ()=>{
    cy.get('#continue').click();
    cy.get('#finish').click();
})

Then("Valida que ingreso correctamente", ()=>{
    cy.xpath(`//span[contains(text(),'Products')]`).should('be.visible');
})

Then("Valida que el ingreso fue denegado", ()=>{
    cy.xpath(`//h3[contains(text(),'Username and password do not match')]`).should('be.visible');
})

Then("Valida que el primer producto es del menor precio", ()=>{
    cy.xpath(`(//div[@class='inventory_item_desc'])[1]`).should('be.visible').and('contains.text',"Rib snap infant onesie for the junior automation engineer in development");
})

Then("Valida que los productos fueron despachados satisfactoriamente", ()=>{
    cy.xpath(`//h2[@class='complete-header']`).should('be.visible').and('have.text',"THANK YOU FOR YOUR ORDER");
})

And("cierra la sesion", ()=>{
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
})