
// Modules for Express server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//require authentication packages
const passport = require('passport');
const session = require('express-session');

// Require Sequelize
const db = require('./models');

// Init Express app
const app = express();

// Import routes
// const routes = require('./routes/apiRoutes');

// Set Listening Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));
//this should be below the static file middleware
app.use(
  session({
    secret: 'keyboard cat', //this should be a random string
    resave: false,
    saveUninitialized: false
    //cookie: { secure: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Call routes
// routes(app);

// If the application is running in the production environment,
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Route all requests to the react application
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
else {
  app.get('/', (req, res) => res.redirect('http://localhost:3000'));
}

// Setup app listener and database connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  db.sequelize
    .sync()
    .then(() => {
      db.sequelize
        .authenticate()
        .then(() => {
          console.log('Connection to database has been established successfully.');
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
});

if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}