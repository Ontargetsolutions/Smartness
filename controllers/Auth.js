const db = require ('../models/index');
const bycript = require ('bcrypt');


const sendError = (err, res) => {
  if (err) {
    res.statusCode = 500;
    console.log(`error que se va a mandar ${err}`)
    res.send (err);
  }
};

module.exports = {
  register: (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const salt = bycript.genSaltSync (10);
    const hash = bycript.hashSync (password, salt);

    db.Users
      .findOne ({
        where: {Email: req.body.email},
      })
      .then (function (user) {
        if (user) {
          // res.sendError ('The email is already in use', res);
          console.log(`dentro de donde chequea el email user: ${JSON.stringify(user)}`)
          res.send({ message: "This email is already in use" });
        } else {
          db.Users
            .create ({
              Name: req.body.name,
              Email: req.body.email,
              Password: hash,
              Active: true,
              Telephone: req.body.telephone,
            })
            .then (response => {
              let newUser = response.dataValues;
              res.send(newUser);
            })
            // .catch (err => res.se);
        }
      });
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
      db.Users
        .findOne ({where: {email: req.body.username}})
        .then (data => {
          console.log(data);
          if(null){
            res.send({ message: "There is not user with those credentials" });
          }else{
            res.statusCode = 200;
            res.send (data.dataValues.email);
          }
        })
        .catch (err => sendError (err, res));
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
