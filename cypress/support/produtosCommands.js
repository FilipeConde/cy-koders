import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import ProdServ from '../services/produtos.service'

const URL_PRODUTOS = '/produtos'

Cypress.Commands.add('postProdutos', (typeProd, auth) => {

    let body

    switch(typeProd){

        case 'valido':
        case 'sem preencher o nome':   
        case 'com preço menor que 1':
        case 'sem preencher a descrição':
        case 'com quantidade menor que 0':
            body = DynamicFactory.criarProdutos(typeProd)
            return Rest.httpRequestWithBody('POST', URL_PRODUTOS, body, { authorization: auth })
        
        case 'invalido':
            body = ProdServ.bodyInvalidProdName(typeProd, auth)
            return Rest.httpRequestWithBody('POST', URL_PRODUTOS, body, { authorization: auth })

        default:
            return { notfound: cy.log('cy.postProdutos - typeProd não encontrado'), notfound: 'cy.postProdutos - typeProd não encontrado' }
        
    } 
    
       
})

Cypress.Commands.add('getProdutos', (typeProd) => {
    
   
   
       switch(typeProd){    
          
   
           case 'ID válido': 
              return ProdServ.giveMeValidProductID().then( post_response => {
              let tempurl = `${URL_PRODUTOS}/${post_response}`
               Rest.httpRequestWithoutBody('GET', tempurl)
            })
   
           case 'ID inválido':
               let idProd = DynamicFactory.geradorID()
               let tempurl = `${URL_PRODUTOS}/${idProd}`
               return Rest.httpRequestWithoutBody('GET', tempurl)
           
       }
   })


Cypress.Commands.add('validacaoGetProdutos', (typeProd, res, itensProdutos) => {

    switch(typeProd){        
        case 'ID válido':
            return expect(res.body[itensProdutos.propriedade]).exist
        case 'ID inválido':
            return expect(res.body[itensProdutos.propriedade]).to.equal(itensProdutos.message)
    }
})    