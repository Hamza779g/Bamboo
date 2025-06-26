/// <reference types="cypress" />

import { placeMultipleProductsPage } from "../pageObjects/PlaceMultipleProductsPage";

describe("Test Case (B):", () => {
  it("Should add 4 products, verify prices and totals on payment page", () => {
    cy.loginWithSession();
    placeMultipleProductsPage.visitJacketPage();
    placeMultipleProductsPage.addMultipleProducts(4);
    placeMultipleProductsPage.verifyMiniCartPrices();
    placeMultipleProductsPage.proceedToCheckout();
    placeMultipleProductsPage.fillShippingDetails();
    placeMultipleProductsPage.verifyPaymentPagePrices();
  });
});

