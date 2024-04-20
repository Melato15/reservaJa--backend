const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    return res.status(401).json({ message: "Token não fornecido." })
  }

  jwt.verify(token, "123321", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." })
    }
  
  req.userId = decoded.userId;
  next()
  })
}