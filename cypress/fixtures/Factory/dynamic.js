import faker from 'faker'
faker.locale = 'pt_BR'

export default class DynamicFactory {

    nomeFaker = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`
    produtoFaker = `${faker.commerce.product()} ${faker.commerce.color()} da ${faker.finance.currencyCode()} ${faker.name.jobArea()}`

    static geradorID(){
        const userID = faker.random.alphaNumeric(16)
        return userID
    }

}