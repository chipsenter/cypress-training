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

  // Radio Buttons
  it('Cypress Radio Buttons', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('input[name="radioButton"]').should('be.visible')
      .check(['radio1', 'radio2', 'radio3'])
      .wait(2000)
      .click({ multiple: true }, ['radio1', 'radio2', 'radio3'])
    cy.get('h1').scrollIntoView()

  })

})


