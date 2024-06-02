const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "reserva_ja",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
