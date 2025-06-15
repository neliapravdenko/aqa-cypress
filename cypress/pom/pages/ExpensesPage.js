class ExpensesPage {
  get addNewExpenseButton() {
    return cy.get('.btn-primary');
  }

  get addNewExpenseFormHeader() {
    return cy.contains('h4', 'Add an expense');
  }

  get vehicleDropdown() {
    return cy.get('#addExpenseCar');
  }

  get mileageField() {
    return cy.get('#addExpenseMileage');
  }

  get litersField() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostField() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitAddingFormButton() {
    return cy.get('app-add-expense-modal .btn-primary');
  }

  get addedExpenses() {
    return cy.get('.expenses_table tbody');
  }

  visit() {
    cy.visit('/panel/expenses');
  }

  increaseMileageField() {
    this.mileageField.invoke('val').then((currentValue) => {
      const currentMileage = parseInt(currentValue) || 1;

      const randomAddition = Math.floor(Math.random() * 10) + 1;
      const newMileage = currentMileage + randomAddition;

      this.mileageField.clear().type(newMileage.toString()).should('have.value', newMileage.toString());
    });

    return this;
  }

  addNewExpense(vehicle, liters, total) {
    this.addNewExpenseButton.should('be.visible').click();
    this.addNewExpenseFormHeader.should('be.visible');
    this.vehicleDropdown.should('be.visible').select(vehicle);
    this.increaseMileageField();
    this.litersField.should('be.visible').type(liters);
    this.totalCostField.should('be.visible').type(total);
    this.submitAddingFormButton.should('be.visible').click();
  }

  verifyLastAddedExpenseTotal(expenseTotal) {
    this.addedExpenses.first().should('contain', expenseTotal);
  }
}

export default new ExpensesPage();
