describe('Store Form Test', () => {
    it('Submit without puting all the data', () => {
        cy.visit('stores/');
        cy.get('#fixedButton').click();
        cy.get('[name="submitButton"]').click();
        //stays in creation page
        cy.contains('Create a new store');
        
        cy.get('[name="name"]').type('StoreCypress');
        //stays in creation page after only putting name
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also city
        cy.get('[name="address.city"]').type('City');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also currency
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also state
        cy.get('[name="address.state"]').type('France');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also zipCode
        cy.get('[name="address.zipCode"]').type('31000');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also streetNumber
        cy.get('[name="address.streetNumber"]').type('12');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also streetName
        cy.get('[name="address.streetName"]').type('MMMM');
        cy.get('[name="submitButton"]').click();

        //Verify data. Normally it is the store with id number 3.
        cy.get('#storeElementGallery3').should('exist')
    })

    it('Submit puting data in wrong format', () => {
        cy.visit('stores/');
        cy.get('#fixedButton').click();
   
        cy.contains('Create a new store');

        cy.get('[name="name"]').type('123456789X123456789X123456');       

        cy.get('[name="address.city"]').type('123456789X123456789X123456');

        cy.get('[name="address.state"]').type('123456789X123456789X123456');

        cy.get('[name="address.zipCode"]').type('123456789X123456789X123456');

        cy.get('[name="address.streetNumber"]').type('123456789X123456789X123456');

        cy.get('[name="address.streetName"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,');
        
        cy.get('[name="location.latitude"]').type('A');
        cy.get('[name="location.longitude"]').type('A');
    
        cy.get('[name="submitButton"]').click();

        cy.get('[name="name"]').should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.city"]').should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.state"]').should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.zipCode"]').should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.streetNumber"]').should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'Only numbers allowed');
        cy.get('[name="location.latitude"]').should('have.css', 'background-color','rgb(254, 202, 202)');
        cy.get('[name="location.longitude"]').should('have.css', 'background-color','rgb(254, 202, 202)');
        cy.get('[name="address.streetName"]').should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 500');
        
        cy.get('[name="name"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="name"]').type('correct Name').should('have.css', 'background-color','rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('[name="address.city"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.city"]').type('correct city').should('have.css', 'background-color','rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 25');
     
        cy.get('[name="address.state"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.state"]').type('correct state').should('have.css', 'background-color','rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('[name="address.zipCode"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[name="address.zipCode"]').type('correct state').should('have.css', 'background-color','rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('[name="address.streetNumber"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'Only numbers allowed');
        cy.get('[name="address.streetNumber"]').type('1').should('have.css', 'background-color','rgb(249, 250, 251)').parent().should('not.contain', 'Only numbers allowed');

        cy.get('[name="address.streetName"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent().should('contain', 'The size should be between 0 and 500');
        cy.get('[name="address.streetName"]').type('street Name').should('have.css', 'background-color','rgb(249, 250, 251)').parent().should('not.contain', 'The size should be between 0 and 500');
        
        cy.get('[name="location.latitude"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent()
        cy.get('[name="location.latitude"]').type('1').should('have.css', 'background-color','rgb(249, 250, 251)').parent()

        cy.get('[name="location.longitude"]').clear().should('have.css', 'background-color','rgb(254, 202, 202)').parent()
        cy.get('[name="location.longitude"]').type('1').should('have.css', 'background-color','rgb(249, 250, 251)').parent()
    })

})
