import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

export default class ProdServ {

    static cadastrarProduto(){
        cy.postLogin('valido').then(post_login_response => {
            let auth = post_login_response.body.authorization
            cy.postProdutos('valido', auth).then( post_prod_response => {
                cy.wrap(post_prod_response).as('post_prod_response')
            })
        })
    }    
    
    static bodyInvalidProdName(typeProd, auth){

        let body = DynamicFactory.criarProdutos(typeProd)
        Rest.httpRequestWithBody('POST', '/produtos', body, { authorization: auth })
        let prodNome = body.nome
        body = DynamicFactory.criarProdutos(typeProd)
        body.nome = prodNome
        
        return body
    }

}