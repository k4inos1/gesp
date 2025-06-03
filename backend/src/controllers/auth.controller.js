const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');

class AuthController {
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Verificar si el usuario ya existe
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          status: 'error',
          message: 'El usuario ya existe'
        });
      }

      // Crear nuevo usuario
      user = new User({
        email,
        password,
        name,
        role: 'user'
      });

      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Crear token
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({
            status: 'success',
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: 'error',
          message: 'Credenciales inválidas'
        });
      }

      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 'error',
          message: 'Credenciales inválidas'
        });
      }

      // Crear token
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({
            status: 'success',
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json({
        status: 'success',
        user
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }
}

module.exports = AuthController;
