describe("Navigation bar test", () => {
    it("In Store form to store list", () => {
        cy.visit('stores/1/');
        cy.get('#NavStoresTitle').click();
        cy.contains('List of stores');
    })
    it("In Product list to store list", () => {
        cy.visit('stores/1/products');
        cy.get('#NavStoresTitle').click();
        cy.contains('List of stores');
    })
    it("In Product list to store form", () => {
        cy.visit('stores/1/products');
        cy.get('#NavStoreName').click();
        cy.contains('Edit the store');
    })
    it("In Product form to store list", () => {
        cy.visit('stores/1/products/1');
        cy.get('#NavStoresTitle').click();
        cy.contains('List of stores');
    })
    it("In Product form to store form", () => {
        cy.visit('stores/1/products/1');
        cy.get('#NavStoreName').click();
        cy.contains('Edit the store');
    })
    it("In Product form to product list", () => {
        cy.visit('stores/1/products/1');
        cy.get('#NavProductName').click();
        cy.contains('Edit the product');
    })
})

