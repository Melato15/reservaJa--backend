const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const { email, password } = res.body;

  try {
    const user = await User.authenticate(email, password);
    if(!user) {
      return res.status(401).json({ message: "Credenciais inválidas."})
    }
    const token = jwt.sign({ userName: user.name }, "123321", { expiresIn: "1h" })

    res.json({ token, user });
  } catch(err) {
    console.error("Erro durante a autenticação.", err);
    res.status(500).json({ message: "Erro durante a autenticação." });  
  }
};