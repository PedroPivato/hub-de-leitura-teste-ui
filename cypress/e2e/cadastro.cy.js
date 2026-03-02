/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
const email = faker.internet.email()
const nome = faker.person.fullName()
const senha = faker.internet.password()
const telefone = faker.phone.number()

beforeEach(() => {
    cy.visit('register.html')
});

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    it('Deve fazer cadastro com sucesso', () => {
        cy.get('#name').type('Pedro Pivato')
        cy.get('#email').type('pedro3@teste.com')
        cy.get('#phone').type('996517201')
        cy.get('#password').type('senha123')
        cy.get('#confirm-password').type('senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should * ('include', 'dashboard')
        cy.get('#user-name').should('contain', 'Pedro')

    });
});

describe('Funcionalidade: Cadastro no Hub de Leitura usando Faker', () => {
    it('Deve fazer cadastro com sucesso', () => {
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type(telefone)
        cy.get('#password').type(senha)
        cy.get('#confirm-password').type(senha)
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should * ('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)

    });
});