/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    })

afterEach(() => {
    cy.screenshot()
})

    it('Deve fazer cadastro com sucesso, usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Fabio Araujo')
        cy.get('#email').type(email)
        cy.get('#phone').type('11999999999')
        cy.get('#password').type('Senha123')
        cy.get('#confirm-password').type('Senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard.html')
    })

    it('Deve fazer cadastro com sucesso, usando Faker', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('11999999999')
        cy.get('#password').type('Senha123')
        cy.get('#confirm-password').type('Senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard.html')
        cy.get('#user-name').should('contain', nome)
    })

    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName({ gender: 'female' })
        cy.preencherCadastro(nome, email, '11999999999', 'Senha123', 'Senha123')
        cy.url().should('include', 'dashboard.html')
    })

    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
        cadastroPage.preencherCadastro('Fabio Araujo', email, '11999999999', 'Senha123', 'Senha123')
        cy.url().should('include', 'dashboard.html')
    })

    it('Deve validar mensagem cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'fabio@teste.com', '11999999999', 'Senha123', 'Senha123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    })
    })