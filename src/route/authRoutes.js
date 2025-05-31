// src/routes/authRoute.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../entities/User'); // Importe o modelo de usuário
const router = express.Router();

// --- Rota de registro de usuário ---
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe.' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Retornar resposta de sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Rota de login de usuário (tradicional) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        // Gerar um token JWT para sua API (se você ainda usa para logins tradicionais)
        const apiToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ user: { id: user.id, username: user.username, email: user.email }, token: apiToken });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Rota para Login OAuth (Google/GitHub) ---
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
                    await user.save();
                } else if (provider === 'github' && !user.githubId) {
                    user.githubId = providerId;
                    await user.save();
                }
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
            process.env.JWT_SECRET,
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