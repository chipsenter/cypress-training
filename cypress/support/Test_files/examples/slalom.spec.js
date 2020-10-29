/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />

describe('slalom_tasks', () => {
    
   

    it('Lets check out Slalom web', function () {
      cy.visit('https://slalombuild.com')
      cy.get('.nav-icon-wrap').click()

      // Side menu Primary
      cy.get('.primary > :nth-child(1) > a')
        .should('be.visible')
      cy.get('.primary > :nth-child(2) > a')
        .should('be.visible')
      cy.get('.primary > :nth-child(3) > a')
        .should('be.visible')
      cy.get('.primary > :nth-child(4) > a')
        .should('be.visible')
      cy.get('.primary > :nth-child(5) > a')
        .should('be.visible')

      // Side menu Secondary
      cy.get('.secondary > :nth-child(1) > a')
      .should('have.text', 'The Blueprint')
      cy.get('.secondary > :nth-child(2) > a')
      .should('have.text', 'News')
      cy.get('.secondary > :nth-child(3) > a')
      .should('have.text', 'Contact')

      // Accept Cookies 
      cy.get('.optanon-alert-box-button-middle > .optanon-allow-all').click()
        
      //Check out the Careers page 
      cy.get('.primary > :nth-child(4) > a').click()

      //Check out Slalom builds openings 
      
    
      cy.contains('See our openings').invoke('removeAttr', 'target').click()
      cy.url().should('include', 'https://slalom.secure.force.com/buildcareers')
      // .go syntax back
      cy.go('back')
      cy.url().should('include', 'https://www.slalombuild.com/careers')
     
  })

  it('Lets check out Slalom web', function () {
    cy.visit('https://slalom.secure.force.com/buildcareers')
   
  })

})  