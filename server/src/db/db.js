
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'app.sqlite');

let db;

function initDb() {
  if (!db) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });

    db = new Database(dbPath);

    db.pragma('foreign_keys = ON');

    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );

    db.exec(schema);
  }

  return db;
}

function getDb() {
  if (!db) return initDb();
  return db;
}

module.exports = { initDb, getDb };

