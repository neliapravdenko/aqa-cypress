/// <reference types="cypress" />

//selectors
const registrationModal = '.modal-content';
const registerButton = 'button:contains("Register")';
const modalTitle = '.modal-title';
const modalBody = '.modal-body';
const alertMessage = '.alert';
const errorMessage = '.invalid-feedback p';
const nameInput = '#signupName';
const lastNameInput = '#signupLastName';
const emailInput = '#signupEmail';
const passwordInput = '#signupPassword';
const repeatPasswordInput = '#signupRepeatPassword';
const profileHeader = 'My profile';

//test data
const currentTimestamp = Date.now();
const validName = 'Nelia';
const validLastName = 'Testing';
const validEmail = `pravdenko2001+${currentTimestamp}@gmail.com`;
const validPassword = 'Test123!';

const invalidName = {
  short: 'N',
  long: 'Nelitestingtestingtes',
  nonEnglish: 'Неля',
  withSpaces: ' Nelia',
};

const invalidLastName = {
  short: 'P',
  long: 'Nelitestingtestingtes',
  nonEnglish: 'Правденко',
};

const invalidEmail = {
  noAt: 'pravdenko2001gmail.com',
  noPrefix: '@gmail.com',
  noDomain: 'pravdenko2001@',
  noTld: 'pravdenko2001@gmail',
};

const invalidPassword = {
  short: 'Test123',
  long: 'Test123456789012',
  noNumber: 'Test!test',
  noCapital: 'test1234!',
  noSmall: 'TEST1234!',
};

