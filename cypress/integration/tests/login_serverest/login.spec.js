/// <reference types ="cypress"/>


describe('Post /login', () => {
    const dataLogin = require ('../../../fixtures/loginData.json')
        dataLogin.forEach(itemLogin => {
        context(`Quando acessar com um usuario do tipo "${itemLogin.tipo}"`, () => {
                beforeEach(() => {
                    cy.postLogin(itemLogin.tipo).then(post_response => {
                        cy.wrap(post_response).as('Response')
                    })
                }) 
                it.only(`Deverá retornar com o schema post-login e status code ${itemLogin.status}`, () => {
                    let status = itemLogin.status
                    cy.get('@Response').then(res =>{
                        cy.contractValidation(res, 'post-login', status).then (valid =>{
                            expect(valid).to.be.true
                            expect(res.status).to.equal(status)
                        })

                    })
                }) 

                afterEach(`Deverá retornar "${itemLogin.propriedade}" com a mensagem "${itemLogin.message}"`, () => {
                    cy.get('@Response').then(res => {
                        expect(res.body[itemLogin.propriedade]).to.equal(itemLogin.message)
                    })
                })
        })
    })             
})
