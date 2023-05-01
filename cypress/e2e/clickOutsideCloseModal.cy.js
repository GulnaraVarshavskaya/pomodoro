describe("click outside, close the modal", () => {
  it("allows click outside and close the modal", () => {
    //go to page
    cy.visit("http://localhost:3000/");
    //open the modal
    cy.get("#openToDo").click();
    //close the modal
    // cy.get("#closeModal").click()
    //close the modal using esc key
    cy.get("body").type("{esc}");
  });
});
