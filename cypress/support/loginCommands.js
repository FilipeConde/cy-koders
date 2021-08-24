import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

Cypress.Commands.add('bodyLogin', (typeLogin) => {

    cy.getUsuarios(typeLogin).then( get_response => {                
        let body = DynamicFactory.realizarLogin('valido')
        body.email = get_response.body.email
        body.password = get_response.body.password
        return body   
    })

})

Cypress.Commands.add('postLogin', (typeLogin) => {

    switch(typeLogin){
        case 'valido':
        case 'com permissão':
        case 'sem permissão':
            cy.bodyLogin(typeLogin).then( body => {
                return Rest.httpRequestWithBody('POST', '/login', body)
            })
            break;
        case 'invalido':
        case 'sem preencher a senha':
        case 'sem preencher o email':
        case "sem enviar a propriedade 'email'":
        case "sem enviar a propriedade 'password'":
            let body = DynamicFactory.realizarLogin(typeLogin)
            return Rest.httpRequestWithBody('POST', '/login', body)
        default:
        return { notfound: cy.log('cy.postLogin - typeLogin não encontrado'), notfound: 'cy.postLogin - typeLogin não encontrado' }
        
    }

})

