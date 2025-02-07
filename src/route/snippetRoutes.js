const express = require('express');
const Snippet = require('../entities/Snippet');
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
        const snippets = await Snippet.findAll({
            where: {
                userId: req.userId
            }
        });
        res.json(snippets);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;