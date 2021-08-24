/// <reference types ="cypress"/>

describe('Post /carrinhos', () => {

    const dataCarrinhos = require('../../../fixtures/postCarrinhosData.json')

    dataCarrinhos.forEach(itensCarrinhos => {
        context(`Dado que esteja logado com um usuário de Token "${itensCarrinhos.auth}"`, () => {
            beforeEach(() => {
                cy.postLogin('valido').then(post_response => {
                    //post_response.body.authorization = itensProdutos.auth == 'inválido' ? cy.log('valor inválido'):cy.log('valor teste');
                    if (itensCarrinhos.auth == 'inválido'){ post_response.body.authorization = 'valor inválido'}
                    cy.wrap(post_response).as('post_login_response')
                })
            })
            context(`Quando cadastrar um carrinho para usuario "${itensCarrinhos.tipo}" com produto "${itensCarrinhos.typeProd}"`, () => {
                beforeEach(() => {
                    cy.get('@post_login_response').then( post_login_response => {
                        let typeCart = itensCarrinhos.tipo
                        let typeProd = itensCarrinhos.typeProd
                        let auth = post_login_response.body.authorization
                        cy.postCarrinhos(typeCart, typeProd, auth).then( post_cart_response => {
                            cy.wrap(post_cart_response).as('post_cart_response')
                        })
                    })
                    
                })
                it(`Então deverá ser retornado o schema "post-carrinhos" com o status ${itensCarrinhos.status}`, () => {
                    let status = itensCarrinhos.status
                    cy.get('@post_cart_response').then( post_cart_response => {
                        cy.contractValidation( post_cart_response, 'post-carrinhos', status ).then( valid => {
                            expect(valid).to.be.true
                            expect(post_cart_response.status).to.equal(status)
                        })
                    })
                })
                it(`E deverá ser retornada a propriedade '${itensCarrinhos.propriedade}' com a mensagem "${itensCarrinhos.message}"`, () => {
                    cy.get('@post_cart_response').then( post_cart_response => {
                        expect(post_cart_response.body[itensCarrinhos.propriedade]).to.equal(itensCarrinhos.message)
                    })
                })
            })
        })
    })
})