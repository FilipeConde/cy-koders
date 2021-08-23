/// <reference types ="cypress"/>

describe('Get /produtos', () => {

    const dataProdutos = require('../../../fixtures/getProdutosData.json')

    dataProdutos.forEach(itensProdutos => {
    context(`Quando buscar um produto usando "${itensProdutos.tipo}"`, () => {
        beforeEach(() => {
            cy.getProdutos(itensProdutos.tipo).then( post_response => {
                cy.wrap(post_response).as('Response')
            })
        })
        it(`Então deverá ser retornado o schema "get-produtos" com o status ${itensProdutos.status}`, () => {
            let status = itensProdutos.status
            cy.get('@Response').then( res => {
                cy.contractValidation( res, 'get-produtos', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(status).to.equal(status)
                    
                })
                
            })
        })
        it(`E deverá ser retornada a propriedade '${itensProdutos.propriedade}'${itensProdutos.expect}"${itensProdutos.message}"`, () => {
            cy.get('@Response').then( res => {
                cy.validacaoGetProdutos(itensProdutos.tipo, res, itensProdutos)
            })
        })
    })
    })
})