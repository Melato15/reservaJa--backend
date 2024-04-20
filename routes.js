const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const { verifyToken } = require('./middlewares/authMiddleware');

router.post("/login", authController.login);

router.get("protected-route", verifyToken, (req, res) => {
  res.json({ message: "Rota protegida acessada com sucesso.", userName: req.userName });
});

module.exports = router;