/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

const nome = faker.person.fullName()
const email = faker.internet.email()
const senha = faker.internet.password()
const telefone = faker.phone.number()

beforeEach(() => {
    cadastroPage.visitarPaginaCadastro()
});

afterEach(() => {
    cy.screenshot()
});

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    it.skip('Deve fazer cadastro com sucesso', () => {
        cy.get('#name').type('Pedro Pivato')
        cy.get('#email').type('pedro4@teste.com')
        cy.get('#phone').type('996517201')
        cy.get('#password').type('senha123')
        cy.get('#confirm-password').type('senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
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
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)

    });

    it('Deve fazer cadastro com sucesso - Usando comando customizado', () => {
        cy.preencherCadastro(
            nome,
            email,
            telefone,
            senha,
            senha
        )
        cy.url().should('contain', 'dashboard.html')
    });
});

describe('Funcionalidade: Cadastro com Page Objects', () => {
    it('Deve fazer cadastro com sucesso - usando Page Objects', () => {
        cadastroPage.preencherCadastro(nome, email, telefone, senha, senha)
        cy.url().should('contain', 'dashboard.html')
    });

    it.only('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', email, telefone, senha, senha)
        cy.get('.invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });
});