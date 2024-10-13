describe('AppRoutes', () => {
  it('should navigate to Home page', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').contains('Films').should('be.visible');
    cy.get('h2').contains('Feel your films').should('be.visible');
  });

  it('should navigate to Register page', () => {
    cy.visit('http://localhost:5173/register');
    cy.contains('Get Registered').should('be.visible');
  });

  it('should navigate to Login page', () => {
    cy.visit('http://localhost:5173/login');
    cy.contains('Login').should('be.visible');
  });

  it('should navigate to List page', () => {
    cy.visit('http://localhost:5173/list');
    cy.contains('Feel your Films').should('be.visible');
  });

  it('should navigate to Film Detail page with id', () => {
    cy.visit('http://localhost:5173/detail/1');
  });

  it('should navigate to CreateOrEditFilm page', () => {
    cy.visit('http://localhost:5173/create');
    cy.contains('Create Film').should('be.visible');
  });

  it('should display an ErrorPage', () => {
    cy.visit('http://localhost:5173/unknown-route');
    cy.get('img')
      .should('have.attr', 'src', '/vincent.gif')
      .and('have.attr', 'alt', 'Vincent from Pulp Fiction');
  });
});
