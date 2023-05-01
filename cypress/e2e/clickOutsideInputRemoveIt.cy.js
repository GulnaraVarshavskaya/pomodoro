describe("click outside the input, remove the input", () => {
  it("allows after click new, click outside the input, remove the input ", () => {
    //go to page
    cy.visit("http://localhost:3000/");
    //open the modal
    cy.get("#openToDo").click();
    //add a project
    cy.get("button").contains("Add a project").click();
    //find input and type into it
    cy.get("#input").type("blablabla");
    //click outside, close input
    cy.get("body").click(0, 0);
  });
});
