/// <reference types ="cypress"/>

describe('Get /carrinhos', () => {

    const dataCarrinhos = require('../../../fixtures/getCarrinhosData.json')

    dataCarrinhos.forEach(itensCarrinhos => {
    context(`Quando buscar um produto usando "${itensCarrinhos.tipo}"`, () => {
        beforeEach(() => {
            cy.getCarrinhos(itensCarrinhos.tipo).then( post_response => {
                cy.wrap(post_response).as('post_car_response')
            })
        })
        it(`Então deverá ser retornado o schema "get-carrinhos" com o status ${itensCarrinhos.status}`, () => {
            let status = itensCarrinhos.status
            cy.get('@post_car_response').then(post_car_response => {
                cy.contractValidation( post_car_response, 'get-carrinhos', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(post_car_response.status).to.equal(status)
                    
                })
                
            })
        })
        it(`E deverá ser retornada a propriedade '${itensCarrinhos.propriedade}'${itensCarrinhos.expect}"${itensCarrinhos.message}"`, () => {
            cy.get('@post_car_response').then( res => {
                cy.validacaoGetCarrinhos(itensCarrinhos.tipo, res, itensCarrinhos)
            })
        })
    })
    })
})