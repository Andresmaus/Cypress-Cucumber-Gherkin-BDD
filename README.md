<!-- # Cypress-Cucumber-Gherkin-BDD
Proyecto personal sin animo de lucro.

Pasos para un proyecto de automatizacion con Cypress

1. instalamos Node.js

2. instalamos visual studio code

3. creamos una carpeta con el nombre del proyecto

4. ingresamos a la carpeta y abrimos el CMD o Abrimos Visual Studio Code donde Buscamos y abrimos el folder del proyecto luego levantamos una nueva terminal

5. Abierto el CMD o el Termianl del Ide utilizamos el comando:

-> npm init
comando para iniciar un proyecto, donde nos preguntaran la configuracion inicial:
package name: (nombre dek folder) "ENTER"
version: 1.0.0"ENTER"
descripcion: "descripcion" "ENTER"
entry point: index.js "ENTER"
test command: cypress open --browser chrome --e2e "ENTER"
git repository: "ENTER"
keywords: cypress javascript cucumber testing "ENTER"
author: nombre "ENTER"
license: ISC "ENTER"

Is this OK? YES "ENTER"

Luego de configurar el paquete json instalamos CYPRESS

6. instalamos cypress con el comando

-> npm install cypress --save-dev

7. una vez instalado abrimos la interfaz de cypress con el comando

-> npx cypress open

8. una vez abierta la interfaz seleccionamos la opcion e2e - not configuration, bajamos y le damos continuar

9. ahora nos pedira seleccionar el navegador a utilizar, lo seleccionamos e iniciamos el proyecto.

10. ahora creamos un spec que sera nuestro js para hacer las automatizaciones.

-> Create new empty spec
->remplazamos el nombre spec por el nombre que queremos para dicho archivo.
->damos click en "Okay, run the spec"

ahora se correra el test que viene cargado en la configuracion incial.

11. luego de cargar los archivos, cerramos cypress interfaz para proceder a configurar el proyecto con CUCUMBER

12. abrimos los repositorios para los plugins Preprocessor

-> abrir repositorio principal de JoanEsquivel
https://github.com/JoanEsquivel/cypress-cucumber-boilerplate
-> luego abrimos los repositorios de integracion que tiene en la documentacion como:
 https://github.com/badeball/cypress-cucumber-preprocessor
 https://github.com/bahmutov/cypress-esbuild-preprocessor
 https://www.npmjs.com/package/multiple-cucumber-html-reporter
 https://github.com/cucumber/json-formatter

13. con la terminal fuera de ejecucion es decir sin ningun accion ejecutandose instalamos los plugins como dependencias del proyectos

iniciamos con la identificacion de elementos como los xpath, ya que cypress no los reconoce como esta actualmente.

->comando: npm install cypress-xpath --save-dev
una vez ejecutado el comando agregamos una linea de comando en el archivo e2e.js el cual esta en el folder Cypress/support
-> linea -> require("cypress-xpath")

guardamos y continuamos

luego ejecutamos el comando
-> npm install @badeball/cypress-cucumber-preprocessor --save-dev
este comando instalara el plugins para manipular cucumber dentro de cypress

luego ejecutamos el comando
->npm i -D cypress @bahmutov/cypress-esbuild-preprocessor esbuild --save-dev
este comando instalara el plugin complemento del anterior

luego ejecutamos el comando
-> npm install multiple-cucumber-html-reporter --save-dev
este plugins nos permitira generar los reportes de nuestros test 

14. Despues de agregar los plugins a nuestras dependencias vamos a configurar nuestros package and plugins

iniciamos configurando preprocessor y su adicion esbuild 
-> abrimos el archivo cypress.config.js e importamos las librerias, debera quedar esto:

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

debajo de las importaciones tendremos la siguiente configuracion:

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    video: false,
  },
});

guardamos y continuamos

Luego de configurar nuestro proyecto con los package Preprocessor
continuaremos configurando para reconocer los archivos .json para el reporte

15. creamos en la raiz del proyecto un archivo con el nombre de:
-> .cypress-cucumber-preprocessorrc.json
dentro de el configuramos lo siguiente:

{
    "json": {
      "enabled": true,
      "output": "jsonlogs/log.json",
      "formatter": "cucumber-json-formatter.exe"
    },
    "messages": {
      "enabled": true,
      "output": "jsonlogs/messages.ndjson"
    },
    "html": {
      "enabled": true
    },
    "stepDefinitions": [
        "[filepath]/**/*.{js,ts}",
        "[filepath].{js,ts}",
        "cypress/e2e/step_definitions/*.{js,ts}"
    ]
}

guardamos y continuamos

16. creamos un folder a la raiz del proyecto con el nombre jsonlogs

17- ingresamos a este repositorio https://github.com/cucumber/json-formatter/releases/tag/v19.0.0 y descargamos el archivo 

-> cucumber-json-formatter-openbsd-amd64 el cual colocaremos en la raiz del proyecto y lo renombraremos como cucumber-json-formatter.exe este ejecutable nos permitira interpretar los archivos json generados por el reporte.

18. creamos un archivo a la raiz del proyecto con el nombre:

-> cucumber-html.report.js
dentro del archivo configuramos lo siguiente:

const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "jsonlogs", // ** Path of .json file **//
  reportPath: "./reports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "XX",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
});

guardamos y continuamos

19.Ahora creamos los paquetes donde vamos a crear los script de automatizacion bajo lenguaje gherkin

dentro del paquete principal "e2e" creamos dos folder con nombre
-> features
-> step_definitions

