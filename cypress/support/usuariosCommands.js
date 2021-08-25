import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import UserServ from '../services/usuarios.service'

const URL_USUARIOS = '/usuarios'

Cypress.Commands.add('postUsuarios', (typeUser) => {

    let body

    switch(typeUser){
        case 'valido':
        case 'ID válido':
        case 'com permissão':  
        case 'sem permissão':      
            body = DynamicFactory.criarUsuario(typeUser)
            return Rest.httpRequestWithBody('POST', URL_USUARIOS, body)
        
        case 'invalido':
            body = UserServ.bodyInvalidEmail(typeUser)
            return Rest.httpRequestWithBody('POST', URL_USUARIOS, body)
        
        case 'sem preencher o nome':
        case 'sem preencher o email':
        case 'sem preencher a senha':
        case 'sem preencher a permissão de adm':
            body = DynamicFactory.criarUsuario(typeUser)
            return Rest.httpRequestWithBody('POST', URL_USUARIOS, body)

        default:
            return { notfound: cy.log('cy.postUsuarios - typeUser não encontrado') }
    } 
})

Cypress.Commands.add('getUsuarios', (typeUser) => {

    switch(typeUser){     

        case 'ID válido':
        case 'valido':
        case 'com permissão':
        case 'sem permissão':         
            return UserServ.giveMeValidUserID(typeUser).then( post_response => {
                let tempurl = `${URL_USUARIOS}/${post_response.body._id}`
                Rest.httpRequestWithoutBody('GET', tempurl)
            })

        case 'ID inválido':
            let idUser = DynamicFactory.geradorID()
            let tempurl = `${URL_USUARIOS}/${idUser}`
            return Rest.httpRequestWithoutBody('GET', tempurl)
        
        case 'nenhum ID':
            UserServ.giveMeValidUserID('valido')
            return Rest.httpRequestWithoutBody('GET', URL_USUARIOS)

        default:
            return { notfound: cy.log('cy.getUsuarios - typeUser não encontrado') }
    }
})

Cypress.Commands.add('validacaoGetUsuarios', (typeUser, res, itensUsuarios) => {

    switch(typeUser){        
        case 'ID válido':
            return expect(res.body[itensUsuarios.propriedade]).exist
        case 'ID inválido':
            return expect(res.body[itensUsuarios.propriedade]).to.equal(itensUsuarios.message)
        case 'nenhum ID':
            return expect(res.body[itensUsuarios.propriedade]).to.greaterThan(itensUsuarios.message)
    }
})

Cypress.Commands.add('putUsuarios', (typeUser) => {

    let body

    switch(typeUser){
        
        case 'valido':            
            UserServ.giveMeValidUserID('valido').then( post_response => {
                let tempurl = `${URL_USUARIOS}/${post_response.body._id}`
                body = DynamicFactory.criarUsuario(typeUser)
                return Rest.httpRequestWithBody('PUT', tempurl, body)
            })
            break;
        
        case 'invalido':
            UserServ.giveMeValidUserID(typeUser).then( post_response => {
                let tempurl = `${URL_USUARIOS}/${post_response.body._id}`
                body = UserServ.bodyInvalidEmail(typeUser)
                return Rest.httpRequestWithBody('PUT', tempurl, body)
            })
            break;
        
        case 'inexistente':
            let idUser = DynamicFactory.geradorID()
            let tempurl = `${URL_USUARIOS}/${idUser}`
            body = DynamicFactory.criarUsuario('valido')
            return Rest.httpRequestWithBody('PUT', tempurl, body)
        
        case 'sem preencher o nome':
        case 'sem preencher o email':
        case 'sem preencher a senha':
        case 'sem preencher a permissão de adm':
            UserServ.giveMeValidUserID('valido').then( post_response => {
                let tempurl = `${URL_USUARIOS}/${post_response.body._id}`
                body = DynamicFactory.criarUsuario(typeUser)
                return Rest.httpRequestWithBody('PUT', tempurl, body)
            })
            break;
    } 
})

Cypress.Commands.add('deleteUsuarios', (typeUser) => {

    switch(typeUser){
        case 'ID válido':
            cy.postUsuarios('valido').then(post_usuarios_response  => {
              return Rest.httpRequestWithoutBody('DELETE', `${URL_USUARIOS}/${post_usuarios_response.body._id}`)  
             
            })
            
            break;

        case 'ID inválido':
            let usuarioInvalido = DynamicFactory.geradorID()
            return Rest.httpRequestWithoutBody('DELETE', `${URL_USUARIOS}/${usuarioInvalido}`) 

        case 'Usuário com carrinho':
           cy.getCarrinhos('ID válido').then(get_carrinhos_response => {
               cy.log(get_carrinhos_response.body.idUsuario)
               return Rest.httpRequestWithoutBody('DELETE', `${URL_USUARIOS}/${get_carrinhos_response.body.idUsuario}`) 
           })
    }

})