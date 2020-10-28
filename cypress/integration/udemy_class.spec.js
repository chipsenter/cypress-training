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

    //========================================================================// 

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

    //=======================================================================//

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

  it('More iteration and working with Alias ', function () {

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
    cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click()

    cy.get('@productLocator').find('.product').each(($el, index, $list) => {

      const textVeg = $el.find('h4.product-name').text()
      if (textVeg.includes('Cashews')) {
        console.log(textVeg)
        $el.find('button').click()
      } else {
        cy.contains('ADD TO CART').click()
      }
    })

    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()

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

  it('Cypress CheckBoxes', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    cy.get('#checkBoxOption2').should('not.be.checked').and('have.value', 'option2')
    cy.get('#checkBoxOption3').check().should('be.checked').and('have.value', 'option3')
    cy.get('#checkBoxOption3').uncheck().should('not.be.checked').and('have.value', 'option3')
    cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    cy.get('input[type="checkbox"]').uncheck(['option1', 'option2', 'option3'])

  })

  // Static Dropdowns
  it('Cypress Static DropDowns', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('select').select('option2').should('have.value', 'option2')

  })

  // Dynamic Dropdowns
  it('Cypress Dynamic DropDowns', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#autocomplete').type('swe')

    cy.get('.ui-menu-item div').each(($el, index, $list) => {

      if ($el.text() === "Sweden") {
        $el.click()
        cy.log($el)
      }

    })
    cy.get('#autocomplete').should('have.value', 'Sweden')

  })

  // Hidden values
  it('Cypress Hidden Not Hidden Values', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

  })

  // Radio Buttons
  it('Cypress Radio Buttons', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('input[name="radioButton"]').should('be.visible')
      .check(['radio1', 'radio2', 'radio3'])
      .wait(2000)
      .click({ multiple: true }, ['radio1', 'radio2', 'radio3'])
    cy.get('h1').scrollIntoView()

  })

  // ALERTS / Pop-Ups / Confirm 
  it('Cypress Pop Ups / Alerts / Confirm', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

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

  // Workaround opening links in new tabs
  it('Cypress Navigating to new window', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#opentab').invoke('removeAttr', 'target').click()

  })
  // Navigating back to main page
  it('Cypress Navigating browser back', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'https://www.rahulshettyacademy.com/')
    // .go syntax back
    cy.go('back')
    cy.url().should('include', 'https://rahulshettyacademy.com/AutomationPractice')


  })

  it('Cypress Validating Web tables', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

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

  it('Cypress Mouseover Actions', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#mousehover').next().invoke('show')
    cy.contains('Top').should('be.visible').click({ force: true })
    cy.url('include', 'top')
  })

  // Validating links open URL
  it('Cypress Handling Child Windows', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    cy.get('#opentab').then(function (el) {
      const url = el.prop('href')
      cy.visit(url)
      cy.log(url)

    })
  })

  it('Cypress Handling IFrames', function () {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice")

    // 1. Work in frames start with below code frameLoaded
    cy.frameLoaded('#courses-iframe').should('be.visible')

    // 2. When your inside of the IFRAME start with .iframe().find() instead of .get() 
    cy.iframe().find("a[href*='mentorship']").eq(0).click()

    cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
  })

  it('Cypress Handling Fixture files', function () {

    const homePage = new HomePage()
    const shopPage = new ShopPage()
    cy.visit("https://rahulshettyacademy.com/angularpractice")

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

  it('Cypress TDD driven Testing', function () {

    const homePage = new HomePage()
    const shopPage = new ShopPage()

    cy.visit("https://rahulshettyacademy.com/angularpractice")

    homePage.shopButton().click()

    // Data Driven Testing , using Commands.js
    this.user.productName.forEach(function (element) {

      cy.selectProduct(element)
      cy.log(element)

    })
    shopPage.checkoutButton().click()
    shopPage.checkoutButton2().click()
    shopPage.deliveryInput().type(this.user.country)

    shopPage.deliveryDropDown().click()
    shopPage.checkBoxLabel().click()
    shopPage.purchaseButton().click()

    shopPage.alertAssertionText().should('have.text', 'Success!')

  })

  it('Cypress Add products to cart and validate', function () {

    const shopPage = new ShopPage()

    cy.visit("https://rahulshettyacademy.com/angularpractice")



  })

  it('Cypress Add products to cart and validate', function () {

    cy.visit("https://rahulshettyacademy.com/angularpractice")

    cy.get(':nth-child(2) > .nav-link').click()

    // Data Driven Testing , using Commands.js
    this.user.productName.forEach(function (element) {

      cy.selectProduct(element)

      cy.log(element)
    })


  })

  it.only('Cypress Sum Total Value in Cart', function () {

    const homePage = new HomePage()
    const shopPage = new ShopPage()
    cy.visit("https://rahulshettyacademy.com/angularpractice")

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

    var sum = 0;

    cy.get('tr td:nth-child(4) > strong').each(($el, index, $list) => {

      const total_amount = $el.text()
      var result = total_amount.split(" ")
      result = result[1].trim()
      cy.log(result)
      
      // Convert String to Int
      sum = Number(sum) + Number(result);
      // Asynch function - resolve promise
    }).then(function () {
      cy.log('Total sum in list is ' + sum)
    })

    cy.get('h3 > strong').then(function (element) {

      const total_amount = element.text()
      var result = total_amount.split(" ")
      var total = result[1].trim()
      cy.log('Shopping-cart total is ' + result)

      // Convert String to Int
      expect(Number(total)).to.equal(Number(sum))

    })

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


