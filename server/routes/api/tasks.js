import express from 'express';

import auth from '../../middleware/auth';
// import User from '../../models/User';
import Task from '../../models/Task';

const router = express.Router();

// @route   GET api/tasks/test
// @desc    Tests tasks route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Tasks Endpoint' }));

// @route   GET api/tasks/user
// @desc    Get the current users tasks
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ user: req.user.id }).populate('user', [
      'name'
    ]);

    if (!task) {
      return res.status(400).json({ message: 'No tasks for this user' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
