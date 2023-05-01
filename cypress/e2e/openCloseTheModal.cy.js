describe('toDoListModal', () => {
  it('allows open and close modal', () => {
    cy.visit("http://localhost:3000/")
    cy.get("#openToDo").click()
    cy.get("h1").contains("Projects");
    cy.get("#closeModal").click()
    cy.get("h1").contains("Projects").should("not.exist")
    // cy.get("div").should("have.").type("{esc}", {force: true})
  })
  it('allows close modal using escape key', () => {
    cy.visit("http://localhost:3000/")
    cy.get("#openToDo").click()
    cy.get("h1").contains("Projects");
    cy.get("body").type("{esc}", {force: true})
    cy.get("h1").contains("Projects").should("not.exist")
  })
})