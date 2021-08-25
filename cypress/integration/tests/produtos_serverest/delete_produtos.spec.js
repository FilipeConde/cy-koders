/// <reference types ="cypress"/>


describe('Delete /produtos', () => {

    const dataProdutos = require('../../../fixtures/deleteProdutosData.json')

    dataProdutos.forEach(itensProdutos => {
        context(`Dado que esteja logado e com um usuário autenticado "${itensProdutos.auth}"`, () => {
            beforeEach(() => {
                cy.postLogin('valido').then(post_response => {
                    cy.wrap(post_response).as('post_login_response')
                })
            })
            context(`Quando deletar um produto usando "${itensProdutos.tipo}"`, () => {
                beforeEach(() => {
                    cy.get('@post_login_response').then(post_login_response => {
                        cy.deleteProdutos
                            cy.wrap(delete_produtos_response).as('delete_produtos_response')
                    })                    
                })
                it(`Então deverá ser retornado o schema "delete-produtos" com o status ${itensProdutos.status}`, () => {
                    let status = itensProdutos.status
                    cy.get('@delete_produtos_response').then( delete_produtos_response => {
                        cy.contractValidation( delete_produtos_response, 'delete-produtos', status ).then( valid => {
                            expect(valid).to.be.true
                            expect(delete_produtos_response.status).to.equal(status)
                        })
                    })
                })
                it(`E deverá ser retornada a propriedade '${itensProdutos.propriedade}' com a mensagem  "${itensProdutos.message}"`, () => {
                    cy.get('@delete_produtos_response').then( delete_produtos_response => {
                        return expect(delete_produtos_response.body[itensProdutos.propriedade]).to.equal(itensProdutos.message)
                    })
                })
            })
        })
    })
})