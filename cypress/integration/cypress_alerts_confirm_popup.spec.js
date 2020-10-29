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

  // ALERTS / Pop-Ups / Confirm 
  it('Cypress Pop Ups / Alerts / Confirm', function () {

    cy.visit(Cypress.env('url') + '/AutomationPractice')

    cy.get('#alertbtn').click()
    cy.get('#confirmbtn').click()
    // Window Alerts 
    cy.on('window:alert', (str) => {

      // Mocha
      expect(str).to.equal('Hello , share this practice page and share your knowledge')

    })
    cy.on('window:confirm', (str) => {

      // Mocha
      expect(str).to.equal('Hello , Are you sure you want to confirm?')

    })

  })

})