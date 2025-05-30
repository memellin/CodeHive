const express = require('express');
const Snippet = require('../entities/Snippet');
const swaggerAutogen = require('swagger-autogen');
const router = express.Router();

// verificar se o usuário está autenticado

// criar um snippet
router.post('/', async (req, res) => {
    const {title, code, language, tags} = req.body;
    const userId = 1;
    try{
        const snippet = await Snippet.create({
            title,
            code,
            language,
            tags,
            userId,
        });
        res.status(201).json(snippet);
    }catch(err){	
        res.status(500).json({message: err.message});
    }
});

// listar todos os snippets
router.get('/', async (req, res) => {
    try{
        const snippets = await Snippet.findAll();
        res.json(snippets);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const snippet = await Snippet.findByPk(id);
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet não encontrado.' });
        }
        res.json(snippet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, code, language, tags, userId } = req.body;

    try {
        const snippet = await Snippet.findByPk(id);
        if (!snippet) {
            return res.status(404).json({ error: 'Snippet não encontrado.' });
        }

        const updatedSnippet = await snippet.update({
            title,
            code,
            language,
            tags,
            userId
        });

        res.json(updatedSnippet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const snippet = await Snippet.findByPk(id);
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