describe('Registration functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.hero-descriptor_btn.btn.btn-primary').click();
    cy.get(registrationModal).should('be.visible');
  });

  context('Positive user registration validation', () => {
    it('should register new user', () => {
      cy.get(registerButton).should('be.disabled');

      cy.get(modalBody).within(() => {
        cy.get(nameInput).should('be.empty').type(validName);
        cy.get(lastNameInput).should('be.empty').type(validLastName);
        cy.get(emailInput).should('be.empty').type(validEmail);
        cy.get(passwordInput).should('be.empty').type(validPassword);
        cy.get(repeatPasswordInput).should('be.empty').type(validPassword);
      });

      cy.get(registerButton).should('not.be.disabled').click();
      cy.contains(profileHeader).should('be.visible');
    });
  });

  context('"Registration" text validation', () => {
    it('should display correct header text', () => {
      cy.get(modalTitle).should('have.text', 'Registration');
    });
  });

  context('Field "Name" validation', () => {
    it('should be mandatory', () => {
      cy.get(lastNameInput).type(validLastName);
      cy.get(emailInput).type(validEmail);
      cy.get(passwordInput).type(validPassword);
      cy.get(repeatPasswordInput).type(validPassword);
      cy.get(registerButton).should('be.disabled');
      cy.get(registerButton).click({ force: true });
      cy.get(alertMessage).should('have.text', 'Name is invalid');
    });

    it('should show error when empty', () => {
      cy.get(nameInput).focus().blur();
      cy.get(errorMessage).should('have.text', 'Name required');
    });

    it('should show error for non-English characters', () => {
      cy.get(nameInput).type(invalidName.nonEnglish).blur();
      cy.get(errorMessage).should('have.text', 'Name is invalid');
    });

    it('should show error for too short name', () => {
      cy.get(nameInput).type(invalidName.short).blur();
      cy.get(errorMessage).should('have.text', 'Name has to be from 2 to 20 characters long');
    });

    it('should show error for too long name', () => {
      cy.get(nameInput).type(invalidName.long).blur();
      cy.get(errorMessage).should('have.text', 'Name has to be from 2 to 20 characters long');
    });

    it('should trim spaces', () => {
      //leading spaces
      cy.get(nameInput).type('  Nelia').blur();
      cy.get(nameInput)
        .invoke('val')
        .then((val) => {
          expect(val.trim()).to.equal('Nelia');
        });
      cy.get(errorMessage).should('not.exist');

      //trailing spaces
      cy.get(nameInput).clear().type('Nelia  ').blur();
      cy.get(nameInput)
        .invoke('val')
        .then((val) => {
          expect(val.trim()).to.equal('Nelia');
        });
      cy.get(errorMessage).should('not.exist');

      //in the middle
      cy.get(nameInput).clear().type('Nelia Testing').blur();
      cy.get(nameInput).should('have.value', 'Nelia Testing');
      cy.get(errorMessage).should('not.exist');
    });

    it('should have red border when invalid', () => {
      cy.get(nameInput).focus().blur();
      cy.get(nameInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Field "Last name" validation', () => {
    it('should be mandatory', () => {
      cy.get(nameInput).type(validName);
      cy.get(emailInput).type(validEmail);
      cy.get(passwordInput).type(validPassword);
      cy.get(repeatPasswordInput).type(validPassword);
      cy.get(registerButton).should('be.disabled');
      cy.get(registerButton).click({ force: true });
      cy.get(alertMessage).should('have.text', 'Last Name is invalid');
    });

    it('should show error when empty', () => {
      cy.get(lastNameInput).focus().blur();
      cy.get(errorMessage).should('have.text', 'Last name required');
    });

    it('should show error for non-English characters', () => {
      cy.get(lastNameInput).type(invalidLastName.nonEnglish).blur();
      cy.get(errorMessage).should('have.text', 'Last name is invalid');
    });

    it('should show error for too short last name', () => {
      cy.get(lastNameInput).type(invalidLastName.short).blur();
      cy.get(errorMessage).should('have.text', 'Last name has to be from 2 to 20 characters long');
    });

    it('should show error for too long last name', () => {
      cy.get(lastNameInput).type(invalidLastName.long).blur();
      cy.get(errorMessage).should('have.text', 'Last name has to be from 2 to 20 characters long');
    });

    it('should trim spaces', () => {
      //leading spaces
      cy.get(lastNameInput).type('  Testing').blur();
      cy.get(lastNameInput)
        .invoke('val')
        .then((val) => {
          expect(val.trim()).to.equal('Testing');
        });
      cy.get(errorMessage).should('not.exist');

      //trailing spaces
      cy.get(lastNameInput).clear().type('Testing  ').blur();
      cy.get(lastNameInput)
        .invoke('val')
        .then((val) => {
          expect(val.trim()).to.equal('Testing');
        });
      cy.get(errorMessage).should('not.exist');

      //in the middle
      cy.get(lastNameInput).clear().type('Testing Name').blur();
      cy.get(lastNameInput).should('have.value', 'Testing Name');
      cy.get(errorMessage).should('not.exist');
    });

    it('should have red border when invalid', () => {
      cy.get(lastNameInput).focus().blur();
      cy.get(lastNameInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Field "Email" validation', () => {
    it('should be mandatory', () => {
      cy.get(nameInput).type(validName);
      cy.get(lastNameInput).type(validLastName);
      cy.get(passwordInput).type(validPassword);
      cy.get(repeatPasswordInput).type(validPassword);
      cy.get(registerButton).should('be.disabled');
      cy.get(registerButton).click({ force: true });
      cy.get(alertMessage).should('have.text', 'Email is incorrect');
    });

    it('should show error for email without @', () => {
      cy.get(emailInput).type(invalidEmail.noAt).blur();
      cy.get(errorMessage).should('have.text', 'Email is incorrect');
    });

    it('should show error for email without prefix', () => {
      cy.get(emailInput).type(invalidEmail.noPrefix).blur();
      cy.get(errorMessage).should('have.text', 'Email is incorrect');
    });

    it('should show error for email without domain', () => {
      cy.get(emailInput).type(invalidEmail.noDomain).blur();
      cy.get(errorMessage).should('have.text', 'Email is incorrect');
    });

    it('should show error for email without TLD', () => {
      cy.get(emailInput).type(invalidEmail.noTld).blur();
      cy.get(errorMessage).should('have.text', 'Email is incorrect');
    });

    it('should show error when empty', () => {
      cy.get(emailInput).focus().blur();
      cy.get(errorMessage).should('have.text', 'Email required');
    });

    it('should have red border when invalid', () => {
      cy.get(emailInput).focus().blur();
      cy.get(emailInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Field "Password" validation', () => {
    it('should be mandatory', () => {
      cy.get(nameInput).type(validName);
      cy.get(lastNameInput).type(validLastName);
      cy.get(emailInput).type(validEmail);
      cy.get(repeatPasswordInput).type(validPassword);
      cy.get(registerButton).should('be.disabled');
      cy.get(registerButton).click({ force: true });
      cy.get(alertMessage).should('have.text', 'Password is incorrect');
    });

    it('should show error for too short password', () => {
      cy.get(passwordInput).type(invalidPassword.short).blur();
      cy.get(errorMessage).should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('should show error for too long password', () => {
      cy.get(passwordInput).type(invalidPassword.long).blur();
      cy.get(errorMessage).should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('should show error for password without number', () => {
      cy.get(passwordInput).type(invalidPassword.noNumber).blur();
      cy.get(errorMessage).should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('should show error for password without capital letter', () => {
      cy.get(passwordInput).type(invalidPassword.noCapital).blur();
      cy.get(errorMessage).should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('should show error for password without small letter', () => {
      cy.get(passwordInput).type(invalidPassword.noSmall).blur();
      cy.get(errorMessage).should(
        'have.text',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    it('should show error when empty', () => {
      cy.get(passwordInput).focus().blur();
      cy.get(errorMessage).should('have.text', 'Password required');
    });

    it('should have red border when invalid', () => {
      cy.get(passwordInput).focus().blur();
      cy.get(passwordInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Field "Re-enter password" validation', () => {
    it('should be mandatory', () => {
      cy.get(nameInput).type(validName);
      cy.get(lastNameInput).type(validLastName);
      cy.get(emailInput).type(validEmail);
      cy.get(passwordInput).type(validPassword);
      cy.get(registerButton).should('be.disabled');
      cy.get(registerButton).click({ force: true });
      cy.get(alertMessage).should('have.text', 'Passwords do not match');
    });

    it('should show error when passwords do not match', () => {
      cy.get(passwordInput).type(validPassword);
      cy.get(repeatPasswordInput).type(`${validPassword}!`);
      cy.get(repeatPasswordInput).blur();
      cy.get(errorMessage).should('have.text', 'Passwords do not match');
    });

    it('should show error when empty', () => {
      cy.get(repeatPasswordInput).focus().blur();
      cy.get(errorMessage).should('have.text', 'Re-enter password required');
    });

    it('should have red border when invalid', () => {
      cy.get(repeatPasswordInput).focus().blur();
      cy.get(repeatPasswordInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('"Register" button validation', () => {
    it('should be disabled when form is empty', () => {
      cy.get(registerButton).should('be.disabled');
    });

    it('should be disabled when any field is invalid', () => {
      cy.get(nameInput).type(validName);
      cy.get(lastNameInput).type(validLastName);
      cy.get(emailInput).type(validEmail);
      cy.get(passwordInput).type(validPassword);
      cy.get(repeatPasswordInput).type(`${validPassword}!`);
      cy.get(registerButton).should('be.disabled');
    });
  });
});
