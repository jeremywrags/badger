var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../models/postgres')
var badger = require('../models/badgerModel')


/* GET home page. */
router.get('/', function(req, res, next) {

db.query(`
    select * from ( 
        select 
        product.name as name, 
        product.id as ID, 
        pli.ccrz__price__c as Price, 
        pl.name as PriceListName,  
        product.ccrz__longdesc__c as LongDescription, 
        product.ccrz__shortdescrt__c as ShortDescription, 
        product.image_uri__c as img,  
        cat.name as CategoryName, 
        parentCat.name as ParentCategory
        from salesforce.ccrz__E_ProductCategory__c pcat
        inner join salesforce.ccrz__E_Product__c product on product.sfid = pcat.ccrz__product__c
        inner join salesforce.ccrz__E_Category__c cat on cat.sfid = pcat.ccrz__category__c
        inner join salesforce.ccrz__E_Category__c parentCat on parentCat.sfid = cat.ccrz__parentcategory__c
        inner join salesforce.ccrz__E_PriceListItem__c pli on pli.ccrz__product__c = product.sfid
        inner join salesforce.ccrz__E_PriceList__c pl on pli.ccrz__pricelist__c = pl.sfid
        ) as res
       where categoryname != 'All Products' and pricelistname = 'Badger Parts Retail Price';
    `)
.then(products =>{
      var result = [];      
      return db.query(`
      select distinct CategoryName as name from ( 
          select product.name as name, product.id as ID, pli.ccrz__price__c as Price, pl.name as PriceListName,  product.ccrz__longdesc__c as LongDescription, product.ccrz__shortdescrt__c as ShortDescription, product.image_uri__c as img,  cat.name as CategoryName, parentCat.name as ParentCategory
          from salesforce.ccrz__E_ProductCategory__c pcat
          inner join salesforce.ccrz__E_Product__c product on product.sfid = pcat.ccrz__product__c
          inner join salesforce.ccrz__E_Category__c cat on cat.sfid = pcat.ccrz__category__c
          inner join salesforce.ccrz__E_Category__c parentCat on parentCat.sfid = cat.ccrz__parentcategory__c
          inner join salesforce.ccrz__E_PriceListItem__c pli on pli.ccrz__product__c = product.sfid
          inner join salesforce.ccrz__E_PriceList__c pl on pli.ccrz__pricelist__c = pl.sfid
          ) as res
         where categoryname != 'All Products' and pricelistname = 'Badger Parts Retail Price';
      `)
      .then( categories => {
        return [products.rows, categories.rows];
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
  
     db.query(`
    select * from ( 
        select 
        product.name as name, 
        product.id as ID, 
        pli.ccrz__price__c as Price, 
        pl.name as PriceListName,  
        product.ccrz__longdesc__c as LongDescription, 
        product.ccrz__shortdescrt__c as ShortDescription, 
        product.image_uri__c as img,  
        cat.name as CategoryName, 
        parentCat.name as ParentCategory
        from salesforce.ccrz__E_ProductCategory__c pcat
        inner join salesforce.ccrz__E_Product__c product on product.sfid = pcat.ccrz__product__c
        inner join salesforce.ccrz__E_Category__c cat on cat.sfid = pcat.ccrz__category__c
        inner join salesforce.ccrz__E_Category__c parentCat on parentCat.sfid = cat.ccrz__parentcategory__c
        inner join salesforce.ccrz__E_PriceListItem__c pli on pli.ccrz__product__c = product.sfid
        inner join salesforce.ccrz__E_PriceList__c pl on pli.ccrz__pricelist__c = pl.sfid
        ) as res
       where categoryname != 'All Products' and pricelistname = 'Badger Parts Retail Price' and id='${req.params.id}';
    `)
.then(products =>{
      var result = [];      
      return db.query(`
      select distinct CategoryName as name from ( 
          select product.name as name, product.id as ID, pli.ccrz__price__c as Price, pl.name as PriceListName,  product.ccrz__longdesc__c as LongDescription, product.ccrz__shortdescrt__c as ShortDescription, product.image_uri__c as img,  cat.name as CategoryName, parentCat.name as ParentCategory
          from salesforce.ccrz__E_ProductCategory__c pcat
          inner join salesforce.ccrz__E_Product__c product on product.sfid = pcat.ccrz__product__c
          inner join salesforce.ccrz__E_Category__c cat on cat.sfid = pcat.ccrz__category__c
          inner join salesforce.ccrz__E_Category__c parentCat on parentCat.sfid = cat.ccrz__parentcategory__c
          inner join salesforce.ccrz__E_PriceListItem__c pli on pli.ccrz__product__c = product.sfid
          inner join salesforce.ccrz__E_PriceList__c pl on pli.ccrz__pricelist__c = pl.sfid
          ) as res
         where categoryname != 'All Products' and pricelistname = 'Badger Parts Retail Price';
      `)
      .then( categories => {
        return [products.rows, categories.rows];
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

module.exports = router;
