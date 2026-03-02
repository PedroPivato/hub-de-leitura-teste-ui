/// <reference types="cypress" />
import user from "../fixtures/usuario.json"

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

    it('Deve validar mensagem de erro ao preencher senha inválida', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').type('user123456')
        cy.get('#login-btn').click()
        cy.get('#alert-container').should('contain', 'Email ou senha incorretos.')
    });

    it('Deve fazer login com sucesso - usando comando customizado', () => {
        cy.login('usuario@teste.com', 'user123')
    });

    it('Deve fazer login com sucesso com conta Admin - usando comando customizado', () => {
        cy.login('admin@biblioteca.com', 'admin123')
    });

    it('Deve fazer login com sucesso - Usando importação de massa de dados', () => {
        cy.login(user.email, user.senha)
    });
});