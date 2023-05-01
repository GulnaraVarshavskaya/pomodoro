describe('add a new project with Enter', () => {
  it('allows add a new project with Enter', () => {
    //go to page
    cy.visit('http://localhost:3000/')
    //open the modal
    cy.get("#openToDo").click()
    //add a project
    cy.get("button").contains("Add a project").click()
    //find input and type into it
    cy.get("#input").type("learn something{enter}")
    //check of the project was created
    cy.get("#projects").children().contains("learn something").should("exist")
    // cy.get("#done").contains("Done").click()
  });
  it('allows add a new project with Done btn', () => {
    //go to page
    cy.visit('http://localhost:3000/')
    //open the modal
    cy.get("#openToDo").click()
    //add a project
    cy.get("button").contains("Add a project").click()
    //find input and type into it
    cy.get("#input").type("learn something")
    cy.get("#done").contains("Done").click()
    //check of the project was created
    cy.get("#projects").children().contains("learn something").should("exist")
  });
  afterEach(() => {
    cy.task('projectCleanup')
  })
})
