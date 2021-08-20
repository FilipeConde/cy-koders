  
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
            case 'invalido':
                return {
                    "nome": nomeFaker,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
            case 'sem preencher o nome':
                return {
                    "nome": "",
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
            case 'sem preencher o email':
                return {
                    "nome": nomeFaker,
                    "email": "",
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
            case 'sem preencher a senha':
                return {
                    "nome": nomeFaker,
                    "email": faker.internet.email(),
                    "password": "",
                    "administrador": admin.toString(),
                }
            case 'sem preencher a permissão de adm':
                return {
                    "nome": nomeFaker,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": "",
                }
                    
                
        }    

    }
}