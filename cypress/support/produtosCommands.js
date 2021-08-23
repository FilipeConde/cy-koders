
import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import ProdServ from '../services/produtos.service'


const URL_PRODUTOS = '/produtos'


Cypress.Commands.add('getProdutos', (typeProd) => {
    
    let body

    switch(typeProd){    
         

        case 'ID válido': 

            body = DynamicFactory.(typeProd)        
            return ProdServ.giveMeValidProductID().then( post_response => {
                let tempurl = `${URL_PRODUTOS}/${post_response.body._id}`
                Rest.httpRequestWithoutBody('GET', tempurl)
            })

        case 'ID inválido':
            let idProd = DynamicFactory.geradorID()
            let tempurl = `${URL_PRODUTOS}/${idProd}`
            return Rest.httpRequestWithoutBody('GET', tempurl)
        
        case 'nenhum ID':
            ProdServ.giveMeValidProductID()
            return Rest.httpRequestWithoutBody('GET', URL_PRODUTOS)
    }
})

Cypress.Commands.add('validacaoGetProdutos', (typeUser, res, itensProdutos) => {

    switch(typeUser){        
        case 'ID válido':
            return expect(res.body[itensProdutos.propriedade]).exist
        case 'ID inválido':
            return expect(res.body[itensProdutos.propriedade]).to.equal(itensProdutos.message)
        case 'nenhum ID':
            return expect(res.body[itensProdutos.propriedade]).to.greaterThan(itensProdutos.message)
    }
})