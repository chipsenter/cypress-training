/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />

import 'cypress-iframe'
import HomePage from '../integration/pageObjects/homePage'
import ShopPage from '../integration/pageObjects/shopPage'

describe('Cypress Automation Course 2020', function () {
  Cypress.config('defaultCommandTimeout', 15000)

  // Before hooks will always fire once before every IT function
  before(function () {
    cy.fixture('udemy').then(function (user) {
      this.user = user;
    })
  })

  it('Cypress CheckBoxes', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    cy.get('#checkBoxOption2').should('not.be.checked').and('have.value', 'option2')
    cy.get('#checkBoxOption3').check().should('be.checked').and('have.value', 'option3')
    cy.get('#checkBoxOption3').uncheck().should('not.be.checked').and('have.value', 'option3')
    cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    cy.get('input[type="checkbox"]').uncheck(['option1', 'option2', 'option3'])

  })

})