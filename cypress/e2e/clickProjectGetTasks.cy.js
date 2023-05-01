describe('click the project', () => {
  it('allows click the project see the tasks', () => {
    //go to page
    cy.visit('http://localhost:3000/')
    //open the modal
    cy.get("#openToDo").click()
    //click project
    cy.get("#projectArrow").click()
  })
})