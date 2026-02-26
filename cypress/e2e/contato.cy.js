
beforeEach(() => {
  cy.visit('index.html')
});

describe('Funcionalidade: contato', () => {
  it('Deve preencher formulário de contato com sucesso', () => {
    cy.visit('http://localhost:3000/index.html')
    cy.get('[name="name"]').type('Pedro Pivato')
    cy.get('[name="email"]').type('pedro@email.com')
    cy.get('[name="subject"]').select('Sugestões')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click()
    cy.contains('Contato enviado com sucesso!').should('exist')
  })

  it('Deve validar mensagem de erro ao enviar sem preencher nome', () => {
    cy.get('[name="email"]').type('pedro@email.com')
    cy.get('[name="subject"]').select('Sugestões')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click()
    cy.contains('Por favor, preencha o campo Nome.').should('exist')
  });

  it('Deve validar mensagem de erro ao enviar sem preencher email', () => {
    cy.get('[name="name"]').type('pedro')
    cy.get('[name="subject"]').select('Sugestões')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click()
    cy.contains('Por favor, preencha o campo E-mail.').should('exist')
  });

  it('Deve validar mensagem de erro ao enviar sem selecionar assunto', () => {
    cy.get('[name="name"]').type('Pedro Pivato')
    cy.get('[name="email"]').type('pedro@email.com')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click()
    cy.contains('Por favor, selecione o Assunto.').should('exist')
  });

  it('Deve validar mensagem de erro ao não escrever mensagem', () => {
    cy.get('[name="name"]').type('Pedro Pivato')
    cy.get('[name="email"]').type('pedro@email.com')
    cy.get('[name="subject"]').select('Sugestões')
    cy.get('#btn-submit').click()
    cy.contains('Por favor, escreva sua Mensagem').should('exist')
  });
})