const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Not authorized
 */
router.get('/stats', validateJWT, async (req, res) => {
  try {
    // Mock data - replace with real data from database
    const stats = {
      totalUsers: 150,
      activeUsers: 85,
      totalProjects: 45,
      activeProjects: 32
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard stats' });
  }
});

/**
 * @swagger
 * /api/dashboard/health:
 *   get:
 *     summary: Get system health status
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System health status retrieved successfully
 *       401:
 *         description: Not authorized
 */
router.get('/health', validateJWT, async (req, res) => {
  try {
    // Mock data - replace with real system metrics
    const health = {
      status: 'healthy', // 'healthy', 'warning', 'critical'
      cpu: 45,
      memory: 60,
      disk: 35,
      lastUpdate: new Date()
    };
    res.json(health);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving system health' });
  }
});

/**
 * @swagger
 * /api/dashboard/activity:
 *   get:
 *     summary: Get recent activity
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity retrieved successfully
 *       401:
 *         description: Not authorized
 */
router.get('/activity', validateJWT, async (req, res) => {
  try {
    // Mock data - replace with real activity from database
    const activity = [
      {
        id: '1',
        type: 'user',
        action: 'Nuevo usuario registrado',
        description: 'Juan Pérez se unió al sistema',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        type: 'project',
        action: 'Proyecto actualizado',
        description: 'Proyecto Alpha: nueva versión desplegada',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: '3',
        type: 'system',
        action: 'Mantenimiento programado',
        description: 'Actualización del sistema completada',
        timestamp: new Date(Date.now() - 10800000)
      }
    ];
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving recent activity' });
  }
});

module.exports = router;
