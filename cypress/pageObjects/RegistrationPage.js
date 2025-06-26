import { registrationSelectors } from "./selectors/registrationPage.selectors";
import { myAccountSelectors } from "./selectors/myAccountPage.selectors";

export class RegistrationPage {
  visit() {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get(registrationSelectors.createAccountButton).first().click();
  }

  fillForm(firstName, lastName, email, password) {
    cy.get(registrationSelectors.firstNameInput).type(firstName);
    cy.get(registrationSelectors.lastNameInput).type(lastName);
    cy.get(registrationSelectors.emailInput).type(email);
    cy.get(registrationSelectors.passwordInput).type(password);
    cy.get(registrationSelectors.confirmPasswordInput).type(password);
  }

  submit() {
    cy.get(registrationSelectors.submitButton).click();
  }

  verifySuccessMessage() {
    cy.get(myAccountSelectors.successMessage)
      .should("be.visible")
      .and(
        "contain.text",
        "Thank you for registering with Main Website Store."
      );
  }

  verifyUserData(firstName, lastName, email) {
    cy.get(myAccountSelectors.userInfoParagraph)
      .invoke("text")
      .then((text) => {
        const cleanedText = text.replace(/\s+/g, " ").trim();
        const expectedText = `${firstName} ${lastName} ${email}`;
        expect(cleanedText).to.contain(expectedText);
      });
  }
}

export const registrationPage = new RegistrationPage();
