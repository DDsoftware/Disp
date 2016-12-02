
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
    router.get('/:username/:slug/edit',
                Redirect.ifNotLoggedIn('/login'),
                Redirect.ifNotAuthorized('/products'),
                this.edit
              );
    router.put('/:username/:slug',
                Redirect.ifNotLoggedIn('/login'),
                Redirect.ifNotAuthorized('/products'),
                this.update
              );
    router.delete('/:username/:slug',
                   Redirect.ifNotLoggedIn('/login'),
                   Redirect.ifNotAuthorized('/products'),
                   this.delete
                  );

    return router;
  },
  index(req, res) {
    models.Product.findAll().then((product) => {
      res.render('products', { product });
    });
  },
  new(req, res) {
    res.render('products/new');
  },
  create(req, res) {
    models.Product.create({
      email: req.user.email,
      username: req.user.username,
      slug: getSlug(req.body.productName),
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productPhotos: req.body.productPhotos,
      
    }).then((product) => {
      res.redirect(`/products/${product.username}/${product.productName}`);
    }).catch(() => {
      res.render('products/new');
    });
  },
  show(req, res) {
    models.Product.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((product) =>
      (product ? res.render('products/single', { product }) : res.redirect('/products'))
    );
  },
  edit(req, res) {
    models.Product.findOne({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((product) =>
      (product ? res.render('products/edit', { product }) : res.redirect('/products'))
    );
  },
  update(req, res) {
    models.Product.update({
      productName: req.body.productName,
      slug: getSlug(req.body.productName),
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productPhotos: req.body.productPhotos,
    }, {
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then((product) => {
      res.redirect(`/products/${product.username}/${product.productName}`);
    });
  },
  delete(req, res) {
    models.Product.destroy({
      where: {
        username: req.params.username,
        slug: req.params.slug,
      },
    }).then(() => {
      res.redirect('/products');
    });
  },
};
