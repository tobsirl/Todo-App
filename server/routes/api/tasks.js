import express from 'express';

const router = express.Router();

// @route   GET api/tasks/test
// @desc    Tests tasks route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Tasks Endpoint' }));

export default router;
