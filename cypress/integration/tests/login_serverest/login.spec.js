/// <reference types ="cypress"/>


describe('Post /login', () => {
    const dataLogin = require ('../../../fixtures/loginData.json')
        dataLogin.forEach(item => {
            context(`Quando acessar com um usuario do tipo ${item.tipo}`, () => {
                beforeEach(() => {
            }) 
                it(`Deverá retornar com o schema post-login e status code ${item.status}`, () => {
                    cy.visit('/') 
                }) 
        })
    })             
})
