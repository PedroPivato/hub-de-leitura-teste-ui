/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('catalog.html')
});

describe('Funcionalidade: catálogo de livros', () => {
    it('Deve clicar no botão adicionar à cesta', () => {
        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()
        cy.get('#cart-count').should('contain', 1)
    });

    it('Deve clicar em todos os botões adicionar à cesta', () => {
        cy.get('.btn-primary').click({ multiple: true })
        cy.get('#cart-count').should('contain', 12)
    });

    it('Deve clicar no primeiro botão adicionar à cesta', () => {
        cy.get('.btn-primary').first().click()
        cy.get('#cart-count').should('contain', 1)
    });

    it('Deve clicar no último botão adicionar à cesta', () => {
        cy.get('.btn-primary').last().click()
        cy.get('#cart-count').should('contain', 1)
    });

    it('Deve clicar no terceiro botão adicionar à cesta', () => {
        cy.get('.btn-primary').eq(2).click()
        cy.get('#global-alert-container').should('contain', 'A Divina Comédia')
    });

    it('Deve clicar no nome do livro e direcionar para a tela do livro', () => {
        cy.contains('Dom Casmurro').click()
        cy.url().should('include', 'book-details')
        cy.get('#add-to-cart-btn').click()
        cy.get('#alert-container').should('contain', 'Livro adicionado à cesta com sucesso!')
    });
});