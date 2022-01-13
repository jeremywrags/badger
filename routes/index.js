var express = require('express');
var router = express.Router();
var path = require('path');
var badger = require('../models/badgerModel')


/* GET home page. */
router.get('/', function(req, res, next) {

badger.getProducts()
.then(products =>{         
      return badger.getHierarchicalCategories()
      .then( categories => {
        return [products, categories];
      });
    })
    .then(function(result){
      res.render('index', {page:'Home Page',pageURLref : '', products: result[0], categories: result[1]});     
    })    
});

/* GET home page. */
router.get('/dft', function(req, res, next) {
  var pwd = req.query.pwd;
  if(pwd == "Welcome@1")
    res.sendFile(path.join(__dirname, '../public/ucp-creator/html/ucp-creator.html'));
  else
    res.sendStatus(500);
})

router.get('/productDetail/:id', function(req, res){
   
     badger.getProduct(req.params.id)
.then(product =>{
      var result = [];      
      return badger.getHierarchicalCategories()
      .then( categories => {
        return [product, categories];
      });
    })
    .then(function(result){
      res.render('productDetail', {page:'Product Detail Page', pageURLref : '/', product: result[0][0], categories: result[1]});     
    })    
})

router.get('/products', function(req, res){
  pool.query('select name from salesforce.product2;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

router.get('/cart', function(req, res){
  badger.getProduct(req.params.id)
.then(product =>{
      var result = [];      
      return badger.getHierarchicalCategories()
      .then( categories => {
        return [product, categories];
      });
    })
    .then(function(result){
      res.render('cart', {page:'Shopping cart', pageURLref : '/',  categories: result[1]});     
    })        
})

module.exports = router;
