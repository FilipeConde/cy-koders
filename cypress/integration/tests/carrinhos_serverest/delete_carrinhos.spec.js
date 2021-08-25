/// <reference types ="cypress"/>

describe('Delete /carrinhos', () => {

    const dataCarrinhos = require('../../../fixtures/deleteCarrinhosData.json')

    dataCarrinhos.forEach(itensCarrinhos => {
        context(`Dado que esteja logado com um usuário de Token "${itensCarrinhos.auth}"`, () => {
            beforeEach(() => {
                cy.postLogin('valido').then(post_response => {
                    cy.wrap(post_response).as('post_login_response')
                })
            })
            context(`Quando deletar um carrinho "${itensCarrinhos.tipo}" com intuito de "${itensCarrinhos.objetivo}"`, () => {
                beforeEach(() => {
                    cy.get('@post_login_response').then( post_login_response => {
                        let typeCart = itensCarrinhos.tipo
                        let typeObjetivo = itensCarrinhos.objetivo
                        let typeAuth = itensCarrinhos.auth
                        let auth = post_login_response.body.authorization
                        cy.deleteCarrinhos(typeCart, typeObjetivo, auth, typeAuth).then( delete_carrinho_response => {
                            cy.wrap(delete_carrinho_response).as('delete_carrinho_response')
                        })
                    })                    
                })
                it(`Então deverá ser retornado o schema "delete-carrinhos" com o status ${itensCarrinhos.status}`, () => {
                    let status = itensCarrinhos.status
                    cy.get('@delete_carrinho_response').then( delete_carrinho_response => {
                        cy.contractValidation( delete_carrinho_response, 'delete-carrinhos', status ).then( valid => {
                            expect(valid).to.be.true
                            expect(delete_carrinho_response.status).to.equal(status)
                        })
                    })
                })
                it(`E deverá ser retornada a propriedade '${itensCarrinhos.propriedade}' com a mensagem "${itensCarrinhos.message}"${itensCarrinhos.complemento}${itensCarrinhos.resultado}`, () => {
                    cy.get('@delete_carrinho_response').then( delete_carrinho_response => {
                        expect(delete_carrinho_response.body[itensCarrinhos.propriedade]).to.equal(itensCarrinhos.message)
                        cy.validarDeleteCarrinhos(itensCarrinhos.resultado)
                    })
                })
            })
        })
    })
})