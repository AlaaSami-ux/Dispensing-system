Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Cannot get cached sections - PWA is not enabled in d2.config.js')) {
      return false
    }
  })
  

context('Test modals', () => {
    //Husk å sette opp server og hoste applikasjon før testing
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      
        cy.get('.input [id="server"]')
        .clear().type("http://localhost:9999")
        cy.get('.input [id="j_username"]')
        .clear().type("admin")
        cy.get('.input [id="j_password"]')
        .clear().type("district")
        cy.get('button').click()
    })


      //Tests clickability for each cell
  it('.Test visning av stock-balance og trykking av modal', () => {
    let i = 0
    const cells = cy.get('[data-test="dhis2-uicore-tablebody"]')
    .get('[data-test="dhis2-uicore-datatablecell"]')
    cells.each((index) => {
      const cell = cy.get('[data-test="dhis2-uicore-tablebody"]')
      .get('[data-test="dhis2-uicore-datatablecell"]')
      cell
      .eq(i)
      .click()
      cy.get('[data-test="dhis2-uicore-button"]').eq(1).click({force: true})})
  })
})