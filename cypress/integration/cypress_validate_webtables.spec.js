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

  it('Cypress Validating Web tables', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('tr td:nth-child(2)').each(($el, index, $list) => {

      const webTableText = $el.text()
      if (webTableText.includes("Python")) {
        cy.get('tr td:nth-child(2)').eq(index).next().then(function (price) {
          const priceText = price.text()
          expect(priceText).to.equal('25')
        })
      }
    })
  })

})