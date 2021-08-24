import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

const URL_CARRINHOS

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