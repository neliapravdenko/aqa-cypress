/// <reference types="cypress" />
//cypress-plugin-api

describe('API tests using Plagin', () => {
  let sid;

  it('POST login', () => {
    const user = {
      email: 'pravdenko2001@gmail.com',
      password: 'Test12345!',
    };

    cy.api('POST', '/api/auth/signin', user).then((response) => {
      const token = response.headers['set-cookie'][0].split(';')[0];
      expect(typeof token).to.be.eq('string');
      sid = token;
    });
  });
  it('GET current user without login', () => {
    cy.api({
      method: 'GET',
      url: `/api/users/current`,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.be.eq('Not authenticated');
    });
  });

  it('DELETE not existing car', () => {
    cy.api({
      method: 'DELETE',
      url: `/api/cars/1234567`,
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(404);
      expect(deleteResponse.body.message).to.be.eq('Car not found');
    });
  });
});
