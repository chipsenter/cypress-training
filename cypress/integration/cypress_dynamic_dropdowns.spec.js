/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />

import 'cypress-iframe'
import HomePage from './pageObjects/homePage'
import ShopPage from './pageObjects/shopPage'

describe('Cypress Automation Course 2020', function () {
  Cypress.config('defaultCommandTimeout', 15000)

  // Before hooks will always fire once before every IT function
  before(function () {
    cy.fixture('udemy').then(function (user) {
      this.user = user;
    })
  })

  // Dynamic Dropdowns
  it('Cypress Dynamic DropDowns', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('#autocomplete').type('swe')

    cy.get('.ui-menu-item div').each(($el, index, $list) => {

      if ($el.text() === "Sweden") {
        $el.click()
        cy.log($el)
      }

    })
    cy.get('#autocomplete').should('have.value', 'Sweden')

  })

})