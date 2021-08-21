import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

export default class UserServ {

    static bodyInvalidEmail(typeUser){

        let body = DynamicFactory.criarUsuario(typeUser)
        Rest.httpRequestWithBody('POST', '/usuarios', body)
        let email = body.email
        body = DynamicFactory.criarUsuario(typeUser)
        body.email = email
        
        return body
    }

    static giveMeValidUserID(){

        return cy.postUsuarios('valido').then( post_response => {                
            cy.wrap(post_response).as('post_response')
        })
    }
    
}