const cypress = require("cypress");

describe("the upload demo", () => {

    beforeEach(() => {
        cy.visit(Cypress.env("url"));
    });

    it("YAK-2 Test2", () => {
        cy.get("h1").should("contain.text", "Example Domain");
    });

    it("YAK-1 Test1", () => {
        cy.get("a").should("have.attr", "href");
    });


})
