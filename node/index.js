const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.APP_PORT || 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

app.get("/", (req, res) => {
  const name = "Marcio " + new Date().toISOString();

  connection.query(`INSERT INTO people (name) VALUES ('${name}')`);

  connection.query(`SELECT name FROM people`, (error, results, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${
          !!results?.length
            ? results.map((el) => `<li>${el.nome}</li>`).join("")
            : ""
        }
      </ol>
    `);
  });
});

app.listen(port, () => {
  console.log("Server rodando na porta: ", port);
});
