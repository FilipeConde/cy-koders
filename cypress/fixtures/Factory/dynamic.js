import faker from 'faker'
faker.locale = 'pt_BR'

   
export default class DynamicFactory {

    static geradorID(){
        const userID = faker.random.alphaNumeric(16)
        return userID
    }

    static criarUsuario(typeUser, admin = true){

        switch(typeUser){
            
            case 'valido':
            case 'ID válido':
            case 'invalido':
            case 'com permissão':    
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": `${faker.random.alphaNumeric(7)}_${faker.random.alphaNumeric(7)}@outlook.com`,
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
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": "",
                    "password": faker.internet.password(),
                    "administrador": admin.toString(),
                }
            case 'sem preencher a senha':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": "",
                    "administrador": admin.toString(),
                }
            case 'sem preencher a permissão de adm':
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": "",
                }
            case 'sem permissão':    
                return {
                    "nome": `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`,
                    "email": faker.internet.email(),
                    "password": faker.internet.password(),
                    "administrador": "false",
                }
            default:
                return { notfound: cy.log('DynamicFactory.criarUsuario - typeUser não encontrado') }
        }
    }
    
    static realizarLogin(typeLogin){

        switch(typeLogin){

            case 'valido':
            case 'invalido':
                return {
                    "email"   : faker.internet.email(),
                    "password": faker.internet.password(),
                }
            case 'sem preencher a senha':
                return {
                    "email"   : faker.internet.email(),
                    "password": "",
                }
            case 'sem preencher o email':
                return {
                    "email"   : "",
                    "password": faker.internet.password(),
                }
        }         
    }
    
    static criarProdutos(typeProd){

        switch(typeProd){

            case 'valido':
            case 'invalido':
                return {
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }
            case 'sem preencher o nome':
                return{
                    "nome": "",
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }    
            case 'com preço menor que 1':
                return{
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'max': 0}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }
            case 'sem preencher a descrição':
                return{
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": "",
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }
            case 'com quantidade menor que 0':
                return{
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'max': -1})
                }
        }
    }
    
    static putProdutos(typeProd){

        switch(typeProd){

            case 'valido':
            case 'invalido':            
                return {
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }
            case 'sem preencher o nome':
                return{
                    "nome": "",
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }    
            case 'com preço menor que 1':
                return{
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'max': 0}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }
            case 'sem preencher a descrição':
                return{
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": "",
                    "quantidade": faker.datatype.number({'min': 4, 'max': 800})
                }
            case 'com quantidade menor que 0':
                return{
                    "nome": `${faker.commerce.product()} ${faker.address.cityName()} ${faker.address.cityName()}`,
                    "preco": faker.datatype.number({'min': 10, 'max': 9999}),
                    "descricao": faker.lorem.sentence(),
                    "quantidade": faker.datatype.number({'max': -1})
                }
        }
    }

    static postCarrinhos(typeProd, prodID){
        switch(typeProd){

            case 'valido':
            case 'inexistente':
                return {
                    "produtos": [
                      {
                        "idProduto": prodID,
                        "quantidade": faker.datatype.number({'min': 1, 'max': 4})
                      }
                    ]
                  }
            case 'duplicado':
            return {
                "produtos": [
                    {
                        "idProduto": prodID,
                        "quantidade": faker.datatype.number({'min': 1, 'max': 2})
                    },
                    {
                        "idProduto": prodID,
                        "quantidade": faker.datatype.number({'min': 1, 'max': 2})
                    }
                ]
            }
            case 'sem quantidade disponível':
                return {
                    "produtos": [
                      {
                        "idProduto": prodID,
                        "quantidade": faker.datatype.number({'min': 801})
                      }
                    ]
                  }
            case 'sem preencher ID':
                return{
                    "produtos": [
                      {
                        "idProduto": "",
                        "quantidade": faker.datatype.number({'min': 801})
                      }
                    ]
                  }

            case 'com quantidade menor que 1':
                return{
                    "produtos": [
                      {
                        "idProduto": prodID,
                        "quantidade": faker.datatype.number({'max': 0})
                      }
                    ]
                  }           
        }
    }

<<<<<<< HEAD

=======
>>>>>>> main
}



  