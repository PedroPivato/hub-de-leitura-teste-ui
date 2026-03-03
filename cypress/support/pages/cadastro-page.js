class CadastroPage {

    //métodos
    visitarPaginaCadastro() {
        cy.visit('register.html')
    }

    preencherCadastro(nome, email, telefone, senha, confirmarSenha) {
       if(nome) this.campoNome().clear().type(nome)
       if(email) this.campoEmail().clear().type(email)
        this.campoTelefone().clear().type(telefone)
        this.campoSenha().clear().type(senha)
        this.campoConfirmarSenha().clear().type(confirmarSenha)
        this.checkTermos().check()
        this.botaoCriarConta().click()
    }

    //seletores
    campoNome() {return cy.get('#name')}
    campoEmail() {return cy.get('#email')}
    campoTelefone() {return cy.get('#phone')}
    campoSenha() {return cy.get('#password')}
    campoConfirmarSenha() {return cy.get('#confirm-password')}
    checkTermos() {return cy.get('#terms-agreement')}
    botaoCriarConta() {return cy.get('#register-btn')}
}

export default new CadastroPage()