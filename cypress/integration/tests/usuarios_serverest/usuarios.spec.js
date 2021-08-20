/// <reference types ="cypress"/>


describe('Get /usuarios', () => {
    const dataLogin = require ('../../../fixtures/loginData.json')
        dataLogin.forEach(item => {
            context(`Quando buscar todos os usuarios ${item.tipo}`, () => {
                beforeEach(() => {
            }) 
                it(`Deverá retornar com o schema get-usuarios ${item.status}`, () => {
                    cy.visit('/') 
                }) 
        })
    })             
})
