/// <reference types="cypress" /> 
import adminDashboardPage from '../support/pages/adminDashboard.page';

describe('Funcionalidade: Interceptar e Mockar Requisições', () => {

    beforeEach(() => {
        cy.visit('login.html')
        cy.login(Cypress.env('adminEmail'), Cypress.env('adminSenha'))
    })

    it('Deve interceptar e mockar uma requisição POST', () => {

        cy.intercept('POST', '**/api/books**', {
            statusCode: 201,
            body: {
                message: 'Livro criado com sucesso.',
                book: {
                    id: 1,
                    title: 'Intercept',
                    author: 'Pedro Pivato',
                    category: 'Ficção',
                    copies: 5,
                    available_copies: 5
                }
            }
        }).as('addBooks')

        adminDashboardPage.visit()
        adminDashboardPage.openGerenciamentoLivros()
        adminDashboardPage.openAddLivro()
        adminDashboardPage.preencherFormularioLivro({
            title: 'Intercept',
            author: 'Pedro Pivato',
            category: 'Ficção',
            copies: 5
        })
        adminDashboardPage.enviar()

        cy.wait('@addBooks').then((interception) => {
            expect(interception.request.method).to.equal('POST')
            expect(interception.request.url).to.include('/api/books')
            expect(interception.request.body.title).to.equal('Intercept')
            expect(interception.request.body.author).to.equal('Pedro Pivato')
            expect(interception.request.body.category).to.equal('Ficção')
        })

        adminDashboardPage.validarLivroAdicionado()
    })

    it('Deve interceptar e mockar uma requisição DELETE', () => {
        cy.intercept('DELETE', '**/api/books/**', {
            statusCode: 200,
            body: {
                message: 'Livro deletado com sucesso.'
            }
        }).as('deleteBook')

        adminDashboardPage.visit()
        adminDashboardPage.openGerenciamentoLivros()
        adminDashboardPage.deletarLivro()

        cy.wait('@deleteBook').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.request.method).to.equal('DELETE')
            expect(interception.request.url).to.include('/api/books/')
            expect(interception.response.body.message).to.equal('Livro deletado com sucesso.')
        })
    })

});