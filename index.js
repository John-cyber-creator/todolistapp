const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const Task = require('./models/task');
const app = express();
let PORT = process.env.PORT || 4000;



// Passport Config
require('./config/passport')(passport);

//DB Config
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true } , () => console.log('DB Connected...'))

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use(express.urlencoded ({ extended: false }));
app.use(methodOverride('_method'));
app.use("/images",express.static(__dirname + "/images"));

// Task App
app.post('/', async (req,res) => {
  let task = new Task({
      taskName: req.body.taskName,
      creator: req.user._id
  })
  try{
      await task.save()
      res.redirect('/')
  }
  catch(e){
      console.log(e)
  }
});

// Delete Tasks
app.delete('/:id', async (req,res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.redirect('/')
});

app.listen(PORT, console.log(`Server running on  ${PORT}`));