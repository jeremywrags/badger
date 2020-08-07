var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../models/postgres')


/* GET home page. */
router.get('/', function(req, res, next) {
  
db.query("select name, Description, Family, ID, substring(product2.product_image__c,11,position('alt' in product2.product_image__c)-13) as img from salesforce.product2 where Family is not null and COALESCE(product2.product_image__c,'') NOT ILIKE '%noImage%' and COALESCE(product2.product_image__c,'') NOT ILIKE '%ImageServer%';")
.then(products =>{
      var result = [];
      return db.query("select distinct Family as name from salesforce.product2 where Family is not null and COALESCE(product2.product_image__c,'') NOT ILIKE '%noImage%' and COALESCE(product2.product_image__c,'') NOT ILIKE '%ImageServer%';")
      .then( categories => {
        return [products.rows, categories.rows];
      });
    })
    .then(function(result){
      res.render('index', {page:'Home Page', products: result[0], categories: result[1]});     
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
  
  db.query("select name, Description, Family, ID, substring(product2.product_image__c,11,position('alt' in product2.product_image__c)-13) as img from salesforce.product2 where id=" + req.params.id + ";")
.then(products =>{
      var result = [];
      return db.query("select distinct Family as name from salesforce.product2 where Family is not null and COALESCE(product2.product_image__c,'') NOT ILIKE '%noImage%' and COALESCE(product2.product_image__c,'') NOT ILIKE '%ImageServer%';")
      .then( categories => {
        return [products.rows, categories.rows];
      });
    })
    .then(function(result){
      res.render('productDetail', {page:'Home Page', product: result[0][0], categories: result[1]});     
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

module.exports = router;
