import HomePage from '../pom/pages/HomePage';
import GaragePage from '../pom/pages/GaragePage';
import ExpensesPage from '../pom/pages/ExpensesPage';
import SignInForm from '../pom/forms/SignInForm';

describe('Add new car and fuel expenses', () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(Cypress.env('AUTH_USERNAME'), Cypress.env('AUTH_PASSWORD'));
    GaragePage.pageHeader.should('be.visible');
  });

  it('Add [Ford] [Mondeo] car', () => {
    GaragePage.addNewCar('Ford', 'Mondeo', '123');
    GaragePage.verifyLastAddedCar('Ford Mondeo');
  });

  it('Add new expense for a car', () => {
    ExpensesPage.visit();
    ExpensesPage.addNewExpense(0, '40', '12');
    ExpensesPage.verifyLastAddedExpenseTotal('12');
  });
});
