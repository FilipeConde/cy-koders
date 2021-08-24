/// <reference types ="cypress"/>

describe('Get /produtos', () => {

    const dataProdutos = require('../../../fixtures/getProdutosData.json')

    dataProdutos.forEach(itensProdutos => {
    context(`Quando buscar um produto usando "${itensProdutos.tipo}"`, () => {
        beforeEach(() => {

            cy.getProdutos(itensProdutos.tipo).then( get_prod_response => {
                cy.wrap(get_prod_response).as('get_prod_response')
            })
            
        })
        it(`Então deverá ser retornado o schema "get-produtos" com o status ${itensProdutos.status}`, () => {
            let status = itensProdutos.status
            cy.get('@get_prod_response').then( get_prod_response => {
                cy.contractValidation( get_prod_response, 'get-produtos', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(status).to.equal(status)
                    
                })
                
            })
        })
        it(`E deverá ser retornada a propriedade '${itensProdutos.propriedade}'${itensProdutos.expect}"${itensProdutos.message}"`, () => {
            cy.get('@get_prod_response').then( get_prod_response => {
                cy.validacaoGetProdutos(itensProdutos.tipo, get_prod_response, itensProdutos)
            })
        })
    })
    })
})