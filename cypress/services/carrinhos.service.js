import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

export default class CarServ {

    static giveMeValidCarID(){
        cy.postLogin('valido').then(post_login_response => {
            cy.postProdutos('valido', post_login_response.body.authorization).then(post_produto_response => {
                cy.postCarrinhos('valido', 'valido', post_login_response.body.authorization).then(post_carrinhos_response => {
                   cy.wrap(post_carrinhos_response).as('post_carrinhos_response')
                })    
            })
        })
    }    
    

    static bodyInvalidCarName(typeCar, auth){

        let body = DynamicFactory.postCarrinhos(typeCar)
        Rest.httpRequestWithBody('POST', '/carrinhos', body, { authorization: auth })
        let carIdProduto = body.idProduto
        body = DynamicFactory.postCarrinhos(typecar)
        body.idProduto = carIdProduto
        
        return body
    }

}
