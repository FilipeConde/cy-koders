import DynamicFactory from '../fixtures/factory/dynamic'
import Rest from '../services/common/_rest.service'

export default class CarServ {

    static giveMeValidCarID(){
        

        
    }    
    

    static bodyInvalidCarName(typeCar, auth){

        let body = DynamicFactory.postCarrinhos(typeCar)
        Rest.httpRequestWithBody('POST', '/carrinhos', body, { authorization: auth })
        let carIdProduto = body.idProduto
        body = DynamicFactory.postCarrinhos(typecar)
        body.idProduto = carIdProduto
        
        return body
    }

}
