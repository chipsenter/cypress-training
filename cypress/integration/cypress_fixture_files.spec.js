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

  it('Cypress Handling Fixture files', function () {

    const homePage = new HomePage()
    const shopPage = new ShopPage()

    cy.visit(Cypress.env('url') + '/angularpractice')

    //cy.get('@user').then(function(user) {})
    homePage.nameInput().type(this.user.name)
    homePage.emailInput().type(this.user.email)
    homePage.passwordInput().type(this.user.password)
    homePage.genderInput().select(this.user.gender2)
    cy.get('#inlineRadio2').check()

    // Assertion / validating data input
    cy.get('.ng-untouched').should('be.visible').and('have.value', this.user.name)
    cy.get('form input.form-control:nth(0)').should('have.attr', 'minlength', '2')
    homePage.radioButton().should('be.disabled')
    Cypress.config('defaultCommandTimeout', 8000)
    homePage.shopButton().click()

    this.user.productName.forEach(function (element) {

      cy.selectProduct(element)
    })
    shopPage.checkoutButton().click()
    shopPage.checkoutButton2().click()
    cy.get('#country').type('Sweden')
    cy.get('.suggestions > ul > li > a').click()
    cy.get('.checkbox > label').click()
    cy.get('.ng-untouched > .btn').click()

    cy.get('.alert').should('be.visible')
    cy.get('.alert').then(function (el) {

      const actualText = el.text()
      expect(actualText.includes('Success')).to.be.true
    })

  })

})