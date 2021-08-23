/// <reference types ="cypress"/>

describe('Put /produtos', () => {

    const dataProdutos = require('../../../fixtures/putProdutosData.json')

    dataProdutos.forEach(itensProdutos => {
        context(`Dado que esteja logado com um usuário de Token "${itensProdutos.auth}" e "${itensProdutos.adm}" de administrador`, () => {
            beforeEach(() => {
                cy.postLogin(itensProdutos.adm).then(post_response => {
                    //post_response.body.authorization = itensProdutos.auth == 'inválido' ? cy.log('valor inválido'):cy.log('valor teste');
                    if (itensProdutos.auth == 'inválido'){ post_response.body.authorization = 'valor inválido'}
                    cy.wrap(post_response).as('post_login_response')
                })
            })
            context(`Quando editar um produto "${itensProdutos.tipo}"`, () => {
                beforeEach(() => {
                    cy.get('@post_login_response').then( post_login_response => {
                        let typeProd = itensProdutos.tipo
                        let auth = post_login_response.body.authorization  
                        cy.log(typeProd)                      
                        cy.putProdutos(typeProd, auth).then( put_prod_response => {
                            cy.wrap(put_prod_response).as('put_prod_response')
                        })
                        
                    })
                    
                })
                it(`Então deverá ser retornado o schema "put-produtos" com o status ${itensProdutos.status}`, () => {
                    let status = itensProdutos.status
                    cy.get('@put_prod_response').then( put_prod_response => {
                        cy.contractValidation( put_prod_response, 'put-produtos', status ).then( valid => {
                            expect(valid).to.be.true
                            expect(put_prod_response.status).to.equal(status)
                        })
                    })
                })
                it(`E deverá ser retornada a propriedade '${itensProdutos.propriedade}' com a mensagem "${itensProdutos.message}"`, () => {
                    cy.get('@put_prod_response').then( put_prod_response => {
                        expect(put_prod_response.body[itensProdutos.propriedade]).to.equal(itensProdutos.message)
                    })
                })
            })
        })
    })
})