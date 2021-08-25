import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import CarServ from '../services/carrinhos.service'

const URL_CARRINHOS = '/carrinhos'

Cypress.Commands.add('getCarrinhos', (typeCar) => {    
   
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
        case "'produtos[0].quantidade'":
        case "sem enviar a propriedade quantidade":
        case "sem enviar a propriedade idProduto":
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

Cypress.Commands.add('deleteCarrinhos', (typeCart, typeObjetivo, auth, typeAuth) => {

    let tokenPostProd = auth
    let tokenDelCart = auth
    let tempUrl

    if (typeCart == 'existente'){
        cy.postProdutos('valido', tokenPostProd).then( post_prod_response => {
            let prodID = post_prod_response.body._id
            let body = DynamicFactory.postCarrinhos('valido', prodID)
            Rest.httpRequestWithoutBody('GET', `/produtos/${prodID}`).then( get_produtos_response_before => {
                cy.log(get_produtos_response_before.body.quantidade)
                cy.wrap(get_produtos_response_before).as('get_produtos_response_before')
            })
            Rest.httpRequestWithBody('POST', URL_CARRINHOS, body, { authorization: tokenPostProd })
        })
    }

    if (typeAuth != 'valido'){tokenDelCart = 'token invalido'}

    switch (typeObjetivo) {

        case 'concluir compra':
            tempUrl = `${URL_CARRINHOS}/concluir-compra`           
            return Rest.httpRequestWithoutBody('DELETE', tempUrl, { authorization: tokenDelCart })
        
        case 'cancelar compra':
            tempUrl = `${URL_CARRINHOS}/cancelar-compra`        
            return Rest.httpRequestWithoutBody('DELETE', tempUrl, { authorization: tokenDelCart })   

        default:
            return { notfound: cy.log('cy.deleteCarrinhos - typeObjetivo não encontrado'), notfound: 'cy.deleteCarrinhos - typeObjetivo não encontrado' }
    }
})

Cypress.Commands.add('validarDeleteCarrinhos', (deleteResultado) => {

    switch (deleteResultado) {
        
        case "'menor'":
            cy.get('@get_produtos_response_before').then( get_produtos_response_before => {
                Rest.httpRequestWithoutBody('GET', `/produtos/${get_produtos_response_before.body._id}`).then( get_produtos_response_after => {
                    return expect(get_produtos_response_before.body.quantidade).to.greaterThan(get_produtos_response_after.body.quantidade)
                })
            })
            break; 

        case "'sem alteração'":
            cy.get('@get_produtos_response_before').then( get_produtos_response_before => {
                Rest.httpRequestWithoutBody('GET', `/produtos/${get_produtos_response_before.body._id}`).then( get_produtos_response_after => {
                    return expect(get_produtos_response_before.body.quantidade).to.equal(get_produtos_response_after.body.quantidade)
                })
            })
    }
})