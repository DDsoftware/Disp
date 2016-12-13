var express = require('express');
var Redirect = require('../middlewares/redirect');
var models = require('../models');

module.exports = {
 registerRouter() {
   var router = express.Router();
   router.get('/', Redirect.ifNotLoggedIn('/login'), this.index);
   router.post('/', this.submit);
   return router;
 },
 index(req, res) {
   res.render('confirms', { error: req.flash('error') });
 },
   submit(req, res) {
    models.User.update({
      productPurchase: req.product.productName,
    }, {
      where: {
        username: req.user.username
      }
  }).then(() => {
        res.redirect('/profile')
    }).catch((err) => {
       console.log(err);
    });
  },
};
