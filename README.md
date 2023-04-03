#  Supergym - API 💪

API desenvolvida para um app que possibilita a criação de treinos personalizados por personais trainers, e a facilidade de envio para os seus clientes.

##  Docker 🐳

Docker é uma plataforma de software que permite que aplicativos sejam executados em contêineres, criando um ambiente isolado para o aplicativo e suas dependências. Para utilizá-lo no computador, é necessário instalar o Docker Engine. 

Além disso, o Docker Desktop é uma opção conveniente que inclui o Docker Engine e outras ferramentas úteis para o desenvolvimento de aplicativos em contêineres. 

**Saiba mais**: [Docker](https://www.docker.com/)

## Inicialização do projeto 🚀

Com o Docker instalado, agora basta instalar as dependências utilizando seu gerenciador de pacotes:

```bash
yarn install
```

```bash
npm install
```
Lembre-se de inserir as credenciais do banco de dados no arquivo .env antes de tentar inicializar.

Após instalar as dependências, execute:

```bash
docker compose up -d
```
## Aplicação inicializada ⚡️

Para verificar os containers em execução, execute o comando:

```bash
docker ps
```

### Executando comandos dentro dos containers 📦

Precisamos entrar no container do nosso servidor para executar as migrations e assim estaremos hábeis a realizar requisições HTTP, e tambem obter as respectivas respostas. 

Para isso executaremos o comando:

```bash
docker exec -it api_supergym bash
```

Com o comando acima entramos no nosso container para executar as migrations do nosso banco de dados.

> Uma forma mais simples de acessar os containers é indo no seu Docker Desktop e executar os comandos direto no Terminal do container.

Executando migrations:

```bash
yarn prisma migrate dev
```

Dessa forma as migrations serão executadas e o nosso banco de dados estará pronto.

### Modelagem do Banco de Dados ⿻
A API Supergym possui quatro tabelas principais: **users, categories, trainings e exercises**.

Tabela   | Descrição
--------- | ------
users| Tabela responsável por armazenar os dados dos usuários do sistema, incluindo nome, e-mail e senha.
categories | Tabela responsável por armazenar as categorias de exercícios disponíveis, incluindo nome e ícone.
trainings | Tabela responsável por armazenar as informações dos treinos criados pelos personal trainers.
exercises | Tabela responsável por armazenar as informações dos exercícios disponíveis, incluindo nome, descrição, instruções, séries, tempo de descanso, caminho da imagem e categoria correspondente.
_trainings | Tabela de relacionamento entre exercícios e treinos, indicando quais exercícios fazem parte de cada treino.

### Design da Arquitetura ✍️

O design de arquitetura Data Mapper é utilizado nesta aplicação para separar as preocupações em diferentes camadas: **repositories, services e controllers.**

Camada   | Descrição
--------- | ------
Repositories| Responsável por lidar com a camada de persistência de dados, realizando consultas e alterações no banco de dados. A utilização do Data Mapper garante uma separação clara entre o modelo de dados e a lógica de negócios, facilitando a manutenção e a escalabilidade do sistema.
Services | Responsável pela lógica de negócios da aplicação, garantindo que as regras sejam aplicadas de forma consistente e coerente. Com a separação entre as camadas de dados e serviços, é possível realizar testes automatizados de forma mais eficiente e confiável.
Controller | Responsável por receber as requisições HTTP, realizar a validação dos dados, chamar os serviços necessários e retornar as respostas HTTP apropriadas. A utilização de um controlador facilita a organização do código e a manutenção da aplicação.

Com essa arquitetura, é possível ter uma aplicação organizada e com as responsabilidades bem definidas, o que facilita a manutenção e evolução do sistema.

### Rotas HTTP com Middleware de Autenticação e Tratamento de Erros

Estamos utilizando rotas HTTP na aplicação que possuem um middleware de **autenticação e um errorHandler.**

> Os middlewares utilizados na aplicação são o authMiddleware e errorHandler. O authMiddleware verifica se o usuário está autenticado, extrai o token do cabeçalho da requisição, valida o token e adiciona o ID do usuário ao objeto de requisição do Express. 

> Já o errorHandler trata e transforma erros em uma resposta padronizada, utilizando a classe personalizada ApiError, que contém informações como o status e mensagem de erro. 


#### Endpoints

| Endpoints | Métodos | Descrição | Autenticação
|---|---|---| ---|
| /user | POST | Cria um novo usuário | Não |
| /auth | POST | Autentica um usuário e gera um token de acesso| Não |
| /categories | GET | 	Retorna uma lista de categorias disponíveis| Sim |
| /categories | POST | Cria uma nova cateogira | Sim |
| /categories/:exerciseId/exercises | GET | Retorna exercícios de apenas uma categoria | Sim |
| /categories| PUT | Atualiza uma categoria específica | Sim |
| /categories| DELETE | Deleta uma categoria específica | Sim |
| /trainings:id| POST | Cria um novo treino| Sim |
| /trainings:userId| GET | Retorna uma lista de treinos disponíveis criados por um usuário| Sim |
| /trainings:id| GET | Retorna detalhes de um treino específico| Sim |
| /trainings:id| PUT | Atualiza um treino específico| Sim |
| /trainings:id| DELETE | Deleta um treino específico| Sim |


## Testes

Para garantir a qualidade do código e do desenvolvimento da aplicação utilizaremos testes unitários e testes de integração. 

>Testes unitários não podem garantir a integridade do sistema como um todo, e os testes E2E são essenciais para validar o fluxo completo da aplicação.

#### Testes Unitários

Os testes unitários são utilizados para testar as funcionalidades isoladas do código, ou seja, testar as funções ou métodos de uma classe separadamente. Isso permite encontrar e corrigir problemas mais cedo no processo de desenvolvimento, facilitando a manutenção do código e diminuindo o risco de bugs em produção.

#### Testes E2E

Testes E2E (End-to-End) são usados para verificar o comportamento completo da aplicação, desde a entrada de uma requisição até a resposta final. Eles garantem que as várias partes do sistema estejam integradas e funcionando corretamente, incluindo rotas, autenticação, banco de dados e outras dependências. 

Os testes E2E devem ser executados em um ambiente semelhante ao de produção e simulam o uso real da aplicação pelo usuário final. Eles podem ser implementados usando ferramentas como o Supertest para o Node.js e o Selenium para navegadores web.

### Executando os testes 

Os testes estão na pasta raiz do repositório [__tests__](./__tests__/). Separamos em 2 pastas para manter a organização: [integration](./__tests__/integration) e [unit](./__tests__/unit/).

##### Testes E2E

Para executar os testes de integração garanta que a aplicação esteja em execução. 

Precisamos entrar no nosso container para executar o teste.

```bash
docker exec -it api_supergym sh
```

Em seguida execute:

```bash
yarn test __tests__/integration/integration.test.ts
```

Perceba que estamos executando um arquivo específico dentro da nossa pasta [integration](./__tests__/integration/). 

Isso ocorre pois os nossos testes são interdependentes e precisam ser executados em uma ordem específica. 

Por exemplo: como vamos testar a rota de autenticação sem criar o usuário antes? E assim por diante.

##### Testes Unitários

Já os testes unitários não precisam nem ter a aplicação em execução e nem precisam ser executados dentro dos containers, pois o propósito deles é testar cada funcionalidade de forma isolada, sem dependências externas.

Para isso, execute:

```bash
yarn test unit
```