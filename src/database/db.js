const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
  /* db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

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
    "https://images.unsplash.com/photo-1570564029550-9ef9d2c55057?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=890&q=80",
    "Eletro-Recicla",
    "José Souza, Centro",
    "Nº 720",
    "Mato Grosso do Sul",
    "Dourados",
    "Eletrônicos",
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Cadastrado com sucesso");
    console.log(this);
  }

  // db.run(query, values, afterInsertData);

  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Registros");
    console.log(rows);
  }); */
  /* db.run(`DELETE FROM places WHERE id = ?`, [4], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Deletado");
  }); */
});

module.exports = db;
