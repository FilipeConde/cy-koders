/// <reference types ="cypress"/>


describe('Delete /usuarios', () => {

    const dataUsuarios = require('../../../fixtures/deleteUsuariosData.json')

    dataUsuarios.forEach(itensUsuarios => {
    context(`Quando deletar usuários usando "${itensUsuarios.tipo}"`, () => {
        beforeEach(() => {
            cy.deleteUsuarios(itensUsuarios.tipo).then(delete_usuarios_response => {
                cy.wrap(delete_usuarios_response).as('delete_usuarios_response')

            })
                    
        })
        it(`Então deverá ser retornado o schema "delete-usuarios" com o status ${itensUsuarios.status}`, () => {
            let status = itensUsuarios.status
            cy.get('@delete_usuarios_response').then( delete_usuarios_response => {
                cy.contractValidation( delete_usuarios_response, 'delete-usuarios', status ).then( valid => {
                    expect(valid).to.be.true
                    expect(delete_usuarios_response.status).to.equal(status)
                })
            })
        })
        it(`E deverá ser retornada a propriedade '${itensUsuarios.propriedade}' com a mensagem  "${itensUsuarios.message}"`, () => {
            cy.get('@delete_usuarios_response').then( delete_usuarios_response => {
                return expect(delete_usuarios_response.body[itensUsuarios.propriedade]).to.equal(itensUsuarios.message)
            })
        })
    })
    })
})