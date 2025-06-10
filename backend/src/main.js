const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "your-secret-key"; // En producción, usar variables de entorno

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas de autenticación
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // En un caso real, verificaríamos las credenciales contra una base de datos
  // Este es solo un ejemplo simplificado
  if (email === "usuario@ejemplo.com" && password === "password123") {
    // Generar token JWT
    const token = jwt.sign(
      {
        sub: "1",
        email,
        roles: ["user"],
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      access_token: token,
      user: {
        id: 1,
        email: email,
        name: "Usuario Ejemplo",
      },
    });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

// Middleware para proteger rutas
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Ruta protegida de ejemplo
app.get("/api/user/profile", authenticateJwt, (req, res) => {
  res.json({
    id: 1,
    email: req.user.email,
    name: "Usuario Ejemplo",
    roles: req.user.roles,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});
