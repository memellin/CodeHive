const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../entities/User'); // Importe o modelo de usuário
const router = express.Router();

// Rota de registro de usuário
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

// Rota de login de usuário
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

        res.json({ user: { id: user.id, username: user.username, email: user.email } });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;