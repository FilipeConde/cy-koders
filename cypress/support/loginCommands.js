import Factory from '../fixtures/Factories/factory'
import Rest from '../services/common/_rest.service'

Cypress.Commands.add('postLogin', (typeLogin) => {

    let body = Factory.realizarLogin(typeLogin)
    return Rest.httpRequestWithBody('POST', '/login', body)

})
