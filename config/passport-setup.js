const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// const keys = require("./keys");
var db = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findOne({
    where: {
      id: id
    }
  }).then(function(user) {
    done(null, user);
  });
});

passport.use(
    new LocalStrategy((email, password, done) => {
      // Retrieve a User object from the database using Sequelize
      // by username
      //where: { username: username }
      db.User.findOne({ where: { email: email } }).then(res => {
        //console.log(res);
        // res is the response from Sequelize in the promise
        // If there's no response, give error message
        if (!res) return done(null, false, { message: "Incorrect username" });
  
        // Content (User object) is in res.dataValues
        let user = res.dataValues;
        // Password in the user.password field is already hashed. Store in variable hash
        let hash = user.password;
        // Compare the password (using the hash in session)
        bcrypt.compare(password, hash, (err, res) => {
          // res is the results of the comparison (true or false)
          if (err) return done(err);
          if (res) {
            //console.log(user);
  
            email = user.email;
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );