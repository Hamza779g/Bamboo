/// <reference types="cypress" />

import { placeMultipleProductsPage } from "../pageObjects/PlaceMultipleProductsPage";
import { searchListProductsPage } from "../pageObjects/ProductSearchPage";

describe("Test Case (D):", () => {
  it("Search and validate results", () => {
    cy.loginWithSession();
    placeMultipleProductsPage.visitJacketPage();
    searchListProductsPage.searchAndValidateFirstProduct();
  });
});
