const repo = require("../repositories/user.repo");

async function me(req, res, next) {
    try {
        const user = await repo.findById(req.user.id);
        res.json(user);
    } catch (e) { next(e); }
}

async function me(req, res, next) {
    try {
        const id = req.params.id;
        if (!Number.isInteger(id) || id <= 0)return res.status(400).json({ message: "Precisa ser um número inteiro" });
        if (id !== req.user.id)return res.status(403).json({ message: "Acesso negado" });
        const { name, email, password } = req.body
        if (!name && !email && !password)return res.status(400).json({ message: "Verifique os campos enviados" });
        if (email) { const existing = await userRepo.findByEmail(email)} if (existing && existing.id !== id) return res.status(409).json({ message: "Erro: E-mail já cadastrado" });
        let password_hash
        if (password) password_hash = await  bcrypt.hash(password, 10);
        await userRepo.updateUser(id, { name, email, password_hash });
        const update = await userRepo.findById(id);
        res.json(update);
    } catch  (e) { next(e); }
}

module.exports = { me };