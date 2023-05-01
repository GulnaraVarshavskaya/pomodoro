describe('template spec', () => {
  it('open the modal and check a list of projects', () => {
    //go to page
    cy.visit('http://localhost:3000/')
    //open the modal
    cy.get("#openToDo").click()
    //see a list projects
    cy.get("#projects").children().should("have.length", 5)
  })
})