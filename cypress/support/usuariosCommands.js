import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import UserServ from '../services/usuarios.service'

Cypress.Commands.add('postUsuarios', (typeUser) => {

    let body
    let email

    switch(typeUser){
        case 'valido':
            body = DynamicFactory.criarUsuario(typeUser)
            return Rest.httpRequestWithBody('POST', '/usuarios', body)
        
        case 'invalido':
            body = UserServ.bodyInvalidEmail(typeUser)
            return Rest.httpRequestWithBody('POST', '/usuarios', body)
        
        case 'sem preencher o nome':
            body = DynamicFactory.criarUsuario(typeUser)
            return Rest.httpRequestWithBody('POST', '/usuarios', body)

        case 'sem preencher o email':
            body = DynamicFactory.criarUsuario(typeUser)
            return Rest.httpRequestWithBody('POST', '/usuarios', body)

        case 'sem preencher a senha':
            body = DynamicFactory.criarUsuario(typeUser)
            return Rest.httpRequestWithBody('POST', '/usuarios', body)

        case 'sem preencher a permissão de adm':
                body = DynamicFactory.criarUsuario(typeUser)
                return Rest.httpRequestWithBody('POST', '/usuarios', body)
    }
        
    

})

Cypress.Commands.add('getUsuarios', (iduser) => {

    let tempurl = `/usuarios/${iduser}`
    return Rest.httpRequestWithBody('GET', tempurl)

})