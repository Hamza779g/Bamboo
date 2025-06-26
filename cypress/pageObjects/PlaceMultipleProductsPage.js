import { selectors } from "../pageObjects/selectors/placeMultipleProductsPage.selectors";
import userAddress from "../fixtures/userAddress.json";

export class PlaceMultipleProductsPage {
  totalProductPrice = 0;
  selectedProductPrices = 0;
  subtotal = 0;
  discount = 0;
  shipping = 0;
  orderTotalAmount = 0;

  visitJacketPage() {
    cy.visit("/men/tops-men/jackets-men.html");
  }

  addMultipleProducts(count = 4) {
    cy.get(selectors.productCard, { timeout: 12000 })
      .then($cards => Cypress._.slice($cards, 0, count))
      .each($card => {
        cy.wrap($card)
          .find(selectors.productPrice)
          .invoke("text")
          .then(priceText => {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
            this.totalProductPrice += price;
          });

        cy.wrap($card).find(selectors.colorSwatch).first().click({ force: true });
        cy.wrap($card).find(selectors.sizeSwatch).contains("XS").click({ force: true });
        cy.wrap($card).trigger("mouseover").find(selectors.addToCartButton).click({ force: true });
      });
  }

  verifyMiniCartPrices() {
    cy.get(selectors.miniCartToggle).click();
    cy.wait(3500);

    cy.get(selectors.miniCartPrice).each($price => {
      const priceText = $price.text();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      this.selectedProductPrices += price;
    }).then(() => {
      expect(this.selectedProductPrices).to.be.closeTo(this.totalProductPrice, 0.01);
    });
  }

  proceedToCheckout() {
    cy.get(selectors.checkoutButton).should("be.visible").click();
  }

  fillShippingDetails() {
    cy.url({ timeout: 25000 }).should("include", "/checkout/#shipping");

    cy.get(selectors.companyInput).type(userAddress.company);
    cy.get(selectors.streetInput).type(userAddress.street);
    cy.get(selectors.cityInput).type(userAddress.city);
    cy.get(selectors.regionDropdown).select(userAddress.region);
    cy.get(selectors.postcodeInput).type(userAddress.postcode);
    cy.get(selectors.telephoneInput).type(userAddress.telephone);
    cy.get(selectors.shippingMethodRadio).click({ force: true });

    cy.get(selectors.shippingMethodPrice).last().invoke("text").then(fee => {
      cy.log(`Shipping Method Fee: ${fee}`);
    });

    cy.get(selectors.continueToPayment).click();
  }

  verifyPaymentPagePrices() {
    cy.url({ timeout: 25000 }).should("include", "/checkout/#payment");

    cy.get(selectors.cartSubtotal).invoke("text").then(text => {
      this.subtotal = parseFloat(text.replace(/[^0-9.-]/g, ""));
      expect(this.subtotal).to.be.closeTo(this.totalProductPrice, 0.01);
    });

    cy.get(selectors.discountAmount).invoke("text").then(text => {
      this.discount = parseFloat(text.replace(/[^0-9.-]/g, ""));
    });

    cy.get(selectors.shippingAmount).invoke("text").then(text => {
      this.shipping = parseFloat(text.replace(/[^0-9.-]/g, ""));
    }).then(() => {
      const expectedTotal = this.subtotal + this.shipping + this.discount;
      cy.get(selectors.orderTotalAmount).invoke("text").then(text => {
        this.orderTotalAmount = parseFloat(text.replace(/[^0-9.-]/g, ""));
        expect(this.orderTotalAmount).to.be.closeTo(expectedTotal, 0.01);
      });
    });
  }
}

export const placeMultipleProductsPage = new PlaceMultipleProductsPage();
