import selectors from "../pageObjects/selectors/productSearchPage.selectors";

export class SearchListProductsPage {
  visitJacketPage() {
    cy.visit("/men/tops-men/jackets-men.html");
  }

  searchAndValidateFirstProduct() {
    cy.get(selectors.productName, { timeout: 12000 })
      .first()
      .then(($productName) => {
        const searchProduct = $productName.text().trim();

        cy.get(selectors.searchInput, { timeout: 12000 }).type(
          `${searchProduct}{downarrow}{enter}`
        );

        cy.get(selectors.productName, { timeout: 12000 })
          .first()
          .then(($searchedProduct) => {
            const searchedProductInListText = $searchedProduct.text().trim();
            expect(searchedProductInListText).to.equal(searchProduct);
          });
      });
  }
}

export const searchListProductsPage = new SearchListProductsPage();
