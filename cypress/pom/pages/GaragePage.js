class GaragePage {
  get pageHeader() {
    return cy.contains('h1', 'Garage');
  }

  get addNewCarButton() {
    return cy.get('app-garage .btn-primary');
  }

  get brandDropdown() {
    return cy.get('#addCarBrand');
  }

  get modelDropdown() {
    return cy.get('#addCarModel');
  }
  get mileageField() {
    return cy.get('#addCarMileage');
  }

  get submitAddingFormButton() {
    return cy.get('app-add-car-modal .btn-primary');
  }
  get addNewCarFormHeader() {
    return cy.get('.modal-header');
  }

  get addedCarNames() {
    return cy.get('p.car_name');
  }

  addNewCar(brand, model, mileage) {
    this.addNewCarButton.should('be.visible').click();
    this.brandDropdown.should('be.visible').select(brand);
    this.modelDropdown.should('be.visible').select(model);
    this.mileageField.should('be.visible').type(mileage);
    this.submitAddingFormButton.should('be.visible').click();
  }

  verifyLastAddedCar(carName) {
    this.addedCarNames.first().should('have.text', carName);
  }
}

export default new GaragePage();
