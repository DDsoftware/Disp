var express = require('express');
var Redirect = require('../middlewares/redirect');
var models = require('../models');

module.exports = {
registerRouter() {
  var router = express.Router();
  router.get('/', Redirect.ifNotLoggedIn('/login'), this.index);

  router.get('/edit', Redirect.ifNotLoggedIn('/login'), this.edit);
  router.post('/edit', Redirect.ifNotLoggedIn('/login'), this.submit);
  return router;
},
index(req, res) {
  res.render('profile');
},
edit(req, res){
  res.render('profile/edit');
},
submit(req, res){
  models.User.update({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    balance: req.body.balance,
    cardNumber: req.body.cardNumber
  }, {
    where: {
      username: req.user.username
    }
  }).then(() => {
        res.redirect('/profile')
    }).catch((error) => {
        res.redirect('/profile/edit');
    });
  }
};
