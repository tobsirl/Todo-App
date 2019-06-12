import express from 'express';

const router = express.Router();

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth Endpoint' }));

export default router;
