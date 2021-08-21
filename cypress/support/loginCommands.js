import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

Cypress.Commands.add('bodyLogin', () => {

    cy.getUsuarios('ID válido').then( get_response => {                
        let body = DynamicFactory.realizarLogin('valido')
        body.email = get_response.body.email
        body.password = get_response.body.password
        return body   
    })

})

Cypress.Commands.add('postLogin', (typeLogin) => {

    switch(typeLogin){
        case 'valido':
            cy.bodyLogin().then( body => {
                return Rest.httpRequestWithBody('POST', '/login', body)
            })
            break;
        case 'invalido':
        case 'sem preencher a senha':
        case 'sem preencher o email':
            let body = DynamicFactory.realizarLogin(typeLogin)
            return Rest.httpRequestWithBody('POST', '/login', body)
    }

})

