class AdminDashboardPage {
  visit() {
    cy.setCookie('jwt_education_shown', 'true')
    cy.visit('admin-dashboard.html')

  }

  openGerenciamentoLivros() {
    cy.get('.btn-primary').click()
  }

  openAddLivro() {
    cy.get('.btn-success').click()
  }

  preencherFormularioLivro({ title, author, category, copies }) {
    cy.get('#book-form').should('be.visible')
    cy.get('#book-title').should('not.be.disabled').type(title)  
    cy.get('#book-author').type(author) 
    cy.get('#book-category').select(category)
    cy.get('#book-copies').type(copies)
  }

  enviar() {
    cy.get('#save-book-btn').click()
  }

  validarLivroAdicionado() {
    cy.get('#alert-container')
      .should('be.visible')
      .and('contain', 'Livro adicionado com sucesso')
  }

  deletarLivro() {
    cy.get(':nth-child(11) > :nth-child(7) > .btn-outline-danger').click()
    cy.get('#confirm-delete-btn').click()
  }
}

export default new AdminDashboardPage()