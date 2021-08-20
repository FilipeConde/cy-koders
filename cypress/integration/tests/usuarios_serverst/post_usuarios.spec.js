/// <reference types ="cypress"/>

describe('Post /usuarios', () => {

    const dataUsuarios = require('../../../fixtures/postUsuariosData.json')

    dataUsuarios.forEach(itensUsuarios => {
    context(`Quando postar um usuário "${itensUsuarios.tipo}"`, () => {
        beforeEach(() => {
            cy.postUsuarios(itensUsuarios.tipo).then( post_response => {
                cy.wrap(post_response).as('Response')
            })
        })
        it(`Então deverá ser retornado o schema "post-usuarios" com o status ${itensUsuarios.status}`, () => {
            let status = itensUsuarios.status
            cy.get('@Response').then( res => {
                cy.contractValidation( res, 'post-usuarios', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(res.status).to.equal(status)
                })
            })
        })
        it(`E deverá ser retornada a propriedade "${itensUsuarios.propriedade}" com a mensagem "${itensUsuarios.message}"`, () => {
            cy.get('@Response').then( res => {
                expect(res.body[itensUsuarios.propriedade]).to.equal(itensUsuarios.message)
            })

        })
        })
    })
})