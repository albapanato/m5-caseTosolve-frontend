describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should render the header with correct title and subtitle', () => {
    cy.get('h1').contains('Films');
    cy.get('h2').contains('Feel your films');
  });

  it('should display the welcome message', () => {
    cy.get('p[data-cy="intro"]').should(
      'contain',
      'Welcome to a unique place where you can express your feelings about the films you have watched, and share them with the whole world.'
    );
  });

  it('should go to the Films list when the link clicks', () => {
    cy.get(
      'a[aria-label="Access to the list of films clicking in this icon button."]'
    ).click();
    cy.url().should('include', '/list');
  });

  it('should go to /register when click on "create your account here"', () => {
    cy.get('a').contains('create your account here').click();
    cy.url().should('include', '/register');
  });

  it('should go to /login when the Login button is clicked', () => {
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/login');
  });
});
