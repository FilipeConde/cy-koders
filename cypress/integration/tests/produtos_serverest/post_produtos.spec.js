/// <reference types ="cypress"/>

describe('Post /produtos', () => {

    const dataProdutos = require('../../../fixtures/postProdutosData.json')

    dataProdutos.forEach(itensProdutos => {
        context(`Dado que esteja logado com um usuário de Token "${itensProdutos.auth}" e "${itensProdutos.adm}" de administrador`, () => {
            beforeEach(() => {
                cy.postLogin(itensProdutos.adm).then(post_response => {
                    post_response.body.authorization = itensProdutos.auth == 'inválido' ? 'valor inválido' : post_response.body.authorization
                    cy.wrap(post_response).as('post_login_response')
                })
            })
            context(`Quando cadastrar um produto "${itensProdutos.tipo}"`, () => {
                beforeEach(() => {
                    cy.get('@post_login_response').then( post_login_response => {
                        let typeProd = itensProdutos.tipo
                        let auth = post_login_response.body.authorization
                        cy.postProdutos(typeProd, auth).then( post_prod_response => {
                            cy.wrap(post_prod_response).as('post_prod_response')
                        })
                    })
                    
                })
                it(`Então deverá ser retornado o schema "post-produtos" com o status ${itensProdutos.status}`, () => {
                    let status = itensProdutos.status
                    cy.get('@post_prod_response').then( post_prod_response => {
                        cy.contractValidation( post_prod_response, 'post-produtos', status ).then( valid => {
                            expect(valid).to.be.true
                            expect(post_prod_response.status).to.equal(status)
                        })
                    })
                })
                it(`E deverá ser retornada a propriedade '${itensProdutos.propriedade}' com a mensagem "${itensProdutos.message}"`, () => {
                    cy.get('@post_prod_response').then( post_prod_response => {
                        expect(post_prod_response.body[itensProdutos.propriedade]).to.equal(itensProdutos.message)
                    })
                })
            })
        })
    })
})