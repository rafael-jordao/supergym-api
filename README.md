#  Supergym - API 💪

API desenvolvida para um app que possibilita a criação de treinos personalizados por personais trainers, assim facilitando o envio para os seus clientes.

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

#### Relacionamentos

Tabela   | Relacionamento
--------- | ------
users| 1 para N com trainings, 1 para N com exercises
categories | 1 para N com exercises
trainings | 1 para N com _trainings, N para 1 com users
exercises | 1 para N com _trainings, N para 1 com categories, N para 1 com users
_trainings | N para 1 com exercises, N para 1 com trainings

#### Entidades e Atributos

Entidade   | Atributos
--------- | ------
users| id, name, email, password, created_at, updated_at
categories | id, name, icon
trainings | id, clientName, userId
exercises | id, name, description, instructions, series, waitTime, imagePath, categoryId, userId
_trainings | A, B

#### Restrições 

Relacionamento   | Descrição
--------- | ------
users_email_key	| Restrição de chave única que impede emails duplicados na tabela users
_trainings_AB_unique | Restrição de chave única que impede a duplicação da combinação de valores em A e B na tabela _trainings
_trainings_B_index | 	Índice que otimiza a pesquisa de registros na coluna B na tabela _trainings
trainings_userId_fkey	 | Restrição de chave estrangeira que relaciona a coluna userId na tabela trainings com a coluna id na tabela users
exercises_categoryId_fkey | Restrição de chave estrangeira que relaciona a coluna categoryId na tabela exercises com a coluna id na tabela categories
exercises_userId_fkey | Restrição de chave estrangeira que relaciona a coluna userId na tabela exercises com a coluna id na tabela users
_trainings_A_fkey | Restrição de chave estrangeira que relaciona a coluna A na tabela _trainings com a coluna id na tabela exercises
_trainings_B_fkey | Restrição de chave estrangeira que relaciona a coluna B na tabela _trainings com a coluna id na tabela trainings

## Prisma - ORM ▲

Estamos utilizando o [Prisma](https://www.prisma.io/), um ORM (Object-Relational Mapping) moderno e poderoso que facilita a interação entre aplicativos e bancos de dados. Com ele, é possível escrever consultas seguras e tipadas em linguagens de programação populares, como TypeScript e JavaScript, e mapear as entidades do banco de dados para objetos em sua aplicação. 

O Prisma também oferece recursos avançados, como migrações de banco de dados, gerenciamento de transações e uma CLI (Command Line Interface) amigável para facilitar o desenvolvimento. Ele suporta uma variedade de bancos de dados, incluindo PostgreSQL, MySQL e SQLite

#### Vantagens do Prisma em relação a outros ORMs TypeScript:

 1. **Performance:** o Prisma utiliza o protocolo binário do banco de dados para comunicação direta e otimizada com o banco de dados, o que o torna mais rápido do que outros ORMs.

2. **Type-safety:** o Prisma é totalmente type-safe, o que significa que o TypeScript pode detectar erros de tipo antes mesmo de você executar seu código. Isso ajuda a evitar erros comuns que ocorrem com outros ORMs.

  3. **CLI poderosa:** o Prisma possui uma CLI fácil de usar, que facilita a configuração e a migração do banco de dados, além de gerar código TypeScript automaticamente.

#### Desvantagens do Prisma em relação a outros ORMs TypeScript:

  1. **Documentação em evolução:** como o Prisma é relativamente novo, sua documentação ainda está evoluindo e pode ser um pouco escassa em alguns pontos.

  2. **Menos flexível:** o Prisma foi projetado para trabalhar com bancos de dados específicos (por exemplo, MySQL, PostgreSQL), o que significa que pode ser menos flexível do que outros ORMs que suportam vários bancos de dados.

  3. **Curva de aprendizado:** o Prisma tem sua própria sintaxe e maneira de fazer as coisas, o que pode levar algum tempo para se acostumar.

## Design da Arquitetura ✍️

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


### Endpoints 🚏

| Endpoints | Métodos | Descrição | Autenticação
|---|---|---| ---|
| /user | POST | Cria um novo usuário | Não |
| /auth | POST | Autentica um usuário e gera um token de acesso| Não |
| /categories | GET | 	Retorna uma lista de categorias disponíveis| Sim |
| /categories | POST | Cria uma nova cateogira | Sim |
| /categories/:exerciseId/exercises | GET | Retorna exercícios de apenas uma categoria | Sim |
| /categories| PUT | Atualiza uma categoria específica | Sim |
| /categories| DELETE | Deleta uma categoria específica | Sim |
| /trainings| POST | Cria um novo treino| Sim |
| /trainings:userId| GET | Retorna uma lista de treinos disponíveis criados por um usuário| Sim |
| /trainings:id| GET | Retorna detalhes de um treino específico| Sim |
| /trainings:id| PUT | Atualiza um treino específico| Sim |
| /trainings:id| DELETE | Deleta um treino específico| Sim |


## Testes 🔎

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

## CI/CD 🤖

O repositório está configurando para executar os testes de forma automatizada **sempre que uma nova pull request for feita na branch develop e na branch main, ou um push na branch main**. 

O workflow pode ser conferido no diretório: [.github/worflows](.github/workflows/).

A parte do deploy ainda não foi feita, pois ainda estamos na fase de desenvolvimento.

## Considerações finais 👋

Decidi colocar em prática todos os meus conhecimentos adquiridos com meus estudos. Se você encontrou algum erro ou tem alguma ideia de melhoria, fique à vontade para dar sugestões. 

Obrigado! 😁