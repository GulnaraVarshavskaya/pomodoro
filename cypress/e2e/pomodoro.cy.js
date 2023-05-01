describe('progressBar', () => {
  it('passes', () => {
    cy.visit("http://localhost:3000/")
    cy.get("text").should("have.text", "25:00")
    cy.get("button").contains("start").click()
    cy.get("text").should("not.have.text", "25:00")
    cy.get("button").contains("pause").click()
  })
})