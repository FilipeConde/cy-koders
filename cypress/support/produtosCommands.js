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
        case "sem enviar a propriedade 'nome'":
        case "sem enviar a propriedade 'preço'":
        case "sem enviar a propriedade 'descrição'":
        case "sem enviar a propriedade 'quantidade'":
        case 'duplicado':
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
      
   
    let prodID

    switch(typeProd){
        case 'ID válido':
            ProdServ.cadastrarProduto()
            cy.get('@post_prod_response').then(post_prod_response => {
                prodID = post_prod_response.body._id
                return Rest.httpRequestWithoutBody('GET', `${URL_PRODUTOS}/${prodID}`)
            })
            break;
        case 'ID inválido':
            prodID = DynamicFactory.geradorID()
            return Rest.httpRequestWithoutBody('GET', `${URL_PRODUTOS}/${prodID}`)            
        case 'nenhum ID':
            return Rest.httpRequestWithoutBody('GET', URL_PRODUTOS)
    }
})


Cypress.Commands.add('putProdutos', (typeProd, auth) => {

    let body
    let prodID

    switch(typeProd){

        case 'valido':
        case 'sem preencher o nome':   
        case 'com preço menor que 1':
        case 'sem preencher a descrição':
        case 'com quantidade menor que 0':
        case "sem enviar a propriedade 'nome'":
        case "sem enviar a propriedade 'preço'":
        case "sem enviar a propriedade 'descrição'":
        case "sem enviar a propriedade 'quantidade'":
            cy.postProdutos('valido', auth).then( post_prod_response => {
                prodID = post_prod_response.body._id
                body = DynamicFactory.putProdutos(typeProd)
                return Rest.httpRequestWithBody('PUT', `${URL_PRODUTOS}/${prodID}`, body, { authorization: auth })
            })
            break;        
        case 'invalido':
            cy.postProdutos(typeProd, auth).then( post_prod_response => {
                prodID = post_prod_response.body._id
                body = ProdServ.bodyInvalidProdName(typeProd, auth)
                return Rest.httpRequestWithBody('PUT', `${URL_PRODUTOS}/${prodID}`, body, { authorization: auth })
            })
            break;
        case 'inexistente':
            prodID = DynamicFactory.geradorID()
            body = DynamicFactory.putProdutos('valido')
            return Rest.httpRequestWithBody('PUT', `${URL_PRODUTOS}/${prodID}`, body, { authorization: auth })
        default:
            return { notfound: cy.log('cy.putProdutos - typeProd não encontrado'), notfound: 'cy.putProdutos - typeProd não encontrado' }
        
    } 
})

Cypress.Commands.add('validacaoGetProdutos', (typeProd, get_prod_response, itensProdutos) => {

    switch(typeProd){        
        case 'ID válido':
            cy.get('@post_prod_response').then(post_prod_response => {
                expect(get_prod_response.body._id).to.equal(post_prod_response.body._id)
                return expect(get_prod_response.body[itensProdutos.propriedade]).exist
            })
            break;            
        case 'ID inválido':
            return expect(get_prod_response.body[itensProdutos.propriedade]).to.equal(itensProdutos.message)
        case 'nenhum ID':
            return expect(get_prod_response.body[itensProdutos.propriedade]).to.greaterThan(itensProdutos.message)
            
    }   
})

Cypress.Commands.add('deleteProdutos', (typeProd, auth) => {
    
    

    switch(typeProd){
        case 'existente':
            cy.postProdutos('valido', auth).then(post_produtos_response  => {
               return Rest.httpRequestWithoutBody('DELETE', `${URL_PRODUTOS}/${post_produtos_response.body._id}`, { authorization: auth }) 
             
            })
            break;

        case 'Produto faz parte do carrinho':
            cy.postCarrinhos('valido', 'valido', auth).then( post_carrinhos_response => {
                Rest.httpRequestWithoutBody('GET', `${'/carrinhos'}/${post_carrinhos_response.body._id}`).then(get_carrinhos_response => {
                    let produto = get_carrinhos_response.body.produtos[0].idProduto
                    Rest.httpRequestWithoutBody('DELETE', `${URL_PRODUTOS}/${produto}`, { authorization: auth }) 
                })
            })
            break;

        case 'Token ausente, inválido ou expirado':
            cy.postProdutos('valido', auth).then(post_produtos_response  => {
                return Rest.httpRequestWithoutBody('DELETE', `${URL_PRODUTOS}/${post_produtos_response.body._id}`, {authorization: 'Token invalido'})    
            })
            break;

        case 'Rota exclusiva para administradores':
            cy.postProdutos('valido', auth).then(post_produtos_response => {
                cy.get('@post_response').then (post_usuarios_response => {
                     cy.log(post_usuarios_response.body._id)
                     let body = DynamicFactory.criarUsuario('sem permissão')
                     let bodyPutEmail = body.email
                     let bodyPutSenha = body.password
                     Rest.httpRequestWithBody('PUT', `/usuarios/${post_usuarios_response.body._id}`, body)
                     body = DynamicFactory.realizarLogin('valido')
                     body.email = bodyPutEmail
                     body.password = bodyPutSenha  
                     Rest.httpRequestWithBody('POST', `/login`, body).then(post_login_response => {
                         cy.log(post_login_response.body.authorization)
                         cy.wrap(post_login_response).as('post_login_response')
                     })
                })
                cy.get('@post_login_response').then(post_login_response => {
                    return Rest.httpRequestWithoutBody('DELETE', `${URL_PRODUTOS}/${post_produtos_response.body._id}`, {authorization: post_login_response.body.authorization})    
                })

            })
    }
})