describe('Product Form Test', () => {
    it('Submit without puting all the data', () => {
        cy.visit('stores/1/products/');
        cy.get('#fixedButton').click();
        cy.get('[name="submitButton"]').click();
        //stays in creation page
        cy.contains('Create a new product');

        cy.get('[name="name"]').type('Product');
        //stays in creation page after only putting name
        cy.get('[name="submitButton"]').click();

        cy.contains('Create a new product');

        //stays in creation page after putting also city
        cy.get('textarea[name="description"]').type('Description');
        cy.get('[name="submitButton"]').click();

        //Verify data. Normally it is the store with id number 3.
        cy.get('#productElementGallery4').should('exist')
    })

    it('Submit puting data in wrong format', () => {
        cy.visit('stores/1/products/');
        cy.get('#fixedButton').click();
        
        cy.get('[name="name"]').type('123456789X123456789X123456');
        cy.get('textarea[name="description"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,');
        cy.get('[name="price"]').type('A');

        cy.get('[name="submitButton"]').click();

        cy.get('[name="name"]').should('have.css', 'background-color', 'rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="price"]').should('have.css', 'background-color', 'rgb(254, 202, 202)').parent().should('contain', 'Only numbers allowed');
        cy.get('textarea[name="description"]').should('have.css', 'background-color', 'rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 500');


        cy.get('[name="name"]').clear().should('have.css', 'background-color', 'rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="name"]').type('correct Name').should('have.css', 'background-color', 'rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('[name="price"]').clear().should('have.css', 'background-color', 'rgb(254, 202, 202)').parent().should('contain', 'Only numbers allowed');
        cy.get('[name="price"]').type('1,3').should('have.css', 'background-color', 'rgb(249, 250, 251)').parent().should('not.contain', 'Only numbers allowed');

        cy.get('textarea[name="description"]').clear().should('have.css', 'background-color', 'rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 500');
        cy.get('textarea[name="description"]').type('correct state').should('have.css', 'background-color', 'rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 500');
    })
})
