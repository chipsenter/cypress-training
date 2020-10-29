

Cypress.Commands.add('selectProduct', (productName) => {
    cy.get('h4.card-title').each(($el, index, $list) => {
        if ($el.text().includes(productName)) {
            cy.get('button.btn.btn-info').eq(index).click()

        }
    })
})


// Cypress.Commands.add('logout', () => {
    //     Cypress.config('defaultCommandTimeout', 15000)
    //     cy.visit('/')
    //     cy.wait(500)

    //     cy.get('body').then(body => {
    //         if (body.find('#nav-link_account-dropdown').length > 0) {
    //             cy.get('#nav-link_account-dropdown').click({ force: true })
    //             cy.get('#nav-link_account-dropdown_log-out').click()
    //             cy.get('.uscca-header__desktop-login').should('be.visible')

    //         } else {
    //             cy.get('.uscca-header__desktop-login')
    //             cy.log('already logged out!')

    //         }
    //     })
    // })


// Cypress.Commands.add('login', (email='z9152705662+3@gmail.com', password='Test123!') => {
//     Cypress.config('defaultCommandTimeout', 15000)
//     cy.visit('/')
//     cy.wait(500)

//     cy.get('body').then(body => {
//         if (body.find('.uscca-header__desktop-login').length > 0) {
//             cy.get('.uscca-header__desktop-login').click()

//             cy.get('#signinEmail').type(email)
//             cy.get('#continueButton').click()
//             cy.get('#signinPassword').type(password)
//             cy.get('#signInSignInButton').click()
//             cy.get('#nav-link_account-dropdown').should('be.visible')

//         } else {
//             cy.get('#nav-link_account-dropdown')
//             cy.log('already logged in!')
//         }
//     })

// })

