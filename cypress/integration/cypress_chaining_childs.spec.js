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
  it('Cypress Chaining childs', function () {

    // rahulshettyacademy.com/AutomationPractice
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

    cy.url().should('include', 'https://rahulshettyacademy.com/seleniumPractise/#/')
    cy.get('.search-keyword').type('ca')
    cy.get('.product').should('have.length', 5)
    cy.get('.product:visible').should('have.length', 4)

    // Parent child chaining
    cy.get('.products').as('productLocator')
    cy.get('@productLocator').find('.product').should('have.length', 4)
    cy.get(':nth-child(3) > .product-action > button').click()
    cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click().then(function () {
      console.log("Cypress Automation in test")
    })

    // Iterating over an Array of products
    cy.get('@productLocator').find('.product').each(($el, index, $list) => {

      const textVeg = $el.find('h4.product-name').text()
      if (textVeg.includes('Cashews')) {
        console.log(textVeg)
        $el.find('button').click()
      } else {
        cy.contains('ADD TO CART').click()
      }
    })

    // Assert if logo text is correctly displayed
    cy.get('.brand').should('have.text', 'GREENKART')

    // This is to print in logs 
    cy.get('.brand').then(function (logoElement) {
      cy.log(logoElement.text())
    })
    cy.get('footer > p').then(function (footerText) {
      cy.log(footerText.text())
    })

    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()

  })

})

