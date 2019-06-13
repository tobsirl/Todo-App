import express from 'express';

import auth from '../../middleware/auth';
import Task from '../../models/Task';
import User from '../../models/User';

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

// @route   POST api/tasks/new
// @desc    Create a user task
// @access  Private
router.post('/new', auth, async (req, res) => {
  const { title, content, completed } = req.body;

  const taskObj = {};
  taskObj.user = req.user.id;
  if (title) taskObj.title = title;
  if (content) taskObj.content = content;
  if (completed) taskObj.completed = completed;

  try {
    // create a new task
    let task = new Task(taskObj);
    // save to the database
    await task.save();
    // return json
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks/update/:id
// @desc    Update a user task
// @access  Private
router.put('/update/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id).exec();
    task.set(req.body);
    let result = await task.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const tasks = await Task.find().populate('users', ['name']);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/user/:user_id
// @desc    Get tasks by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const task = await Task.findOne({ user: req.params.user_id }).populate(
      'users',
      ['name']
    );

    if (!task)
      return res.status(400).json({ message: 'No tasks for this user' });
    res.json(task);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'No tasks for this user' });
    }
    console.error(err.message);
  }
});

// @route   DELETE api/tasks
// @desc    Delete tasks and user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove tasks
    await Task.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
