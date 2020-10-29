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

  it('Cypress Add products to cart and validate', function () {
    const homePage = new HomePage()
    const shopPage = new ShopPage()

    cy.visit(Cypress.env('url') + '/angularpractice')

    cy.get(':nth-child(2) > .nav-link').click()

    // Data Driven Testing , using Commands.js
    this.user.productName.forEach(function (element) {

      cy.selectProduct(element)

      cy.log(element)
    })

  })

})