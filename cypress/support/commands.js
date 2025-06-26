// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginWithSession", () => {
  cy.session("user-session", () => {
    cy.visit("/customer/account/login", {timeout: 25000});
    cy.get('#email', {timeout: 12000}).type(Cypress.env("USER_EMAIL"));
    cy.get('#pass', {timeout: 12000}).type(Cypress.env("USER_PASSWORD"));
    cy.get('#send2', {timeout: 12000}).click();
    cy.url({timeout: 25000}).should("include", "/customer/account");
  });
});
