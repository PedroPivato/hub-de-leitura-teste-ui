/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('login.html')
});

describe('Funcionalidade: login', () => {
    it('Deve fazer login com sucesso', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        cy.url().should('contain', 'dashboard.html')
    });

    it('Deve validar mensagem de erro ao preencher e-mail inválido', () => {
        cy.get('#email').type('usuario1234teste.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        cy.get('.invalid-feedback').should('contain', 'Por favor, insira um email válido.')
    });

    it.only('Deve validar mensagem de erro ao preencher senha inválida', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').type('user123456')
        cy.get('#login-btn').click()
        cy.get('#alert-container').should('contain', 'Email ou senha incorretos.')
    });
});