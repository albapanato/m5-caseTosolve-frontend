import 'cypress-file-upload'; //npm install --save-dev cypress-file-upload

const login = () => {
  cy.visit('http://localhost:5173/login');
  cy.get('input[name="user"]').type('Pepe Moreno Garcia');
  cy.get('input[name="password"]').type('password123');
  cy.get('form').submit();
};

Cypress.Commands.add('login', login);
