import express from 'express';

const router = express.Router();

// @route   GET api/tasks/test
// @desc    Tests tasks route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Tasks Endpoint' }));

export default router;
