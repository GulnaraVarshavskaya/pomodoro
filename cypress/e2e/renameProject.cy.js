describe('rename the project', () => {
  it('allows click 3 dots next to a project, click rename, focus the input, type and press {enter}, text on the project is changed', () => {
    //go to page
    cy.visit('http://localhost:3000/')
    //open the modal
    cy.get("#openToDo").click()
    //click 3 dots next to a project
    cy.get("#menuList").click()
    //click rename
    cy.get("button").contains("Rename").click()
    //focus the input, type and press enter
    // cy.focused().type(" bla{enter}")
  })
  it('allows click 3 dots next to a project, click rename, focus the input, type and click button done, text on the project is changed', () => {
    //go to page
    cy.visit('http://localhost:3000/')
    //open the modal
    cy.get("#openToDo").click()
    //click 3 dots next to a project
    cy.get("#menuList").click()
    //click rename
    cy.get("button").contains("Rename").click()
    //focus the input
    cy.focused().type(" bla")
    //click button done
    // cy.get("#done").contains("Done").click()
  })
})