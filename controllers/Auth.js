const db = require ('../models/index');
const bycript = require ('bcrypt');

module.exports = {
  register: (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const salt = bycript.genSaltSync (10);
    const hash = bycript.hashSync (password, salt);


    if (!email || !password) {
      res.status (401).send ({error: 'You must provide username and password'});
    } else {
      // Create entry in Users table
      db.Users
        .create ({
          Email: req.body.email,
          Password: hash,
        })
        .then (res => {
          let newUser = res.dataValues;
          req.login (newUser, err => {
            // res.redirect ('/app');
          });
        })
        // .catch (err => sendError (err, res));
    }
  },

  // success: (req, res) => {
  //   db.Users
  //     .findOne ({where: {username: req.params.username}})
  //     .then (response => {
  //       res.statusCode = 200;
  //       res.send (response);
  //     })
  //     .catch (err => sendError (err, res));
  // },

  login: (req, res) => {
    console.log ('login function: ');
    console.log (req.body);
    // if (req.isAuthenticated) {
    //   console.log (req.body.username);
    //   db.Users
    //     .findOne ({where: {username: req.body.username}})
    //     .then (data => {
    //       //console.log(req.body.username);
    //       res.statusCode = 200;
    //       res.send (data.dataValues.username);
    //     })
    //     .catch (err => sendError (err, res));
    // } else {
    //   res.sendStatus (401);
    // }
  },

  logout: (req, res) => {
    console.log ('mi logout function: ');
    req.logout ();
    if (process.env.NODE_ENV === 'production') {
      res.redirect ('/');
    } else {
      res.redirect ('http://localhost:3000');
    }
  },

  // user: (req, res) => {
  //   if (req.user) {
  //     res.statusCode = 200;
  //     res.send (req.user.username);
  //   } else {
  //     res.statusCode = 401;
  //     res.send ();
  //   }
  // },
  /////////////// End Auth ///////////////////////
};
