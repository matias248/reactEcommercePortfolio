describe('Store Crud Test', () => {
  it('Create a new store', () => {
    cy.visit('stores');
    cy.get('#fixedButton').click();

    cy.get('[name="name"]').type('StoreCypress');
    cy.get('[name="address.city"]').type('City');

    cy.get('[name="address.state"]').type('state');
    cy.get('[name="address.zipCode"]').type('31000');
    cy.get('[name="address.streetNumber"]').type('4');
    cy.get('[name="location.latitude"]').type('1.2');
    cy.get('[name="location.longitude"]').type('1.2');

    cy.get('[name="address.streetName"]').type('streetName');
    cy.get('[name="submitButton"]').click();
    //Verify data. Normally it is the store with id number 3.
    cy.get('#storeElementGallery3').should('exist')
      .should('contain', 'StoreCypress')
      .should('contain', 'City')
      .find('#divNoImageSet').should('exist');


  })
  it('Read a store', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();
    cy.get('[name="name"]').should('have.value', 'Simple Store');
    cy.get('[name="address.city"]').should('have.value', 'Simple City D.C');

    cy.get('[name="address.state"]').should('have.value', 'Simple Country');
    cy.get('[name="address.zipCode"]').should('have.value', '31000');
    cy.get('[name="address.streetNumber"]').should('have.value', '0');
    cy.get('[name="location.latitude"]').should('have.value', '1');
    cy.get('[name="location.longitude"]').should('have.value', '2');

    cy.get('[name="address.streetName"]').should('have.value', 'Street Name');

  })
  it('Update a store', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();

    cy.get('[name="imageUrl"]').should('have.value', '/store1.jpeg').clear();

    cy.get('[name="name"]').should('have.value', 'Simple Store').type('Updated');
    cy.get('[name="address.city"]').should('have.value', 'Simple City D.C').type('Updated');

    cy.get('[name="address.state"]').should('have.value', 'Simple Country').type('Updated');
    cy.get('[name="address.zipCode"]').should('have.value', '31000').clear().type('31001');
    cy.get('[name="address.streetNumber"]').should('have.value', '0').type('1');
    cy.get('[name="location.latitude"]').should('have.value', '1').type('.2');
    cy.get('[name="location.longitude"]').should('have.value', '2').type('.4');

    cy.get('[name="address.streetName"]').should('have.value', 'Street Name').type('Updated');
    cy.get('[name="submitButton"]').click();

    cy.get('#storeElementGallery1').should('exist')
      .should('contain', 'Simple StoreUpdated')
      .should('contain', 'Simple City D.CUpdated')
      .find('#divNoImageSet').should('exist');

    cy.get('#editButton1').click();

    cy.get('[name="name"]').should('have.value', 'Simple StoreUpdated');
    cy.get('[name="address.city"]').should('have.value', 'Simple City D.CUpdated');

    cy.get('[name="address.state"]').should('have.value', 'Simple CountryUpdated');
    cy.get('[name="address.zipCode"]').should('have.value', '31001');
    cy.get('[name="address.streetNumber"]').should('have.value', '01');
    cy.get('[name="location.latitude"]').should('have.value', '1.2');
    cy.get('[name="location.longitude"]').should('have.value', '2.4');

    cy.get('[name="address.streetName"]').should('have.value', 'Street NameUpdated');
  })

  it('Delete a store', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();

    cy.get('[name="deleteButton"]').click();

    cy.contains('List of stores');
    cy.get('#storeElementGallery1').should('not.exist')

  })
  it('Cancel a store update', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();

    cy.get('[name="address.streetName"]').should('have.value', 'Street Name').type('Updated');
    cy.get('[name="cancelButton"]').click();

    cy.get('#editButton1').click();

    cy.get('[name="address.streetName"]').should('have.value', 'Street Name');
  })

})

describe('Test Displays if store doesn t exist ', () => {
  it('Test Display in store form', () => {
    cy.visit('stores/99');
    cy.get('#itemNotFound').should('exist');
  })
})