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
