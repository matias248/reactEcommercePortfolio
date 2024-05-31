describe('Store Crud Test', () => {
  it('Create a new product', () => {
    cy.visit('stores/1/products');
    cy.contains('List of products');
    cy.get('#fixedButton').click();
    cy.contains('Create a new product');

    cy.get('[name="name"]').type('ProductCypress');
    cy.get('textarea[name="description"]').type('Description');
    cy.get('[name="price"]').type('1');

    cy.get('[name="category"]').type('state');
    cy.get('[name="inventoryStatus"]').type('31000');

    cy.get('[name="submitButton"]').click();
    //Verify data. Normally it is the product with id number 4.
    cy.get('#productElementGallery4').should('exist')
      .should('contain', 'ProductCypress')
      .should('contain', 'Description')
      .find('#divNoImageSet').should('exist');


  })
  it('Read a product', () => {
    cy.visit('stores/1/products');

    cy.get('#productElementGallery1').should('contain', 'Bamboo Watch').click();
    cy.get('[name="name"]').should('have.value', 'Bamboo Watch');
    cy.get('textarea[name="description"]').should('have.value', 'Product Description');
    cy.get('[name="price"]').should('have.value', '65');

    cy.get('[name="category"]').should('have.value', 'Accessories');
    cy.get('[name="inventoryStatus"]').should('have.value', 'INSTOCK');
  })

  it('Update a product', () => {
    cy.visit('stores/1/products');
    cy.get('#productElementGallery1').click();
    cy.get('[name="imageUrl"]').should('have.value', 'bamboo-watch.jpg').clear();
    cy.get('[name="name"]').should('have.value', 'Bamboo Watch').type('Updated');
    cy.get('textarea[name="description"]').should('have.value', 'Product Description').type('Updated');

    cy.get('[name="price"]').should('have.value', '65').type('.1');
    cy.get('[name="category"]').should('have.value', 'Accessories').select(1);
    cy.get('[name="inventoryStatus"]').should('have.value', 'INSTOCK').select(1);

    cy.get('[name="submitButton"]').click();


    cy.get('#productElementGallery1').should('exist').should('contain','Bamboo WatchUpdated')
      .find('#divNoImageSet').should('exist').click();

    cy.get('[name="imageUrl"]').should('have.value', '')

    cy.get('[name="name"]').should('have.value', 'Bamboo WatchUpdated');
    cy.get('textarea[name="description"]').should('have.value', 'Product DescriptionUpdated');

    cy.get('[name="price"]').should('have.value', '65.1');
    cy.get('[name="category"]').should('have.value', 'Fitness');
    cy.get('[name="inventoryStatus"]').should('have.value', 'LOWSTOCK');
  })
  
  it('Delete a product',()=>{
    cy.visit('stores/1/products');

    cy.get('#productElementGallery1').click();

    cy.get('[name="deleteButton"]').click();

    cy.contains('List of products');
    cy.get('#productElementGallery1').should('not.exist')

  })
  it('Cancel a product update',()=>{
    cy.visit('stores/1/products');
    cy.get('#productElementGallery1').click();

    cy.get('[name="name"]').should('have.value', 'Bamboo Watch').type('new name');
    cy.get('[name="cancelButton"]').click();
    cy.get('#productElementGallery1').click();
    cy.get('[name="name"]').should('have.value','Bamboo Watch');

  })
  
})