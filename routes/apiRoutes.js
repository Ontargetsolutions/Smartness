const passport = require ('passport');
const controller = require ('../controllers/index');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const FacebookStrategy = require ('passport-facebook').Strategy;
const LocalStrategy = require ('passport-local').Strategy;
var db = require ('../models');
const bycript = require ('bcrypt');

module.exports = app => {
  ////////////////////////// Auth ///////////////////////////////////////

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
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log (
          `dentro de la estrategia de google el profile que devuelve+++++++++++++++++++++++++++++++++++++++++++++++ ${JSON.stringify(profile)}`
        );
        //    db.Users.findOrCreate({ Google_id: profile.id }, function (err, user) {
        //         return done(err, user);
        //     });
        db.Users
          .findOne ({
            where: {
              Google_id: profile.id,
            },
          })
          .then (function (currentUser) {
            console.log (
              `dentro de la estrategia de google lo que devuelve de buscar en la base de datos con el google id ======================================${JSON.stringify (currentUser)}`
            );
            if (currentUser) {
              done (null, currentUser);
            } else {
              db.Users
                .findOne ({
                  where: {
                    Email: profile.emails[0].value,
                  },
                })
                .then (function (currentUser) {
                  if (currentUser) {
                    db.Users
                      .update (
                        {
                          Google_id: profile.id,
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
                    return done (null, false);
                  }
                });
            }
          });
      }
    )
  );

  // Facebook Strategy
  passport.use (
    new FacebookStrategy (
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/redirect',
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log (
          `dentro de la estrategia de facebook el profile que devuelve ${JSON.stringify (profile)}`
        );
        return cb (null, profile);
      }
    )
  );

  app.post (
    '/api/signin',
    passport.authenticate ('local'),
    controller.auth.login
  );
  //auth with google
  app.get (
    '/google',
    passport.authenticate ('google', {scope: ['profile', 'email']})
  )

  //   callback route for google to redirect to
  .get (
    '/auth/google/redirect',
    passport.authenticate ('google', {failureRedirect: '/singup'}),
    (req, res) => {
        try{

            res.status(200);
            res.redirect('/')
        } catch(error) {
            console.log(error)
        }
    }
  );

  //auth with facebook
  app.get ('/facebook', passport.authenticate ('facebook'));

  //   callback route for facebook to redirect to
  app.get (
    '/auth/facebook/redirect',
    passport.authenticate ('facebook'),
    (req, res) => {
      console.log (
        `res dentro de la ruta de redireccionamiento de facebook ${JSON.stringify (req)}`
      );
      res.redirect ('/');
    }
  );

  app.get ('/api/logout', controller.auth.logout);

  app.post ('/register', controller.auth.register);
};
