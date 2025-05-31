// src/routes/oauthAuthRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../entities/User');
const jwt = require('jsonwebtoken'); // Para gerar seu próprio token JWT

router.post('/oauth-login', async (req, res) => {
    const { email, name, providerId, provider } = req.body;

    try {
        let user;

        // Tenta encontrar o usuário pelo ID do provedor
        if (provider === 'google') {
            user = await User.findOne({ where: { googleId: providerId } });
        } else if (provider === 'github') {
            user = await User.findOne({ where: { githubId: providerId } });
        }

        if (!user) {
            // Se não encontrou pelo ID do provedor, tenta pelo email
            user = await User.findOne({ where: { email: email } });

            if (user) {
                // Se encontrou pelo email, mas sem o ID do provedor (usuário existente logando pela primeira vez com OAuth)
                // Atualiza o usuário existente para vincular o ID do provedor
                if (provider === 'google' && !user.googleId) {
                    user.googleId = providerId;
                } else if (provider === 'github' && !user.githubId) {
                    user.githubId = providerId;
                }
                await user.save();
            } else {
                // Se não encontrou de jeito nenhum, cria um novo usuário
                const newUser = {
                    username: name || email.split('@')[0], // Use o nome ou parte do email
                    email: email,
                    password: null, // Sem senha para OAuth
                };
                if (provider === 'google') {
                    newUser.googleId = providerId;
                } else if (provider === 'github') {
                    newUser.githubId = providerId;
                }
                user = await User.create(newUser);
            }
        }

        // Gerar um token JWT personalizado para sua API
        const apiToken = jwt.sign(
            { id: user.id, email: user.email, provider: provider },
            process.env.JWT_SECRET, // Uma variável de ambiente com uma chave secreta
            { expiresIn: '7d' } // Expira em 7 dias
        );

        res.json({
            message: 'Login OAuth bem-sucedido',
            user: { id: user.id, username: user.username, email: user.email },
            token: apiToken, // Retorna o token da sua API
        });

    } catch (error) {
        console.error('Erro no login OAuth do backend:', error);
        res.status(500).json({ error: 'Erro no servidor ao processar login OAuth.' });
    }
});

module.exports = router;