->Eliminamos el spec creado por el sistema

20. ahora dentro del folder features creamos un archivo con la extension *.feature llamado por ejemplo:

-> saucedemo_app.feature

21. ahora dentro del folder step_definitions creamos un archivo con la extension *.js llamado con el mismo nombre del features:

-> saucedemo_app.js

22. luego de tener estos dos archivos nos devolvemos al archivo raiz package.json y modificamos el debug es decir la seccion de los comando para ejecutar los script:

->podemos tener esto:

"scripts": {
    "test": "cypress open --browser chrome --e2e"
  },

-> y lo reemplazamos por esto:

"scripts": {
    "cypress:runner": "cypress open --browser chrome --e2e",
    "cypress:execution": "cypress run"
  },

esto nos permitira ejecutar los script directamente desde el navegador chrome y sin estar entrando a modificar los spec.

comando para ejecutar los script:

-> Comando de ejecucion final    <-------

npm run cypress:execution
con esto correra el test

-> comando para generar el reporte <------

node .\cucumber-html.report.js
esto generara un folder con el reporte del test ejecutado


================ Creacion de un scenario de prueba ====================

23. ya configurado el proyecto y estando listo iniciamos a configurar los scenarios

dentro del archvio xxxxxxxxx.feature llamamos o utilizamos las palabras reservadas como Feature, Scenario, Scenario Outline, Background, Given, When, And, Then, Example, etc.

ejemplo de scenario de prueba

Feature: login cypress

    Validar login exitoso y fallido en saucedemo

    Scenario: login exitoso
        Given el usuario ingresa a la app
        When ingresa el usaurio "standard_user"
        And ingresa la contrasenna "secret_sauce"
        And clickea en el boton sign in
        Then Valida que ingreso correctamente

24. una vez configurado nuestro scenario de prueba creamos un archivo con el mismo nombre en el folder de step_definitions este archivo con extension .js

al entrar a configurar importamos la libreria de preprocessor de la siguiente manera 

-> import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

y luego creamos los pasos para nuestro scenario de la siguiente manera:

-> 
Given("el usuario ingresa a la app", () => {
  cy.visit('/');
});

When("ingresa el usaurio {string}", (usaurio) => {
  cy.get('#user-name').type(usaurio);
});

And("ingresa la contrasenna {string}", (contrasenna) => {
  cy.get('#password').type(contrasenna);
});

And("clickea en el boton sign in", () => {
  cy.get('#login-button').click();
});

Then('Valida que ingreso correctamente', ()=>{
  cy.get('#header_container > div.header_secondary_container > span').should('have.text','Products');
});

25. una vez configuramos corremos el test con el comando que ya conocemos:

-> npm run cypress:execution

luego de finalizar exportamos el informe con el comando:
-> node .\cucumber-html.report.js

y eso es todo!

======================================================
COMANDO CYPRESS
======================================================
*cy.visit()* Visitar página web o aplicación.
*cy.reload* Recargar.
*cy.go("back")* Ejemplo de ir hacia atrás.
*cy.get("selector")* Obtener selector.
*cy.contains("p","texto")* Ejemplo de selector y texto.
*cy.contains("texto")* Ejemplo para un input.


======================================================
ACCIONES BASICAS CYPRESS
======================================================
*click()* Click.
*dbclick()* Doble Click.
*rightclick()* -> Click derecho
click({ timeout: 0, force: true }) -- hace forzar el true, incluso si esta seleccionado vuelve a seleccionar.
*type()* Escribir.
*clear()* Limpiar.
*check()* Chequear (checkbox).
*uncheck()* Deschequear.
*select()* Seleccionar.
*cy.wait(3000)* Ejemplo de una espera de 3 segs.

======================================================
EJEMPLOS CYPRESS ACCIONES
======================================================
cy.get('button').eq(3).parent().parent().click(5, 60) -- por posicion
click({ multiple: true }) -- click multiple

======================================================
EJEMPLOS CYPRESS ASERCIONES
======================================================
*cy.get("Error msg").should("no.exist")*
*cy.get("Error msg").should("be.visible")*
*cy.contains("a","dashboard").should("be.visible")*

cy.url().should('include', 'demoqa.com')

cy.get('#firstName')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'First Name')

cy.visit('/automation-practice-form')
cy.get('#firstName').then((element) => {
    expect(element).to.be.visible
    expect(element).to.have.attr('placeholder', 'First Name')

======================================================
ESPERAS CYPRESS
======================================================
cy.get('.ButtonLogin-cta', { timeout: 6000 })// Aca se puede agregar el should.
cy.wait(tiempo en mlsegundos)

======================================================
INTERACTUANDO CON TABLAS CYPRESS
======================================================
cy.get('#customers') -- se llama al identificador
		.find('th') -- se encuentra el header o columna. 
        .each() -- itera en elementos encontrados
        first() -- se trae el primer elemento o sino podemos usar
        una posición:
		.eq(1)  --
		.invoke('text')  -- se invoca el texto.
		.should('equal', 'Contact') -- se comprueba.

======================================================
INTERACTUANDO POPUPS O TOOLTIPS CYPRESS
======================================================
Utilizando trigger podemos hacer cosas más avanzadas para poder disparar
eventos como arrastrar y soltar.

Ejemplo:
        cy.get('#dragBox')
        .trigger('mousedown', {which: 1, pageX: 600, pageY: 100})
        .trigger('mousemove', {which: 1, pageX: 600, pageY: 600})
        .trigger('mouseup') 
        
-->