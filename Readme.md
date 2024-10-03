# TaskMaster - Gerenciador de Tarefas

## Descrição

O **TaskMaster** é um gerenciador de tarefas desenvolvido como parte de um desafio para a vaga na Operand. Este aplicativo permite aos usuários criar, visualizar, atualizar e excluir tarefas de forma simples e intuitiva. O projeto foi elaborado utilizando as melhores práticas de desenvolvimento, incluindo a separação de responsabilidades e a implementação de princípios SOLID.

## Arquitetura

A arquitetura do **TaskMaster** é baseada em uma estrutura de microserviços, que facilita a escalabilidade e a manutenção do código. O projeto é dividido em camadas, incluindo:

- **Camada de Apresentação**: Responsável pela interface do usuário, onde os usuários interagem com o sistema.
- **Camada de Serviço**: Contém a lógica de negócios, gerenciando a criação, leitura, atualização e exclusão de tarefas.
- **Camada de Repositório**: Interage com o banco de dados (Firestore) para persistir os dados das tarefas e usuários.
- **Camada de Middleware**: Implementa a autenticação e controle de acesso, garantindo a segurança das operações.

## Princípios SOLID

No desenvolvimento do **TaskMaster**, foram aplicados os princípios SOLID, que são:

1. **Single Responsibility Principle (SRP)**: Cada classe tem uma única responsabilidade. Por exemplo, a `TaskService` é responsável apenas pela lógica relacionada às tarefas, enquanto o `UserRepository` lida exclusivamente com a persistência de dados do usuário.

2. **Open/Closed Principle (OCP)**: O sistema é projetado para ser extensível sem modificar o código existente. Novas funcionalidades podem ser adicionadas através de novos serviços ou repositórios.

3. **Liskov Substitution Principle (LSP)**: As subclasses podem ser substituídas por suas classes base sem alterar o funcionamento do sistema. Isso é observado nas interfaces de serviços e repositórios.

4. **Interface Segregation Principle (ISP)**: As interfaces são específicas e focadas, evitando que as classes sejam forçadas a implementar métodos que não utilizam.

5. **Dependency Inversion Principle (DIP)**: As classes de alto nível não dependem de classes de baixo nível, mas de abstrações (interfaces). Isso permite uma maior flexibilidade e facilita a manutenção.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o backend.
- **Express**: Framework para construção de APIs RESTful.
- **Firestore**: Banco de dados NoSQL utilizado para persistência de dados.
- **InversifyJS**: Biblioteca para injeção de dependências, seguindo o padrão IoC (Inversion of Control).
- **Firebase Auth**: Serviço de autenticação para gerenciar usuários de forma segura.
- **Vue.js**: Framework JavaScript progressivo para a construção da interface do usuário.
- **Vite**: Ferramenta de build rápida para projetos frontend modernos.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em containers.
- **Docker Compose**: Ferramenta para definir e gerenciar multi-containers Docker.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

## Como Rodar o Projeto

### 1. Clonar o Repositório

Primeiro, clone o repositório do projeto para o seu ambiente local:

```bash
git clone https://github.com/RawdneyGoncalves/operand-technical-test
cd operand-technical-test
```


### obs: antes de tudo, vá no link do google drive e atribua as credenciais para o backend

## vá em backend/src/config e adicione esses dois arquivos que foram baixados do google drive: 
```bash
stellar-arcadia-332916-firebase-adminsdk-tz6kz-f3ec67a494.json
```
```bash
stellar-arcadia-332916-firebase-adminsdk-tz6kz-f3ec67a494.json:Zone.Identifier
```
## depois de adicionado esses dois arquivos, adicione a .env na raiz do backend, (eu disponibilizei minha env no google drive)

### Construir as imagens Docker:

```bash
docker-compose build
```

### Subir os containers:

```bash
docker-compose up
```

## Acessar o aplicativo:

### O frontend estará disponível em http://localhost:8080.

### O backend estará disponível em http://localhost:3000.


## Observações
### Dependências: As dependências são gerenciadas automaticamente pelo Docker, portanto não é necessário instalá-las manualmente.


### Parar os containers: Para parar os containers em execução, use:

```bash
docker-compose down
```