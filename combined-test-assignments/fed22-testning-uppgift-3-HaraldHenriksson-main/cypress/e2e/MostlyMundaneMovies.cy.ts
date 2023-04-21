export { }

describe('Home page', () => {
	it('passes', () => {
		cy.visit('https://mostly-mundane-movies.netlify.app/')
	})

	context('Happy path', () => {

		beforeEach(() => {
			cy.visit('https://mostly-mundane-movies.netlify.app/')
		})

		it('Cant search without a title', () => {
			cy.get('[type="submit"]').click()

			cy.get('div.alert-heading.h4').contains('Aww').should('be.visible')
		})

		it('Cand search with less than 3 chars', () => {
			cy.get('input[aria-describedby="btnMovieSearch"]').type('it')

			cy.get('[type="submit"]').click()

			cy.get('div.alert-heading.h4').contains('Wow').should('be.visible')
		})

		it('Can search for The Matrix and get at least X hits', () => {
			cy.get('input[aria-describedby="btnMovieSearch"]').type('The Matrix')

			cy.get('[type="submit"]').click()

			const X = 10
			cy.get('div.movie-list-item').should('have.length.at.least', X)
		})

		it('When searching a loading spinner should appear', () => {
			cy.get('input[aria-describedby="btnMovieSearch"]').type('The Matrix')

			cy.get('[type="submit"]').click()

			cy.get('[type="image/png"]').should('exist')
		})

		it('Can can click on a movie when the loader is finished and should take you to a page where url is matching id of movie', () => {
			cy.get('input[aria-describedby="btnMovieSearch"]').type('The Matrix')

			cy.get('[type="submit"]').click()

			cy.get('div.movie-list-item').should('exist')

			cy.get('.card').first().invoke('attr', 'data-imdb-id').then((imdbId) => {
				const id = imdbId

				cy.get('.card-link').first().click()
				cy.url().should('include', id)
			})

			//  first movie id hard coded 'tt0133093'
			//cy.url().should('include', 'tt0133093')
		})

		it('Can serach for "Isaks Memes" and 0 movies should be found', () => {
			cy.get('input[aria-describedby="btnMovieSearch"]').type('Isaks Memes')

			cy.get('[type="submit"]').click()

			cy.get('div[role="alert"].alert-warning').should('contain.text', 'Movie not found!')
		})

		it('A serach form "the postman always rings twice" should timeout', () => {
			cy.get('input[aria-describedby="btnMovieSearch"]').type('the postman always rings twice')

			cy.get('[type="submit"]').click()

			cy.wait(5000)

			cy.get('div[role="alert"].alert-warning').should('contain.text', '👀')
		})

		it('Go to url with id "tt1336" should a error message show', () => {
			cy.visit('https://mostly-mundane-movies.netlify.app/movies/tt1337')

			cy.get('div[role="alert"].alert-warning').should('contain.text', 'LOL, what a fail')
		})
	})
})


describe('Mocked request', () => {

	it('should display search results using mocked data', () => {
		cy.intercept('GET', 'https://www.omdbapi.com/?s=The%20Matrix*', { fixture: 'searchResults.json' })
		cy.visit('/')
		cy.wait(1500)

		cy.get('input[aria-describedby="btnMovieSearch"]').type('The Matrix')
		cy.get('[type="submit"]').click()
		cy.get('.movie-list-item').should('have.length', 2)

	})

	it('should show information about movie the matrix', () => {
		cy.intercept('GET', 'https://www.omdbapi.com/?s=The%20Matrix*', { fixture: 'searchResults.json' })
		cy.visit('/')
		cy.wait(1500)

		cy.get('input[aria-describedby="btnMovieSearch"]').type('The Matrix')
		cy.get('[type="submit"]').click()

		cy.intercept('GET', 'https://www.omdbapi.com/?s=The%20Matrix*', { fixture: 'thematrixResponse.json' })

		cy.get('.card-link').first().click()
		cy.get('p.card-text').contains('When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.')
	})
})
