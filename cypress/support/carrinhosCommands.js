import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import CarServ from '../services/carrinhos.service'

const URL_CARRINHOS = '/carrinhos'

Cypress.Commands.add('getCarrinhos', (typeCar) => {
    
   
    let body
    switch(typeCar){    
         

        case 'ID válido': 
             CarServ.giveMeValidCarID()
             cy.get('@post_carrinhos_response').then(post_carrinhos_response => {
                return Rest.httpRequestWithoutBody('GET', `${URL_CARRINHOS}/${post_carrinhos_response.body._id}`)
             })
             break;
         

        case 'ID inválido':
            let idCar = DynamicFactory.geradorID()
            let tempurl = `${URL_CARRINHOS}/${idCar}`
            return Rest.httpRequestWithoutBody('GET', tempurl)

        case 'nenhum ID':
        return Rest.httpRequestWithoutBody('GET', URL_CARRINHOS)
      
    }
})


Cypress.Commands.add('validacaoGetCarrinhos', (typeCar, get_carrinhos_response, itensCarrinhos) => {

    switch(typeCar){        
        case 'ID válido':
            cy.get('@get_carrinhos_response').then(get_carrinhos_response => {
                return expect(get_carrinhos_response.body[itensCarrinhos.propriedade]).exist
            })
            break;            
        case 'ID inválido':
            return expect(get_carrinhos_response.body[itensCarrinhos.propriedade]).to.equal(itensCarrinhos.message)
        case 'nenhum ID':
            return expect(get_carrinhos_response.body[itensCarrinhos.propriedade]).to.greaterThan(itensCarrinhos.message)
            
    }   

})

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