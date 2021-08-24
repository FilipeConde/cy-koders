import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'
import CarServ from '../services/carrinhos.service'

const URL_CARRINHOS = '/carrinhos'

Cypress.Commands.add('getCarrinhos', (typeCar) => {
    
   
    let body
    switch(typeCar){    
         

        case 'ID válido': 
             return ProdServ.giveMeValidCarID().then( post_response => {
             let tempurl = `${URL_CARRINHOS}/${post_response}`
             Rest.httpRequestWithBody('GET', tempurl, body)
         })

        case 'ID inválido':
            let idCar = DynamicFactory.geradorID()
            let tempurl = `${URL_CARRINHOS}/${idCar}`
            return Rest.httpRequestWithoutBody('GET', tempurl)
      
    }
})


Cypress.Commands.add('validacaoGetCarrinhos', (typeCar, get_car_response, itensCarrinhos) => {

    switch(typeCar){        
        case 'ID válido':
            cy.get('@post_car_response').then(post_car_response => {
                expect(get_car_response.body._id).to.equal(post_car_response.body._id)
                return expect(get_car_response.body[itensCarrinhos.propriedade]).exist
            })
            break;            
        case 'ID inválido':
            return expect(get_car_response.body[itensCarrinhos.propriedade]).to.equal(itensCarrinhos.message)
        case 'nenhum ID':
            return expect(get_car_response.body[itensCarrinhos.propriedade]).to.greaterThan(itensCarrinhos.message)
            
    }   
})