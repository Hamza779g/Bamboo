import { wishlistSelectors } from "./selectors/wishlistCheckoutProductsPage.selectors";
import { selectors } from "../pageObjects/selectors/placeMultipleProductsPage.selectors";

export class WishlistPage {
  visitJacketPage() {
    cy.visit("/men/tops-men/jackets-men.html");
  }

  visitWishlistPage() {
    cy.visit("/wishlist/");
  }

  addFirstNProductsToWishlist(count = 1) {
    let addedCount = 0;

    const addNextProduct = () => {
      if (addedCount >= count) return;

      this.visitJacketPage();

      cy.get(selectors.productCard, { timeout: 12000 }).then(($cards) => {
        const index = addedCount;

        cy.get(selectors.productCard)
          .eq(index)
          .scrollIntoView()
          .trigger("mouseover");

        cy.wait(1500);
        cy.get(selectors.productCard)
          .eq(index)
          .find(wishlistSelectors.wishlistIcon, { timeout: 12000 })
          .click({ force: true });

        cy.wait(2000).then(() => {
          addedCount++;
          addNextProduct();
        });
      });
    };

    addNextProduct();
  }

  addWishlistProducts(count = 1) {
    let totalPrice = 0;

    cy.get(wishlistSelectors.wishlistProductCard, { timeout: 12000 })
      .then(($cards) => Cypress._.slice($cards, 0, count))
      .each(($card) => {
        // cy.wrap($card)
          cy.get(wishlistSelectors.wishlistProductPrice)
          .invoke("text")
          .then((priceText) => {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
            console.log("######33 price : - ", price);
            
            totalPrice += price;

            console.log("######33 totalPrice : - ", totalPrice);
          });

        console.log("######## totalPrice :- ", totalPrice)

        cy.wrap($card)
          .trigger("mouseover")
          .find(selectors.addToCartButton)
          .click({ force: true });

        cy.get(selectors.colorSwatch).first().click({ force: true });
        cy.get(selectors.sizeSwatch).contains("XS").click({ force: true });
        cy.get(wishlistSelectors.wishlistAddtoCartBtn).click();
        cy.wait(3500);
      })
      .then(() => {
        cy.wrap(totalPrice).as("wishlistTotalPrice");
      });
  }

  verifyMiniCartPrices() {
    let selectedTotal = 0;

    cy.wait(5000);
    cy.get(selectors.miniCartToggle).click();
    cy.wait(1000);

    cy.get(selectors.miniCartPrice)
      .each(($price) => {
        const priceText = $price.text();
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        selectedTotal += price;

        console.log("######## selectedTotal :- ", selectedTotal);
        
      })
      .then(() => {
        cy.get("@wishlistTotalPrice").then((expectedTotal) => {

          expect(selectedTotal).to.be.closeTo(expectedTotal, 0.01);
        });
      });
  }
}

export const wishlistPage = new WishlistPage();
