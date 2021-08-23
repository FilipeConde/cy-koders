

export default class ProdServ {

    static giveMeValidProductID(){

        return cy.getProdutos('valido').then( post_response => {                
            cy.wrap(post_response).as('post_response')
        })
    }    
}