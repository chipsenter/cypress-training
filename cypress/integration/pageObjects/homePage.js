class HomePage
{
nameInput() 
{
  return cy.get('form input.form-control:nth(0)')
}
emailInput()
{
  return cy.get('form input.form-control:nth(1)')
}
passwordInput()
{
  return cy.get('form input.form-control:nth(2)')
}
genderInput()
{
  return cy.get('select')
}
radioButton() 
{
  return cy.get('#inlineRadio3')
} 
shopButton()
{
  return cy.get(':nth-child(2) > .nav-link')
}
 

}

export default HomePage;