const db = require("../config/db");

async function createPost(content, users_id, visibility) {
  const [result] = await db.query(
    "SELECT sf_posts_create(?, ?, ?) AS resultado",
    [content, users_id, visibility]
  );
  // dependendo do retorno, adaptar:
  // result[0].resultado pode existir ou não; aqui deixamos como estava
  return result[0].resultado;
}

async function getPosts({ limit = 10, offset = 0 }) {
  const sql = `SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  // mysql2/promise: db.query returns [rows, fields]
  const [rows] = await db.query(sql, [Number(limit), Number(offset)]);
  return rows;
}

async function countPosts() {
  const sql = `SELECT COUNT(*) as count FROM posts`;
  const [rows] = await db.query(sql);
  // rows[0].count contém o número
  return rows[0] ? Number(rows[0].count) : 0;
}

async function getPostById(id) {
  const sql = `SELECT * FROM posts WHERE idposts = ?`;
  const [rows] = await db.query(sql, [Number(id)]);
  return rows[0] || null;
}
async function updatePostById(postId, userId, content) {
  const [result] = await db.query(
    "SELECT sf_posts_update(?, ?, ?) AS resultado",
    [postId, userId, content]
  );

  // A procedure criada no banco retorna 0 como código de sucesso
  // (ver imagem/anotações do banco). Aqui normalizamos para um booleano:
  // - se resultado for 0 => sucesso (true)
  // - se resultado for um número > 0 ou uma string não-vazia => consideramos truthy
  // - caso não haja resultado, retornamos false
  const raw = result && result[0] ? result[0].resultado : null;
  if (raw === null || typeof raw === 'undefined') return false;
  if (typeof raw === 'number') return raw === 0 ? true : Boolean(raw);
  return Boolean(raw);
}

async function deletePostById(postId, userId) {
  const [result] = await db.query(
    "SELECT sf_posts_delete(?, ?) AS resultado",
    [postId, userId]
  );

  // A procedure criada no banco retorna 0 como código de sucesso
  // (ver imagem/anotações do banco). Aqui normalizamos para um booleano:
  // - se resultado for 0 => sucesso (true)
  // - se resultado for um número > 0 ou uma string não-vazia => consideramos truthy
  // - caso não haja resultado, retornamos false
  const raw = result && result[0] ? result[0].resultado : null;
  if (raw === null || typeof raw === 'undefined') return false;
  if (typeof raw === 'number') return raw === 0 ? true : Boolean(raw);
  return Boolean(raw);
}

async function createComment(posts_id, users_id, content) {
  const [result] = await db.query(
    "SELECT sf_comments_create(?, ?, ?) AS resultado",
    [posts_id, users_id, content]
  );
  return result[0].resultado;
}

async function getAllComments({ limit = 10, offset = 0 }) {
  const sql = `SELECT * FROM comments ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  // mysql2/promise: db.query returns [rows, fields]
  const [rows] = await db.query(sql, [Number(limit), Number(offset)]);
  return rows;
}

async function deleteCommentById(commentId, userId) {
  const [result] = await db.query(
    "SELECT sf_comments_delete(?, ?) AS resultado",
    [commentId, userId]
  );

  const raw = result && result[0] ? result[0].resultado : null;
  if (raw === null || typeof raw === 'undefined') return false;
  if (typeof raw === 'number') return raw === 0 ? true : Boolean(raw);
  return Boolean(raw);
}

async function likePost(postId, userId) {
  const [result] = await db.query(
    "SELECT sf_likes_create(?, ?) AS resultado",
    [postId, userId]
  );

  const raw = result && result[0] ? result[0].resultado : null;
  if (raw === null || typeof raw === 'undefined') return false;
  if (typeof raw === 'number') return raw === 0 ? true : Boolean(raw);
  return Boolean(raw);
}

async function unlikePost(postId, userId) {
  const [result] = await db.query(
    "SELECT sf_likes_delete(?, ?) AS resultado",
    [postId, userId]
  );

  const raw = result && result[0] ? result[0].resultado : null;
  if (raw === null || typeof raw === 'undefined') return false;
  if (typeof raw === 'number') return raw === 0 ? true : Boolean(raw);
  return Boolean(raw);
}

module.exports = { createPost, getPosts, countPosts, getPostById, updatePostById, deletePostById, createComment, getAllComments, deleteCommentById, likePost, unlikePost };