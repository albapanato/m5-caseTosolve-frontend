describe('Register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });
  it('should render Header component with correct title and subtitle', () => {
    cy.get('h1').contains('Films');
    cy.get('h2').contains('Get Registered');
  });

  it('should successfully register when all fields are filled', () => {
    cy.get('input[name="user"]').type('Pepe Moreno Garcia');
    cy.get('input[name="email"]').type('pepe.mo@gmail.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();
    cy.contains('WELCOME TO FILMS').should('be.visible');
    cy.url().should('include', 'http://localhost:5173/login');
  });

  it('should show validation error when fields are empty', () => {
    cy.get('form').submit();
    cy.contains('REGISTER ERROR').should('be.visible');
  });
});
