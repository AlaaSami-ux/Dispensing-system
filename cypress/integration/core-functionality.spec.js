//Stopper cypress fra å registrere manglende pwa cache som en error
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Cannot get cached sections - PWA is not enabled in d2.config.js')) {
      return false
    }
  })
  

context('First test', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/')
      
        cy.get('.input [id="server"]')
        .clear().type("http://localhost:9999")
        cy.get('.input [id="j_username"]')
        .clear().type("admin")
        cy.get('.input [id="j_password"]')
        .clear().type("district")
        cy.get('button').click()
    })

    it('.Test bytte av aktiv side', () => {
      cy.get('ul li').eq(1).click()
      cy.get('ul li').eq(2).click()
      cy.get('ul li').eq(0).click()
    })

    it('Test changing value of commodity', () =>{
        cy.get('[data-test="dhis2-uicore-tablebody"]')
          .get('[data-test="dhis2-uicore-datatablecell"]')
          .eq(0)
          .click() //clicks the topmost datacell to get modal

        cy.get('.input [class="jsx-3353877153 jsx-2133963083 dense"]')
        .eq(2)
        .type('50', {force: true})
        .should('have.value', 50) //Enters desired value in input field (change not registered, unclear why)

        cy.get('[data-test="dhis2-uicore-button"]').first().click({force: true}) //Save changes
        cy.get('[data-test="dhis2-uicore-button"]').last().click({force: true}) //Exit modal
        
        cy.get('[data-test="dhis2-uicore-tablebody"]')
        .get('[data-test="dhis2-uicore-datatablecell"]')
        .eq(1)
        .should('have.text', 50)
    })
    //Dispenserer en commodity og sjekker at dispense registry er oppdatert
    it('.Test dispensing commodity', () => {
        cy.get('ul li').eq(1).click() //Navigates to 'Dispense'-page
    
        const commodity = cy.get('[data-test="dhis2-uicore-select-input"]').eq(0).click().get('[data-test="dhis2-uicore-singleselectoption"]').eq(0)
        commodity.click()

        cy.get('.input').type(5)
        cy.get('[data-test="dhis2-uicore-select-input"]').eq(1).click().get('[data-test="dhis2-uicore-singleselectoption"]').eq(0).click()
        cy.get('[data-test="dhis2-uicore-button"]').click() //Dispenserer en commodity
    
        cy.get('[class="jsx-3691749911 root"]').then(($div) => {
            const text = $div.eq(0).text()

            cy.get('ul li').eq(2).click() 
            const dispensedRow = cy.get('[data-test="dhis2-uicore-datatablerow"]').eq(1).get('[data-test="dhis2-uicore-datatablecell"]').eq(0)
            dispensedRow.eq(0).should('have.text', text)
        })
      })
})  