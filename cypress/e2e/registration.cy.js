/// <reference types="cypress" />

import { registrationPage } from "../pageObjects/RegistrationPage";

describe("Test Case (A):", () => {
  const firstName = Cypress.env("USER_FIRSTNAME");
  const lastName = Cypress.env("USER_LASTNAME");
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");

  context("Registration flow with login validation", () => {
    it("Register a new user and verify success message", () => {
      registrationPage.visit();
      cy.url().should("include", "/customer/account/create");
      registrationPage.fillForm(firstName, lastName, email, password);
      registrationPage.submit();

      registrationPage.verifySuccessMessage();
      registrationPage.verifyUserData(firstName, lastName, email);
    });

    it("Login with session reuse and verify registered user info", () => {
      cy.loginWithSession();
      cy.visit("/customer/account");
      registrationPage.verifyUserData(firstName, lastName, email);
    });
  });
});
