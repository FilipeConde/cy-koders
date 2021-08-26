# cy-koders
___________________________

## Atividade 

- Elaborar uma automação de testes de API usando Cypress;
- Usar a estrutura de testes do Cypress de maneira coerente e semântica (_describe_, _context_, _it_...);
- Optar por design pattern _Service Objects_ e/ou _custom commands_ do cypress;
- Procurar cobrir todas as rotas e comportamentos da API;
- Aplicar report (sugiro [Mocha Awesome](https://www.npmjs.com/package/mochawesome), mas fiquem livres para escolher);
- Entre cobrir 100% da API e implementar as práticas com maior qualidade e organização, optar pela segunda alternativa;
- Usar gitflow e organizar as atividades em andamento entre o time;

___________________________
## Recursos:

#### API
[ServeRest](https://serverest.dev/#/)
- Usar preferencialmente execução local;
- Caso desejem, podem implementar seleção de ambiente para alternar entre web e local.

#### Cobertura de testes
[Como verificar a cobertura de testes de APIs REST](https://medium.com/revista-dtar/como-verificar-a-cobertura-de-testes-da-api-rest-9e2f745564b)
por Nayara Safenraider Crema
 
 #### Reporter
[Using Mochawesome Reporter with Cypress](https://dev.to/bushraalam/using-mochawesome-reporter-with-cypress-54pf)
por Bushra Alam (em inglês)

___________________________
## Implementação do Mocha Reports com Mochawesome

    [1] Instalar o Mochawesome
            npm install --save-dev mochawesome

    [2] Especificar no arquivo de configuração cypress.json o package name e
        as opções de comportamento, conforme abaixo:

            {
            "reporter": "mochawesome",
            "reporterOptions": {
                "reportDir": "cypress/report/mochawesome-report",
                "overwrite": true,
                "html": true,
                "json": false,
                "timestamp": "mm-dd-yyyy_HH'h'MM'm'ss's'"
            }

    [3] Criar o diretório onde serão armazenadas as informações de execução,
        conforme foi especificado nas opções de comportamento.
            Ex.: em "cypress/report/mochawesome-report"

    [4] Executar o comando npx cypress run para gerar o relatório

#### Mochawesome 
[NPM MochaAwesome](https://www.npmjs.com/package/mochawesome)
[More cypress reporting tutorial](https://docs.cypress.io/guides/tooling/reporters#Custom-reporter)
[Vídeo instalação e configuração](https://www.youtube.com/watch?v=01ftaohnMj0)

___________________________

_*fiquem à vontade para ampliar este documento;_