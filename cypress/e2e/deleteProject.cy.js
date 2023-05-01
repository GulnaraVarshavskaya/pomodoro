describe("delete project", () => {
  it("allows click 3 dots next to a project, click delete, now there is one project less than before", () => {
    //go to page
    cy.visit("http://localhost:3000/");
    //open the modal
    cy.get("#openToDo").click();
    //click 3 dots next to a project
    cy.get("#menuList").click()
    //click delete
    // cy.get("button").contains("Delete").click()
  });
});
