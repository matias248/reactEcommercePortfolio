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

describe("Navigation Buttons", () => {
    it("Home", () => {
        cy.visit('/');

        cy.get('#NavigationFormsApp').should('exist');
        cy.get('#NavigationShopApp').should('exist');
        cy.get('#NavigationFinanceApp').should('exist');


    }),
    it("ToForms", () => {
        cy.visit('/');

        cy.get('#NavigationFormsApp').click().should('not.exist');
        cy.get('#NavigationShopApp').should('exist');
        cy.get('#NavigationFinanceApp').should('exist');


        cy.location().should((location:Location) => {
            expect(location.pathname).to.eq('/stores')
        })
    })
    it("To Shop", () => {
        cy.visit('/');

        cy.get('#NavigationShopApp').click().should('not.exist');
        cy.get('#NavigationFinanceApp').should('exist');
        cy.get('#NavigationFormsApp').should('exist');

        cy.location().should((location:Location) => {
            expect(location.pathname).to.eq('/shop')
        })
    })
    it("To Finance", () => {
        cy.visit('/');

        cy.get('#NavigationFinanceApp').click().should('not.exist');
        cy.get('#NavigationShopApp').should('exist');
        cy.get('#NavigationFormsApp').should('exist');

        

        cy.location().should((location:Location) => {
            expect(location.pathname).to.eq('/finance')
        })
    })
})



