/// <reference types ="cypress"/>

describe('Get /carrinhos', () => {

    const dataCarrinhos = require('../../../fixtures/getCarrinhosData.json')

    dataCarrinhos.forEach(itensCarrinhos => {
    context(`Quando buscar um carrinho usando "${itensCarrinhos.tipo}"`, () => {
        beforeEach(() => {
            cy.getCarrinhos(itensCarrinhos.tipo).then( get_carrinhos_response => {
                cy.wrap(get_carrinhos_response).as('get_carrinhos_response')
            })
        })
        it(`Então deverá ser retornado o schema "get-carrinhos" com o status ${itensCarrinhos.status}`, () => {
            let status = itensCarrinhos.status
            cy.get('@get_carrinhos_response').then(get_carrinhos_response => {
                cy.contractValidation( get_carrinhos_response, 'get-carrinhos', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(status).to.equal(status)
                    
                })
                
            })
        })
        it(`E deverá ser retornada a propriedade '${itensCarrinhos.propriedade}'${itensCarrinhos.expect}"${itensCarrinhos.message}"`, () => {
            cy.get('@get_carrinhos_response').then( get_carrinhos_response => {
                cy.validacaoGetCarrinhos(itensCarrinhos.tipo, get_carrinhos_response, itensCarrinhos)
            })
        })
    })
    })
})