import faker from 'faker'
faker.locale = 'pt_BR'

const nomeFaker = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`
const produtoFaker = `${faker.commerce.product()} ${faker.commerce.color()} da ${faker.finance.currencyCode()} ${faker.name.jobArea()}`
   

export default class DynamicFactory {

    
    static geradorID(){
        const userID = faker.random.alphaNumeric(16)
        return userID
    }

    static criarUsuario(typeUser, admin = true){

        switch(typeUser){

            case 'valido':
            case 'invalid':
                return {
                    "nome": nomeFaker,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
        }    

    }
}