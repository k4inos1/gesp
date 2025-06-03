const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateJWT } = require('../middleware/auth.middleware');
const UserController = require('../controllers/user.controller');
const roleMiddleware = require('../middleware/role.middleware');

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener lista de usuarios
 *     security:
 *       - bearerAuth: []
 */
router.get('/', validateJWT, roleMiddleware(['admin']), UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', validateJWT, UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', [
  validateJWT,
  body('name').optional().trim().not().isEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['user', 'admin'])
], UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', validateJWT, roleMiddleware(['admin']), UserController.deleteUser);

module.exports = router;
