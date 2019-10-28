const db = require ('../models/index');
const bycript = require ('bcryptjs');

module.exports = {
  register: (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const salt = bycript.genSaltSync (10);
    const hash = bycript.hashSync (password, salt);

    if (!username || !password) {
      res.status (401).send ({error: 'You must provide username and password'});
    } else {
      // Create entry in Users table
      db.Users
        .create ({
          username: username,
          password: hash,
        })
        .then (res => {
          let newUser = res.dataValues;
          req.login (newUser, err => {
            res.redirect ('/app');
          });
        })
        .catch (err => sendError (err, res));
    }
  },

  success: (req, res) => {
    db.Users
      .findOne ({where: {username: req.params.username}})
      .then (response => {
        res.statusCode = 200;
        res.send (response);
      })
      .catch (err => sendError (err, res));
  },

  login: (req, res) => {
    console.log (req.body);
    if (req.isAuthenticated) {
      console.log (req.body.username);
      db.Users
        .findOne ({where: {username: req.body.username}})
        .then (data => {
          //console.log(req.body.username);
          res.statusCode = 200;
          res.send (data.dataValues.username);
        })
        .catch (err => sendError (err, res));
    } else {
      res.sendStatus (401);
    }
  },

  logout: (req, res) => {
    req.logout ();
    if (process.env.NODE_ENV === 'production') {
      res.redirect ('/');
    } else {
      res.redirect ('http://localhost:3000');
    }
  },

  user: (req, res) => {
    if (req.user) {
      res.statusCode = 200;
      res.send (req.user.username);
    } else {
      res.statusCode = 401;
      res.send ();
    }
  },
  /////////////// End Auth ///////////////////////
};
