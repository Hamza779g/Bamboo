/// <reference types="cypress" />

import { placeMultipleProductsPage } from "../pageObjects/PlaceMultipleProductsPage";
import { wishlistPage } from "../pageObjects/WishlistCheckoutProductsPage";

describe("Test Case (C):", () => {
  it("Add products in Wishlist and checkout from wishlist", () => {
    cy.loginWithSession();
    placeMultipleProductsPage.visitJacketPage();
    wishlistPage.addFirstNProductsToWishlist();
    wishlistPage.visitWishlistPage();
    wishlistPage.addWishlistProducts(3);
    wishlistPage.verifyMiniCartPrices();
    placeMultipleProductsPage.proceedToCheckout();
    placeMultipleProductsPage.fillShippingDetails();
    placeMultipleProductsPage.verifyPaymentPagePrices();

  });
});
