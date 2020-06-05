const express = require("express");
const server = express();

const db = require("./database/db.js");

// configurando pasta public
server.use(express.static("public"));

// habilitando uso do body
server.use(express.urlencoded({ extended: true }));

// template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// rotas
server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
      ) VALUES (?,?,?,?,?,?,?);
    `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      return res.send("Erro ao realizar cadastro");
    }

    console.log("Cadastrado com sucesso");
    console.log(this);
    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;

  if (search === "") {
    return res.render("search-results.html", { total: 0 });
  } else if (search.toLowerCase() === "todos") {
    db.all(`SELECT * FROM places `, function (err, rows) {
      if (err) {
        return console.log(err);
      }
      const total = rows.length;
      return res.render("search-results.html", { places: rows, total });
    });
  } else {
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
      err,
      rows
    ) {
      if (err) {
        return console.log(err);
      }
      const total = rows.length;
      return res.render("search-results.html", { places: rows, total });
    });
  }
});

server.listen(3000);
console.log("servidor iniciado na porta 3000");
