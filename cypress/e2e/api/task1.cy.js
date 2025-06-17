/// <reference types="cypress" />

describe('API tests for /api/cars', () => {
  let sid;

  before(() => {
    const user = {
      email: 'pravdenko2001@gmail.com',
      password: 'Test12345!',
    };

    cy.request('POST', '/api/auth/signin', user).then((response) => {
      const token = response.headers['set-cookie'][0].split(';')[0];
      expect(typeof token).to.be.eq('string');
      expect(response.status).to.be.eq(200);
      sid = token;
    });
  });

  it('GET all user cars /api/cars using "should"', () => {
    cy.request('GET', '/api/cars').its('status').should('eq', 200);
  });

  it('GET cars models /api/cars/models using "then"', () => {
    cy.request('GET', '/api/cars/models').then((response) => {
      const body = response.body.data;
      expect(body.length).to.be.eq(23);
      expect(body[0].title).to.be.eq('TT');
    });
  });

  it('POST new car /api/cars', () => {
    const newCar = {
      carBrandId: 2,
      carModelId: 7,
      mileage: 350,
    };

    cy.request({
      method: 'POST',
      url: '/api/cars',
      body: newCar,
      headers: {
        Cookie: sid,
      },
    }).then((response) => {
      const body = response.body.data;
      expect(response.status).to.be.eq(201);
      expect(body.carBrandId).to.be.eq(newCar.carBrandId);
      expect(body.carModelId).to.be.eq(newCar.carModelId);
      expect(body.mileage).to.be.eq(newCar.mileage);
    });
  });

  it('PUT edit cars mileage /api/cars/{id}', () => {
    const newCar = {
      carBrandId: 1,
      carModelId: 2,
      mileage: 100,
    };

    // First create a car (POST)
    cy.request({
      method: 'POST',
      url: '/api/cars',
      body: newCar,
      headers: { Cookie: sid },
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(201);
      const carId = postResponse.body.data.id;

      // Now edit the car (PUT)
      const editedCar = {
        carBrandId: 1,
        carModelId: 2,
        mileage: 321,
      };

      cy.request({
        method: 'PUT',
        url: `/api/cars/${carId}`,
        body: editedCar,
        headers: { Cookie: sid },
      }).then((putResponse) => {
        expect(putResponse.status).to.eq(200);
        expect(putResponse.body.data.mileage).to.eq(editedCar.mileage);
      });
    });
  });

  it('Delete a car /api/cars/{id}', () => {
    const newCar = {
      carBrandId: 3,
      carModelId: 11,
      mileage: 45,
    };

    // Create the car (POST)
    cy.request({
      method: 'POST',
      url: '/api/cars',
      body: newCar,
      headers: { Cookie: sid },
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(201);
      const carId = postResponse.body.data.id;

      // Delete a car (DELETE)
      cy.request({
        method: 'DELETE',
        url: `/api/cars/${carId}`,
        headers: { Cookie: sid },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });
  });
});
