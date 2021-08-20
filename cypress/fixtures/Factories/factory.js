export default class Factory {

    static realizarLogin(typeLogin){

        switch(typeLogin){

            case 'valido':
                return {
                    "email"   : "fulano@qa.com",
                    "password": "teste"
                }
            case 'invalido':
                return {
                    "email"   : "fulano@qa.com",
                    "password": "testeInvalido"
                    }
          
        }    

    }
}