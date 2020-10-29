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

  // Workaround opening links in new tabs
  it('Cypress Navigating to new window', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('#opentab').invoke('removeAttr', 'target').click()

  })

  // Navigating back to main page
  it('Cypress Navigating browser back', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'https://www.rahulshettyacademy.com/')
    // .go syntax back
    cy.go('back')
    cy.url().should('include', 'https://rahulshettyacademy.com/AutomationPractice')


  })

})