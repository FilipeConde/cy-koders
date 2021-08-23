import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import UserServ from '../services/usuarios.service'

const URL_USUARIOS = '/usuarios'

Cypress.Commands.add('postUsuarios', (typeUser) => {

    let body

    switch(typeUser){
        case 'valido':
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
            UserServ.giveMeValidUserID()
            return Rest.httpRequestWithoutBody('GET', URL_USUARIOS)
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
            UserServ.giveMeValidUserID().then( post_response => {
                let tempurl = `${URL_USUARIOS}/${post_response.body._id}`
                body = DynamicFactory.criarUsuario(typeUser)
                return Rest.httpRequestWithBody('PUT', tempurl, body)
            })
            break;
        
        case 'invalido':
            UserServ.giveMeValidUserID().then( post_response => {
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
            UserServ.giveMeValidUserID().then( post_response => {
                let tempurl = `${URL_USUARIOS}/${post_response.body._id}`
                body = DynamicFactory.criarUsuario(typeUser)
                return Rest.httpRequestWithBody('PUT', tempurl, body)
            })
            break;
    } 
})