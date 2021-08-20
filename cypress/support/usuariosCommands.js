import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

Cypress.Commands.add('postUsuarios', (typeUser) => {

    let body = DynamicFactory.criarUsuario(typeUser)
    return Rest.httpRequestWithBody('POST', '/usuarios', body)

})

Cypress.Commands.add('getUsuarios', (iduser) => {

    let tempurl = `/usuarios/${iduser}`
    return Rest.httpRequestWithBody('GET', tempurl)

})