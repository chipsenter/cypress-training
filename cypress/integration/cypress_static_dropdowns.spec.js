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

  // Static Dropdowns
  it('Cypress Static DropDowns', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('select').select('option2').should('have.value', 'option2')

  })

})