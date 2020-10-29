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

  it('Cypress Handling IFrames', function () {

    cy.visit(Cypress.env('url') + "/AutomationPractice")

    // 1. Work in frames start with below code frameLoaded
    cy.frameLoaded('#courses-iframe').should('be.visible')

    // 2. When your inside of the IFRAME start with .iframe().find() instead of .get() 
    cy.iframe().find("a[href*='mentorship']").eq(0).click()

    cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
  })

})