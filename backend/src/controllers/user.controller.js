const { validationResult } = require('express-validator');
const User = require('../models/user.model');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      res.json({
        status: 'success',
        data: users
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado'
        });
      }
      res.json({
        status: 'success',
        data: user
      });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado'
        });
      }
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, role } = req.body;

      // Construir objeto de usuario
      const userFields = {};
      if (name) userFields.name = name;
      if (email) userFields.email = email;
      if (role && req.user.role === 'admin') userFields.role = role;

      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado'
        });
      }

      // Verificar permisos
      if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
        return res.status(403).json({
          status: 'error',
          message: 'No tienes permiso para realizar esta acción'
        });
      }

      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: userFields },
        { new: true }
      ).select('-password');

      res.json({
        status: 'success',
        data: user
      });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado'
        });
      }
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado'
        });
      }

      await user.remove();

      res.json({
        status: 'success',
        message: 'Usuario eliminado'
      });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado'
        });
      }
      res.status(500).json({
        status: 'error',
        message: 'Error en el servidor'
      });
    }
  }
}

module.exports = UserController;
