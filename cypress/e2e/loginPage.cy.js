describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display an error when username or password is missing', () => {
    cy.get('input[name="user"]').type('testUser');
    cy.get('form').submit();
    cy.contains('ERROR').should('be.visible');
    cy.contains('INVALID USERNAME OR PASSWORD').should('be.visible');
  });

  it('should show invalid login with error message', () => {
    cy.get('input[name="user"]').type('invalidUser');
    cy.get('input[name="password"]').type('invalidPassword');
    cy.get('form').submit();
    cy.contains('ERROR').should('be.visible');
    cy.contains('INVALID USERNAME OR PASSWORD').should('be.visible');
  });

  it('should display login success and redirect to films list', () => {
    cy.login();
    cy.contains('LOGIN SUCCESS!').should('be.visible');
    cy.url().should('include', '/list');
    cy.visit('http://localhost:5173/list');
  });

  it('should reset the form after successful login', () => {
    cy.login();
    cy.get('input[name="user"]').should('have.value', '');
    cy.get('input[name="password"]').should('have.value', '');
  });
});
