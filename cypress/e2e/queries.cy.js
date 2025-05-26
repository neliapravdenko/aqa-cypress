/// <reference types="cypress" />

describe('Hillel Auto: Main Page tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Header Section - Navigation Elements Verification', () => {
    it('should get header logo using "get" with CSS selector', () => {
      cy.get('.header_logo');
    });

    it('should find "Guest log in" button using "contains"', () => {
      //1st way
      cy.contains('Guest log in');

      //2nd way
      cy.get('button').contains('Guest log in');
    });

    it('should find the last "a" element using "find" and "last"', () => {
      cy.get('header').find('a').last();
    });

    it('should verify number of nav elements using "its"', () => {
      cy.get('.btn.header-link').its('length').should('eq', 3);
    });

    it('should find previous "a" element to About button using "prev"', () => {
      cy.get('[appscrollto="aboutSection"]').prev('a');
    });
  });

  context('Content Section - interacting with modals and content', () => {
    it('should switch modal windows using "within" and "should"', () => {
      cy.contains('Sign In').click();
      cy.wait(1000);
      cy.get('.modal-title').should('have.text', 'Log in');
      cy.get('.modal-footer').within(() => {
        cy.get('.btn-link').click();
        cy.wait(1000);
      });
      cy.get('.modal-title').should('have.text', 'Registration');
    });

    it('should check "Remember me" checkbox using "invoke"', () => {
      cy.contains('Sign In').click();
      cy.wait(1000);
      cy.get('#remember').invoke('prop', 'checked', true);
      cy.get('#remember').invoke('prop', 'checked').should('be.true');
    });

    it('should verify description text using "then" and "wrap"', () => {
      cy.get('.about-block_title')
        .contains('Log fuel expenses')
        .parent()
        .find('.about-block_descr')
        .invoke('text')
        .then((descriptionText) => {
          cy.log('Description text: ' + descriptionText);
          cy.wrap(descriptionText).should(
            'equal',
            'Keep track of your replacement schedule and plan your vehicle maintenance expenses in advance.'
          );
        });
    });

    it('should use alias for "Sign up" button', () => {
      cy.get('[class*="hero-descriptor_btn"]').as('signUpButton');
      cy.get('@signUpButton').click();
      cy.wait(1000);
      cy.get('@signUpButton').should('be.visible');
      cy.get('@signUpButton').should('have.text', 'Sign up');
    });
  });

  context('Contacts Section - locating and verifying elements', () => {
    it('should find h2 inside contacts section using "find"', () => {
      cy.get('#contactsSection').find('h2');
    });

    it('should get parent of social links using "parent"', () => {
      cy.get('.socials_link').parent();
    });

    it('should filter telegram icon using "filter"', () => {
      cy.get('.socials_link span').filter('[class*="icon-telegram"]');
    });

    it('should verify each social link has href using "each"', () => {
      cy.get('.socials_link').each(($link) => {
        cy.wrap($link).should('have.attr', 'href');
      });
    });
  });
});
