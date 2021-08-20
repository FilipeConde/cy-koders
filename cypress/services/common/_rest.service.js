export default class Rest {
        
    static httpRequestWithBody(method, endpoint, body, failOnStatusCode = false, timeout = Cypress.env      ('global_timeout')){
        return cy.request({
            method: method, 
            url: endpoint, 
            body: body, 
            failOnStatusCode: failOnStatusCode, 
            timeout: timeout
        })
    }

    static httpRequestWithoutBody(method, endpoint, failOnStatusCode = false, timeout = Cypress.env     ('global_timeout')){
        return cy.request({
            method: method, 
            url: endpoint, 
            failOnStatusCode: failOnStatusCode, 
            timeout: timeout
        })
    }

}