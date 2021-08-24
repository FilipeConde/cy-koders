import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'


const URL_CARRINHOS = '/carrinhos'

Cypress.Commands.add('postCarrinhos', (typeCart, typeProd, auth) => {
    
    let prodID
    let body

    switch (typeProd) {

        case 'valido':
        case 'duplicado':
        case 'sem quantidade disponível':
        case 'com quantidade menor que 1':
            cy.postProdutos('valido', auth).then( post_prod_response => {
                prodID = post_prod_response.body._id
                body = DynamicFactory.postCarrinhos(typeProd, prodID)
                return Rest.httpRequestWithBody('POST', URL_CARRINHOS, body, { authorization: auth })
            })
            break;
        case 'inexistente':
            prodID = DynamicFactory.geradorID()
            body = DynamicFactory.postCarrinhos(typeProd, prodID)
            return Rest.httpRequestWithBody('POST', URL_CARRINHOS, body, { authorization: auth })
        case 'sem preencher ID':
            body = DynamicFactory.postCarrinhos(typeProd, prodID)
            return Rest.httpRequestWithBody('POST', URL_CARRINHOS, body, { authorization: auth })
        default:
            return { notfound: cy.log('cy.postCarrinhos - typeProd não encontrado'), notfound: 'cy.postCarrinhos - typeProd não encontrado' }
    }

    if (typeCart == 'com carrinho'){
        cy.postProdutos('valido', auth).then( post_prod_response => {
            prodID = post_prod_response.body._id
            body = DynamicFactory.postCarrinhos(typeProd, prodID)
            return Rest.httpRequestWithBody('POST', URL_CARRINHOS, body, { authorization: auth })
        })
    }

})