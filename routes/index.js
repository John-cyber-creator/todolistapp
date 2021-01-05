const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Task = require('../models/task');
const app = express();
// Welcome Page
router.get('/',ensureAuthenticated , async (req, res) => {
  const tasks = await Task.find().sort({createdAt: 'asc'})
  res.render('index', {tasks: tasks, user: req.user, userId: req.user._id})
});



module.exports = router;