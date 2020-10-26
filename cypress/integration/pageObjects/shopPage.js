class ShopPage 
{
checkoutButton()
{
  return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
}
checkoutButton2()
{
  return cy.get(':nth-child(6) > :nth-child(5) > .btn')
}
deliveryInput()
{
  return cy.get('#country')
}
deliveryDropDown()
{
  return cy.get('.suggestions > ul > li > a')
}
checkBoxLabel()
{
  return cy.get('.checkbox > label')
}
purchaseButton()
{
  return cy.get('.ng-untouched > .btn')
}
alertAssertionText()
{
  return cy.get('.alert strong')
}

}

export default ShopPage;