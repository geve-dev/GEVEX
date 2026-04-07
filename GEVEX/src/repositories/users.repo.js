const db = require("../config/db");

async function findByEmail(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const row = rows[0];
  if (!row) return null;
  // normalize possible column names from different DB states
  // some DBs may have `password` or `password_hash` column
  if (!row.password && row.password_hash) row.password = row.password_hash;
  // normalize id column (some schemas use `idusers`)
  if (!row.id && row.idusers) row.id = row.idusers;
  return row;
}

async function createUser(name, email, bio, password) {
  const [result] = await db.query(
     "SELECT sf_user_create(?, ?, ?, ?) AS resultado",
    [name, email, bio, password]
  );
  return result[0].resultado;
}

async function findById(id) {
  const [rows] = await db.query("SELECT idusers, name, email FROM users WHERE idusers = ?", [id]);
  return rows[0];
}

async function updateUser(id, { name, email, bio, password }) {
  const [rows] = await db.query(
  "SELECT sf_user_update(?, ?, ?, ?, ?) AS status",
  [id, name ?? null, email ?? null, bio ?? null, password ?? null]
);
const status = rows?.[0]?.status;

if (status === 1) return true;
if (status === 0) return false; // nada a atualizar
if (status === -404) throw new Error("Usuário não encontrado");
if (status === -409) throw new Error("E-mail já está em uso");
throw new Error(`Falha ao atualizar usuário (código ${status})`);
}

module.exports = { findByEmail, createUser, findById, updateUser };