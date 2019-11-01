const passport = require ('passport');
const controller = require ('../controllers/index');
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require ('passport-local').Strategy;
var db = require ('../models');
const bycript = require ('bcrypt');

module.exports = app => {
  ////////////////////////// Auth ///////////////////////////////////////

  passport.use (
    new LocalStrategy ((username, password, done) => {
      // Retrieve a User object from the database using Sequelize
      // by username
      //where: { username: username }
      console.log (
        `username en local strategy: ${username}, password ${password}`
      );
      db.Users.findOne ({where: {email: username}}).then (res => {
        //console.log(res);
        // res is the response from Sequelize in the promise
        // If there's no response, give error message
        console.log (
          `resultado de la busqueda del usuario ${JSON.stringify (res)}`
        );
        if (!res) {
          console.log (`entro a no res`);
          return done (null, false, {message: 'Incorrect email'});
        }

        // Content (User object) is in res.dataValues
        console.log (`res.datavalues ${JSON.stringify (res.dataValues)}`);
        let user = res.dataValues;
        console.log (
          `user before bycript compare ${JSON.stringify (res.dataValues)}`
        );
        // Password in the user.password field is already hashed. Store in variable hash
        let hash = user.Password;
        console.log (`hash coming from user ${hash}`);
        // Compare the password (using the hash in session)
        bycript.compare (password, hash, (err, res) => {
          // res is the results of the comparison (true or false)
          if (err) return done (err);
          if (res) {
            console.log (`user after bycript compare ${user}`);

            username = user.Email;
            return done (null, user);
          } else {
            return done (null, false, {message: 'Incorrect password'});
          }
        });
      });
    })
  );

  passport.use (
    new GoogleStrategy (
      {
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // console.log(profile);
        //send the new user to DB from google, cheking if exits first
        db.User
          .findOne ({
            where: {
              googleid: profile.id,
            },
          })
          .then (function (currentUser) {
            if (currentUser) {
              done (null, currentUser);
            } else {
              //checking if it is in the DB without googleid
              db.User
                .findOne ({
                  where: {
                    email: profile.emails[0].value,
                  },
                })
                .then (function (currentUser) {
                  if (currentUser) {
                    //aperecio por el correo, le agrego el googleid

                    db.User
                      .update (
                        {
                          googleid: profile.id,
                        },
                        {
                          where: {
                            id: currentUser.id,
                          },
                        }
                      )
                      .then (function (quant) {
                        done (null, currentUser);
                      });
                  } else {
                    // db.User.create({
                    //   name: profile.displayName,
                    //   email: profile.emails[0].value,
                    //   googleid: profile.id
                    // }).then(function(newUser) {
                    //   // console.log("el nuevo user " + newUser.id); //hacer logging
                    //   done(null, newUser);
                    // });
                    return done (null, false);
                  }
                });
            }
          });
      }
    )
  );

  passport.serializeUser ((user, done) => {
    done (null, user.id);
  });

  passport.deserializeUser ((id, done) => {
    db.Users
      .findOne ({
        where: {
          id: id,
        },
      })
      .then (function (user) {
        done (null, user);
      });
  });

  app.post (
    '/api/signin',
    passport.authenticate ('local'),
    controller.auth.login
  );

  app.get ('/api/logout', controller.auth.logout);

  app.post ('/register', controller.auth.register);
};
