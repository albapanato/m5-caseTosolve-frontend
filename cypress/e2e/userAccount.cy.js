describe('User account', () => {
  it('should log in successfully and redirect to the films list', () => {
    cy.login();
    cy.url().should('include', '/list');
  });

  it('should display greetings and user controls', () => {
    cy.login();
    cy.contains('Hi Pepe Moreno Garcia').should('be.visible');
    cy.contains('ADD A FILM').should('be.visible');
    cy.contains('YOUR FILMS').should('be.visible');
    cy.contains('LOG OUT').should('be.visible');
  });

  describe('Add Films by Genre', () => {
    const genres = [
      'Action',
      'Sci-Fi',
      'Drama',
      'Comedy',
      'Animation',
      'Horror',
    ];

    beforeEach(() => {
      cy.login();
      cy.fixture('movies.json').as('movies');
    });

    genres.forEach((genre) => {
      it(`should allow the user to add a ${genre} film`, function () {
        const film = this.movies.find((movie) => movie.genre === genre);

        if (film) {
          cy.contains('ADD A FILM').click();
          cy.url().should('include', '/create');
          cy.get('input[name="title"]').type(film.title);
          cy.get('input[name="release"]').type(film.yearOfRelease);
          cy.get('select[name="genre"]').select(film.genre);
          cy.get('textarea[name="synopsis"]').type(film.synopsis);
          console.log('Attaching poster:', film.poster);
          cy.get('input[name="poster"]').attachFile(film.poster);
          cy.get('form').submit();
          cy.contains('GREAT SUCCESS!!').should('be.visible');
          cy.url().should('include', '/list');
        }
      });
    });

    describe('should allow you to see the details of a film', () => {
      it('Looking for Inside Out movie', () => {
        cy.visit('http://localhost:5173/list');
        cy.contains('Inside Out').should('be.visible');
        cy.contains('Inside Out').click();
        cy.url().should('match', /\/detail\/[a-zA-Z0-9]+$/);
        cy.get('img').should('have.attr', 'alt', 'Inside Out');
        cy.contains('Inside Out (Animation)').should('be.visible');
        cy.contains('Released in 2015').should('be.visible');
        cy.contains(
          'After a girl moves to a new city, her emotions conflict on how best to navigate a new life.'
        ).should('be.visible');
      });
    });
  });

  describe('UPDATE & DELETE funtionallity', () => {
    beforeEach(() => {
      cy.login();
      cy.contains('Mad Max: Fury Road').should('be.visible');
      cy.contains('Mad Max: Fury Road').click();
      cy.url().should('match', /\/detail\/[a-zA-Z0-9]+$/);
    });

    it('should navigate to edit film page when clicking the EDIT button', () => {
      cy.contains('EDIT').should('be.visible').click();
      cy.url().should('include', '/update/');
      cy.get('input[name="title"]').should('have.value', 'Mad Max: Fury Road');
      cy.get('input[name="release"]').should('have.value', '2015');
      cy.get('textarea[name="synopsis"]').should(
        'have.value',
        'In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrant and his army.'
      );
    });

    it('should delete the film and return to the film list', () => {
      cy.contains('DELETE').should('be.visible').click();
      cy.contains('The film has been deleted').should('be.visible');
      cy.url().should('include', '/list');
      cy.contains('Mad Max: Fury Road').should('not.exist');
    });
  });

  describe('LOG OUT button and functionallity', () => {
    beforeEach(() => {
      cy.login();
      cy.url().should('include', '/list');
    });

    it('should log the user out and redirect to the home page', () => {
      cy.contains('LOG OUT').should('be.visible').click();
      cy.contains('SEE YOU SOON').should('be.visible');
      cy.url().should('eq', 'http://localhost:5173/');
      cy.contains('Hi Pepe Moreno Garcia').should('not.exist');
      cy.visit('http://localhost:5173/');
    });
  });
});
