const express = require('express');
const models = require('../models');
const Redirect = require('../middlewares/redirect');
const getSlug = require('speakingurl');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/new', Redirect.ifNotLoggedIn('/login'), this.new);
    router.post('/', Redirect.ifNotLoggedIn('/login'), this.create);
    router.get('/:username/:slug', this.show);
    
    return router;
  },
  index(req, res) {
    models.Review.findAll().then((review) => {
      res.render('reviews', { review });
    });
  },
  new(req, res) {
    res.render('reviews/new');
  },
  create(req, res) {
    models.Review.create({
      productName: req.user.productName,
      username: req.user.username,
      slug: getSlug(req.body.title.toLowerCase()),
      title: req.body.title.toLowerCase(),
      body: req.body.body,
    }).then((review) => {
      res.redirect(`/reviews/${review.username}/${review.title}`);
    }).catch(() => {
      res.render('reviews/new');
    });
  },
  show(req, res) {
    models.review.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((review) =>
      (review ? res.render('reviews/single', { review }) : res.redirect('/reviews'))
    );
  },
};
