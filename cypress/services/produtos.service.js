    
import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

export default class ProdServ {

    static bodyInvalidProdName(typeProd, auth){

        let body = DynamicFactory.criarProdutos(typeProd)
        Rest.httpRequestWithBody('POST', '/produtos', body, { authorization: auth })
        let prodNome = body.nome
        body = DynamicFactory.criarProdutos(typeProd)
        body.nome = prodNome
        
        return body
    }

    static giveMeValidProductID(){

        return cy.getProdutos('valido').then( post_response => {                
            cy.wrap(post_response).as('post_response')
        })
    }
       
}