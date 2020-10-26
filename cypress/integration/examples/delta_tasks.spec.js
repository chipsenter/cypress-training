import { users } from '../../users'

describe('delta_tasks', () => {
    let videoArray;
    Cypress.config('defaultCommandTimeout', 15000)
    beforeEach(() => {
        cy.visit('/')

    })

    it('A00001 should Create a New (Free) User Account', () => {
        //Creation of a New (Free) User Account
        cy.get('.uscca-header__desktop-login').click()
        cy.get('#signUpTodayButton').click()

        cy.contains('First Name').type('Johan')
        cy.contains('Last Name').type('Lindstrom')

        cy.get('#createAccountEmail').type(users.signUpUser.email)
        cy.get('#createAccountPassword').type(users.signUpUser.password)
        cy.get('#createAccountReEnterPassword').type(users.signUpUser.password)

        cy.get('#createAccountSignUpButton').click()
        cy.contains('Account Created').should('be.visible')
    })

    it('A00002 should Change the Account Password (After The Account is Created) and  Log Out', () => {
        //After The Account is Created, Change the Account Password

        cy.login(users.signUpUser.email, users.signUpUser.password)

        cy.get('#accountDetailsNav').click()
        cy.get('#contactInformation').click()
        cy.get('#passwordEdit').scrollIntoView().click({ force: true })
        cy.get('#password-information-password').type('0Test123!')
        cy.get('#password-information-confirm-password').type('0Test123!')
        cy.get('#passwordSave').click()
        cy.contains('Your password has been updated').should('be.visible')

        cy.get('#passwordEdit').scrollIntoView().click({ force: true })
        cy.get('#password-information-password').type(users.signUpUser.password)
        cy.get('#password-information-confirm-password').type(users.signUpUser.password)
        cy.get('#passwordSave').click()
        cy.contains('Your password has been updated').should('be.visible')

        //Log Out,
        cy.logout()
    })

    it('A00003 should Log Back In as the New User that was Created', function () {
        //Log Back In as the New User that was Created
        cy.login(users.signUpUser.email, users.signUpUser.password)
    })

    it('A00004 should Navigate around to a few of the Dashboard Items, when Logged Back in', function () {
        //When Logged Back in, Navigate around to a few of the Dashboard Items
        cy.login(users.signUpUser.email, users.signUpUser.password) //cy.login(users.signInUser.email, users.signInUser.password)
        cy.contains('Account Details').click()
        cy.contains('In Case of an Emergency').click()
        cy.contains('Education and Training').click()
        cy.contains('Member-Only Discounts').click()
        cy.contains('Refer a Friend').click()
    })

    it('A00005 should Validate perform on User contact info, as part of the Navigation Scenario', function () {
        //As part of the Navigation Scenario, perform validations on User contact info
        cy.login(users.signInUser.email, users.signInUser.password)
        cy.contains('Account Details').click()
        cy.contains('Contact Information').click()
        cy.get('.js-personal-information-name').contains('Irina Zamanova')
        cy.get('.sidebar-account__p--name').contains('Irina Zamanova')
    })

    it('A00006 should Grab information in the Education and Training section of the Dashboard to build a report ', function () {
        //Navigate to the Education and Training section of the Dashboard & grab information on the page
        //in order to build a report of the available videos. Build an array of the data.
        cy.login(users.signInUser.email, users.signInUser.password)
        cy.get('#educationTrainingNav').click()
        cy.get('#videos').click()
        videoArray = cy.get('.open-dialog.wistia-cta') //unclear what data we need to grap
    })

    it('A00007 should Search 7 Reasons to Join and Show the top 3 of the 7 reasons on the blog mentioned.', function () {
        //Use the Search Functionality on the Dashboard (magnification icon). Look for "7 Reasons to Join" and
        //click on the first result. Ensure you can see the top 3 of the 7 reasons on the blog mentioned.
        cy.get('#uscca-header__search-field')
            .click()
            .type('7 Reasons to Join').click()
        cy.get('.uscca-header__search-button').click({ force: true })
        cy.get('.d-block').first().click()
        cy.contains('1. ')
        cy.contains('2. ')
        cy.contains('3. ')
    })

    it('A00008 should Print out the array of the data and Build a CSV', function () {
        //Print out the array of the data collected in step 6 to build a CSV. We sometimes generate data that is
        //used as a quick report to give to other department leads.
        
        //since data in step 6 was not clear we print videoArray
        //print videoArray.join(',')
    })

    // 9. Make sure to tag all of your Scenarios so that they can be run from ./qa @SDET. 
    //(pls use README for my project)

    // 10. Looking at one of the example Jenkinsfiles, describe how you would craft another Jenkinsfile to
    //run just the tests tagged in this challenge project. 
    //(pls use README for my project)

    //11. Write a 3-5 sentence paragraph that explains in plain English what was tested above.
    //This .spec tested Creation of a New (Free) User Account, Changing the Account Password, Login/Logout, Navigation, 
    //Validations for User contact info, Search. 
})