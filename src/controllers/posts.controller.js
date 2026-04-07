const repo = require("../repositories/posts.repo");

async function createPost(req, res, next) {
  try {
    const { content, visibility } = req.body;
    // validações básicas
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'content' é obrigatório" });
    }

    // o middleware authRequired deve ter populado req.user
    console.log("User from token:", req.user); // Debug: verificar se o usuário está presente no token
    console.log("user id: ", req.user.id);
    
    const userId = req.user && req.user.id;
    console.log("User ID from token:", userId); // Debug: verificar se o ID do usuário está presente
    if (!userId) return res.status(401).json({ message: "Token ausente ou inválido" });

    // cria o post via repositório (pode retornar id)
    const result = await repo.createPost(content.trim(), userId, visibility);

    // se o repositório retornar o id como resultado, devolvemos 201
    return res.status(201).json({ id: result, message: "Post criado" });
  } catch (e) {
    next(e);
  }
}

async function listPosts(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10)); // max 100
    const offset = (page - 1) * limit;

    const [items, total] = await Promise.all([
      repo.getPosts({ limit, offset }),
      repo.countPosts()
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return res.json({ items, page, limit, total, totalPages });
  } catch (e) {
    next(e);
  }
}

async function getPostById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const post = await repo.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    return res.json(post);
  } catch (e) {
    next(e);
  }
}

async function updatePostById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Verificar se o post existe
    const existing = await repo.getPostById(id);
    if (!existing) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    // Verificar se o usuário é o autor do post
    if (existing.user_id !== req.user.id) {
      console.log("Authorization failed: post existing:", existing);
      console.log("Authorization failed: req.user:", req.user);
      // possível mismatch no nome do campo (users_id / user_id) ou tipos (string vs number)
      return res.status(403).json({ message: "Acesso negado" });
    }

    const { content, visibility } = req.body;
    if (!content && typeof visibility === 'undefined') {
      return res.status(400).json({ message: 'Verifique os campos enviados' });
    }

    // sanitize content
    const newContent = content ? String(content).trim() : null;

    const ok = await repo.updatePostById(id, req.user.id, newContent);
    if (!ok) return res.status(500).json({ message: 'Falha ao atualizar post' });

    const updated = await repo.getPostById(id);
    return res.json(updated);
  } catch (e) {
    next(e);
  }
}

async function deletePostById (req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const existing = await repo.getPostById(id);
    if (!existing) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    if (existing.user_id !== req.user.id) {
      console.log("Authorization failed (delete): post existing:", existing);
      console.log("Authorization failed (delete): req.user:", req.user);
      return res.status(403).json({ message: "Acesso negado" });
    }
  
  const ok = await repo.deletePostById(id, req.user.id);
  if (!ok) return res.status(500).json({ message: 'Falha ao excluir post' });

  // Retornar mensagem clara de sucesso em vez de `null` (o post foi removido)
  return res.status(200).json({ id, message: 'Post deletado com sucesso' });
  } catch (e) {
    next(e);
  }
}

async function createComment (req, res, next) {
  try {
    // Verifica se o ID do post é válido
    const postId = Number(req.params.id);
    if (!Number.isInteger(postId) || postId <= 0) {
      return res.status(400).json({ message: "ID do post inválido" });
    }
    
    // Verificar se o post existe
    const existing = await repo.getPostById(postId);
    if (!existing) {
      return res.status(404).json({ message: "Post não encontrado" });
    }
    
    // validar conteúdo do comentário
    const { content } = req.body;
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'content' é obrigatório para o comentário" });
    }

    // usuario autenticado
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Token ausente ou inválido" });

    // criar comentário via repositório
    const result = await repo.createComment(postId, userId, content.trim());

    // responder com 201 Created
    return res.status(201).json({ id: result, message: 'Comentário criado' });
  } catch (e) {
    next(e);
  }
}

async function getAllComments(req, res, next) {
  try {
    const postId = Number(req.params.id);
    if (!Number.isInteger(postId) || postId <= 0) {
      return res.status(400).json({ message: "ID do post inválido" });
    }

    const comments = await repo.getAllComments(postId);
    return res.json(comments);
  } catch (e) {
    next(e);
  }
}

async function deleteCommentById(req, res, next) {
  try {
    const commentId = Number(req.params.id);
    if (!Number.isInteger(commentId) || commentId <= 0) {
      return res.status(400).json({ message: "ID do comentário inválido" });
    }

    const ok = await repo.deleteCommentById(commentId, req.user.id);
    if (!ok) return res.status(404).json({ message: 'Comentário não encontrado ou acesso negado' });

    return res.status(200).json({ id: commentId, message: 'Comentário deletado com sucesso' });
  } catch (e) {
    next(e);
  }
}

async function likePost(req, res, next) {
  try {
    const postId = Number(req.params.id);
    if (!Number.isInteger(postId) || postId <= 0) {
      return res.status(400).json({ message: "ID do post inválido" });
    }

    const userId = req.user.id;
    const ok = await repo.likePost(postId, userId);
    if (!ok) return res.status(404).json({ message: 'Post não encontrado ou erro ao curtir' });

    return res.status(200).json({ id: postId, message: 'Post curtido com sucesso' });
  } catch (e) {
    next(e);
  }
}

async function unlikePost(req, res, next) {
  try {
    const postId = Number(req.params.id);
    if (!Number.isInteger(postId) || postId <= 0) {
      return res.status(400).json({ message: "ID do post inválido" });
    }

    const userId = req.user.id;
    const ok = await repo.unlikePost(postId, userId);
    if (!ok) return res.status(404).json({ message: 'Post não encontrado ou erro ao remover curtida' });

    return res.status(200).json({ id: postId, message: 'Curtida removida com sucesso' });
  } catch (e) {
    next(e);
  }
}

module.exports = { createPost, listPosts, getPostById, updatePostById, deletePostById, createComment, getAllComments, deleteCommentById, likePost, unlikePost };