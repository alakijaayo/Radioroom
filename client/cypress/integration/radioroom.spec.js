
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
    cy.contains('RadioRoom Sign In:')
})
})

describe('User Interface', () => {

  it('welcomes user', () => {
    cy.visit("http://localhost:3000/#access_token=BQC3H27ZnzCa5iHef6jscDMUWOAbBV2NB2OzYvxUMN7fT_7lUpzENVEWfqXCpXJXW8WNr0RFtD_xuS_AldP2TejB2H49eByJbiyuUu1M8NXTgvwz6MTABN2DrYq55pwak3vlIwI0ikK1AMVgluRU_EZbQXonyNKC1fQWw6U94RtaqJU&refresh_token=AQBcdb8nY-DLy886RS1iXO77mLhmm21DywGzKt26DdcX79-lV6hOsbuxwLmtEiAFzL2gX5LBkqQeX2M8ZX_S0WcgTXSdx_hv_myqmUAAPXtcI_E-KUY--c_ClksP0D9k_FeK9Q&user_name=Nic%20Giles&user_id=gilesinho&user_image_url=https%3A%2F%2Fplatform-lookaside.fbsbx.com%2Fplatform%2Fprofilepic%2F%3Fasid%3D10152071135318831%26height%3D200%26width%3D200%26ext%3D1545336663%26hash%3DAeS6iN26gDns_yZL")
    cy.contains('Nic Giles (gilesinho) is in da house!')
})

it('allows user to search for track', () => {
  const typedText = "It's not unusual"
  cy.visit("http://localhost:3000/#access_token=BQC3H27ZnzCa5iHef6jscDMUWOAbBV2NB2OzYvxUMN7fT_7lUpzENVEWfqXCpXJXW8WNr0RFtD_xuS_AldP2TejB2H49eByJbiyuUu1M8NXTgvwz6MTABN2DrYq55pwak3vlIwI0ikK1AMVgluRU_EZbQXonyNKC1fQWw6U94RtaqJU&refresh_token=AQBcdb8nY-DLy886RS1iXO77mLhmm21DywGzKt26DdcX79-lV6hOsbuxwLmtEiAFzL2gX5LBkqQeX2M8ZX_S0WcgTXSdx_hv_myqmUAAPXtcI_E-KUY--c_ClksP0D9k_FeK9Q&user_name=Nic%20Giles&user_id=gilesinho&user_image_url=https%3A%2F%2Fplatform-lookaside.fbsbx.com%2Fplatform%2Fprofilepic%2F%3Fasid%3D10152071135318831%26height%3D200%26width%3D200%26ext%3D1545336663%26hash%3DAeS6iN26gDns_yZL")
  cy.get('form').first().within(() => {
    cy.get('input[type="text"]').type(typedText)
  })
})

it('allows users to chat', () => {
  const chat = 'Hi there'
  cy.visit("http://localhost:3000/#access_token=BQC3H27ZnzCa5iHef6jscDMUWOAbBV2NB2OzYvxUMN7fT_7lUpzENVEWfqXCpXJXW8WNr0RFtD_xuS_AldP2TejB2H49eByJbiyuUu1M8NXTgvwz6MTABN2DrYq55pwak3vlIwI0ikK1AMVgluRU_EZbQXonyNKC1fQWw6U94RtaqJU&refresh_token=AQBcdb8nY-DLy886RS1iXO77mLhmm21DywGzKt26DdcX79-lV6hOsbuxwLmtEiAFzL2gX5LBkqQeX2M8ZX_S0WcgTXSdx_hv_myqmUAAPXtcI_E-KUY--c_ClksP0D9k_FeK9Q&user_name=Nic%20Giles&user_id=gilesinho&user_image_url=https%3A%2F%2Fplatform-lookaside.fbsbx.com%2Fplatform%2Fprofilepic%2F%3Fasid%3D10152071135318831%26height%3D200%26width%3D200%26ext%3D1545336663%26hash%3DAeS6iN26gDns_yZL")
  cy.get('form').last().within(() => {
  cy.get('textarea').type('howdy')
  cy.get('#messagelist').find('li')
  })
})


})
