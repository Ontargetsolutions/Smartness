const passport = require ('passport');
const controller = require ('../controllers/index');

module.exports = app => {
  ////////////////////////// Auth ///////////////////////////////////////

  app.post ('/api/login', passport.authenticate ('local'), controller.auth.login);

  app.get ('/api/logout', controller.auth.logout);

  app.get ('/api/register', controller.auth.register);
};
