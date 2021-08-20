/// <reference types ="cypress"/>

describe('Get /usuarios', () => {

    const dataUsuarios = require('../../../fixtures/getUsuariosData.json')

    dataUsuarios.forEach(itensUsuarios => {
    context(`Quando buscar usuários por "${itensUsuarios.tipo}"`, () => {
        beforeEach(() => {
            cy.postUsuarios('valido').then( post_response => {
                let userID = post_response.body._id
                cy.getUsuarios(itensUsuarios.tipo, userID).then( post_response => {
                    cy.wrap(post_response).as('Response')
                })
            })
        })
        it(`Então deverá ser retornado o schema "get-usuarios" com o status ${itensUsuarios.status}`, () => {
            let status = itensUsuarios.status
            cy.get('@Response').then( res => {
                cy.contractValidation( res, 'get-usuarios', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(res.status).to.equal(status)
                })
            })
        })
        it(`E deverá ser retornada a propriedade "${itensUsuarios.propriedade}"${itensUsuarios.expect}${itensUsuarios.message}"`, () => {
            cy.get('@Response').then( res => {

                cy.getUservalidation()
                expect(res.body[itensUsuarios.propriedade]).to.equal(itensUsuarios.message)
                expect(res.body[itensUsuarios.propriedade]).exist
            })

        })
        })
    })
})