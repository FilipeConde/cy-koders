import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import ProdServ from '../services/produtos.service'

const URL_PRODUTOS = '/produtos'

Cypress.Commands.add('postProdutos', (typeProd, auth) => {

    let body

    switch(typeProd){
        
        case 'valido':
        case 'sem permissão':
        case 'sem preencher o nome':   
        case 'com preço menor que 1':
        case 'sem preencher a descrição':
        case 'com quantidade menor que 0':
            body = DynamicFactory.criarProdutos(typeProd)
            return Rest.httpRequestWithBody('POST', URL_PRODUTOS, body, { authorization: auth })
        
        case 'invalido':
            body = ProdServ.bodyInvalidProdName(typeProd, auth)
            return Rest.httpRequestWithBody('POST', URL_PRODUTOS, body, { authorization: auth })
        
    } 
})