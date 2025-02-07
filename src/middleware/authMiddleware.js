module.exports = (req, res, next) => {
    req.userId = 1; // Defina um ID de usuário fixo para testes
    next();
};