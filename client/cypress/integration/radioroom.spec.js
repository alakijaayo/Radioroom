describe('homepage', () => {
  it('opens homepage and displays login', () => {
    cy.visit("http://localhost:3000")
    cy.contains('RadioRoom')
    cy.contains('To get started, please login via Spotify')
    cy.contains('Note: To enjoy the full experience of RadioRoom you need to have a Spotify Premium subscription')
  })

  it('opens homepage and displays login', () => {
    cy.visit("http://localhost:3000")
    cy.contains('Login to Spotify').click()
    cy.url().should('eq', 'http://localhost:8888/')
})

})
