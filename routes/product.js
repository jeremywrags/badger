var express = require('express')
var router = express.Router()
var db = require('../models/postgres')
var badger = require('../models/badgerModel')

router.get('/retrieve',   (req, res) => {         
    
    db.query("select name, Description, Family, ID, substring(product2.product_image__c,11,position('alt' in product2.product_image__c)-13) as img from salesforce.product2 where Family is not null and COALESCE(product2.product_image__c,'') NOT ILIKE '%noImage%';")
    .then(products =>{
        res.json(products.rows);
    })
    .catch(err => {
        res.json(err);
    })  
}); 


router.get('/retrievecc',   (req, res) => {         
    
    db.query(`
    select distinct * from ( 
        select product.name as name, product.id as ID, pli.ccrz__price__c as Price, pl.name as PriceListName,  product.ccrz__longdesc__c as LongDescription, product.ccrz__shortdescrt__c as ShortDescription, product.image_uri__c as img,  cat.name as CategoryName, parentCat.name as ParentCategory
        from salesforce.ccrz__E_ProductCategory__c pcat
        inner join salesforce.ccrz__E_Product__c product on product.sfid = pcat.ccrz__product__c
        inner join salesforce.ccrz__E_Category__c cat on cat.sfid = pcat.ccrz__category__c
        inner join salesforce.ccrz__E_Category__c parentCat on parentCat.sfid = cat.ccrz__parentcategory__c
        inner join salesforce.ccrz__E_PriceListItem__c pli on pli.ccrz__product__c = product.sfid
        inner join salesforce.ccrz__E_PriceList__c pl on pli.ccrz__pricelist__c = pl.sfid
        ) as res
       where categoryname != 'All Products' and name = 'Cyclinder Block';
    `)
    .then(products =>{
        res.json(products.rows);
    })
    .catch(err => {
        res.json(err);
    })  
}); 
router.get('/retrievecccategories',   (req, res) => {         
    
    db.query(`
    select distinct categoryname from ( 
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
    .then(products =>{
        res.json(products.rows);
    })
    .catch(err => {
        res.json(err);
    })  
}); 

router.get('/categories',   (req, res) => {         
    
    badger.getCategories()
    .then(cats =>{
        res.json(cats.rows);
    })
    .catch(err => {
        res.json(err);
    })  
}); 




module.exports = router