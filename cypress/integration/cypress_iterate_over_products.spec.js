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

  it('Iterate over products', function () {


    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    //selenium get hit url in browser, cypress get acts like findElement of selenium

    //Parent child chaining
    cy.get('.products').as('productLocator')
    cy.get('@productLocator').find('.product').each(($el, index, $list) => {

      const textVeg = $el.find('h4.product-name').text()
      if (textVeg.includes('Cashews')) {
        $el.find('button').click()
      }
    })
    cy.get('.cart-icon > img').click()
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/cart')
    cy.get(':nth-child(14)').click()

  })

})
