# ReservaJá

Esse projeto esta sendo desenvolvido por Lucas Martins Venero e Gustavo Chaves.

## Instruções de Instalação

Siga os passos abaixo para clonar o repositório, instalar as dependências e executar o projeto localmente.

### 1. Clonar o Repositório

Primeiro, clone o repositório do GitHub para o seu ambiente local. Abra o terminal e execute o seguinte comando:

```bash
https://github.com/Melato15/reservaja-backend.git
```

### 2. Instalar Dependências

Depois de clonar o repositório, navegue até a pasta do projeto e instale as dependências utilizando o Yarn ou NPM.

### Usando Yarn
```bash
yarn
```

### Usando NPM

```bash
npm install
```

### 3. Crie o banco de dados

Crie o bancos de dados com mysql no usuário root:

```bash
mysql -u root -p
CREATE DATABASE reserva_ja;
```

### 4. Executar Migrações

Rode as migrações para criar as tabelas necessárias no banco de dados.

```bash
npx sequelize-cli db:migrate
```

### 5. Executar o Projeto

Para compilar e executar o projeto:

```bash
node app.js
```

### Acessar o Projeto
Depois de executar o comando node app.js, abra o postman e acesse:

```bash
http://localhost:3000/
```

### Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato pelo email: gustavojchaves1@gmail.com





