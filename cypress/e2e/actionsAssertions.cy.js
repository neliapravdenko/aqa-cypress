/// <reference types="cypress" />
describe('Registration functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('.modal-content').should('be.visible');
  });

  context('General positive tests', () => {
    it('"Registration" text should be written in header', () => {
      cy.get('.modal-title').should('have.text', 'Registration');
    });

    it('should register new user', () => {
      cy.contains('Register').should('be.disabled');
      cy.get('.modal-body').within(() => {
        cy.get('#signupName').should('be.empty');
        cy.get('#signupName').type('Nelia');
        cy.get('#signupLastName').should('be.empty');
        cy.get('#signupLastName').type('Testing');
        cy.get('#signupEmail').should('be.empty');
        cy.get('#signupEmail').type(`nelia.testemail+${Date.now()}@test.com`);
        cy.get('#signupPassword').should('be.empty');
        cy.get('#signupPassword').type('Test123!');
        cy.get('#signupRepeatPassword').should('be.empty');
        cy.get('#signupRepeatPassword').type('Test123!');
      });
      cy.contains('Register').should('not.be.disabled');
      cy.contains('Register').click();
      cy.contains('My profile').should('be.visible');
    });
  });

  context('Field "Name" verifying', () => {
    it('"Name" field should be mandatory', () => {
      cy.get('#signupLastName').should('be.empty');
      cy.get('#signupLastName').type('Testing');
      cy.get('#signupEmail').should('be.empty');
      cy.get('#signupEmail').type(`nelia.testemail+${Date.now()}@test.com`);
      cy.get('#signupPassword').should('be.empty');
      cy.get('#signupPassword').type('Test123!');
      cy.get('#signupRepeatPassword').should('be.empty');
      cy.get('#signupRepeatPassword').type('Test123!');
      cy.contains('Register').should('be.disabled');
      cy.contains('Register').click({ force: true });
      cy.get('.alert').should('have.text', 'Name is invalid');
    });

    it.only('error "Name is required" should appear', () => {
      cy.get('#signupName').focus();
      cy.get('#signupName').blur();
      cy.get('.invalid-feedback p').should('have.text', 'Name required');
    });
  });
});
