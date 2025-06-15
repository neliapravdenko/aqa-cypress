/// <reference types="cypress" />
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';

describe('Using fake response in API request', () => {
  it.only('Change username', () => {
    const fakeResponseBody = {
      status: 'ok',
      data: {
        userId: 230414,
        photoFilename: 'default-user.png',
        name: 'Polar',
        lastName: 'Bear',
      },
    };

    cy.intercept('GET', '**/api/users/profile', fakeResponseBody).as('profileRequest');
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials('pravdenko2001@gmail.com', 'Test12345!');
    cy.get('h1').should('have.text', 'Garage');
    cy.get('[routerlink="profile"]').click();
    cy.wait('@profileRequest');
    cy.get('h1').should('be.visible').and('have.text', 'Profile');
    cy.get('.profile_name')
      .invoke('text')
      .then((text) => text.trim())
      .should('eq', 'Polar Bear');
  });
});
