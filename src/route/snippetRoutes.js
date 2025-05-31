const express = require('express');
const Snippet = require('../entities/Snippet');
const swaggerAutogen = require('swagger-autogen');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação


router.use(authMiddleware); // Aplicar o middleware de autenticação a todas as rotas deste arquivo

// criar um snippet
router.post('/snippets', async (req, res) => {
    const { title, code, language, tags } = req.body;
    const userId = req.user.id; // Relacionar o snippet ao usuário autenticado
    try {
        const snippet = await Snippet.create({
            title,
            code,
            language,
            tags,
            userId,
        });
        res.status(201).json(snippet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// listar todos os snippets
router.get('/snippets', async (req, res) => {
    const userId = req.user.id; // Listar snippets apenas do usuário autenticado
    try {
        const snippets = await Snippet.findAll({
            where: { userId }, // Filtrar snippets pelo ID do usuário autenticado
            order: [['createdAt', 'DESC']] // Ordenar por data de criação, do mais recente para o mais antigo
        });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/snippets/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Verificar se o snippet pertence ao usuário autenticado
    try {
        const snippet = await Snippet.findOne({
            where: { id, userId }
        });

        if (!snippet) {
            return res.status(404).json({ error: 'Snippet não encontrado.' });
        }
        res.json(snippet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/snippets/:id', async (req, res) => {
    const { id } = req.params;
    const { title, code, language, tags } = req.body;
    const userId = req.user.id; // Verificar se o snippet pertence ao usuário autenticado
    try {
        const snippet = await Snippet.findOne({
            where: { id, userId }
        });
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet não encontrado.' });
        }

        const updatedSnippet = await snippet.update({
            title,
            code,
            language,
            tags
        });

        res.json(updatedSnippet);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/snippets/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Verificar se o snippet pertence ao usuário autenticado
    try {
        const snippet = await Snippet.findOne({
             where: { id, userId } 
            });
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet não encontrado.' });
        }

        await snippet.destroy();
        res.json({ message: 'Snippet excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// router.get('/tags/:tag', async (req, res) => {
//     const { tag } = req.params;

//     try {
//         const snippets = await Snippet.findAll({
//             where: {
//                 tags: {
//                     [Op.contains]: [tag]
//                 }
//             }
//         });

//         res.json(snippets);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });



module.exports = router;

