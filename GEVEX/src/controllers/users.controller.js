const repo = require("../repositories/users.repo");
const { hashPassword } = require("../utils/password");

async function me(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Precisa ser um número inteiro" });
    }

    if (id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const user = await repo.findById(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function updateById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Precisa ser um número inteiro" });
    }

    if (id !== Number(req.user.id)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const { name, email, password, bio } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({ message: "Verifique os campos enviados" });
    }

    if (email) {
      const existing = await repo.findByEmail(email);
      if (existing && existing.id !== id) {
        return res.status(409).json({ message: "Erro: E-mail já cadastrado" });
      }
    }

    // Hash da senha, se for enviada. Evitamos redeclarar `password`.
    let passwordHash = null;
    if (password) {
      passwordHash = await hashPassword(password);
    }

    await repo.updateUser(id, { name, email, bio, password: passwordHash });
    const updated = await repo.findById(id);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

async function createUser(req, res, next) {
  try {
  const { name, email, password, bio } = req.body;

    const existing = await repo.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Erro: E-mail já cadastrado" });
    }

  const passwordHash = await hashPassword(password);

  // createUser espera (name, email, bio, password)
  const user = await repo.createUser(name, email, bio, passwordHash);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = { me, updateById, createUser };