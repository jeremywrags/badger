var express = require('express')
var router = express.Router()
var db = require('../models/postgres')

router.get('/retrieve',   (req, res) => {         
    
    db.query("select name, Description, Family, ID, substring(product2.product_image__c,11,position('alt' in product2.product_image__c)-13) as img from salesforce.product2 where Family is not null and COALESCE(product2.product_image__c,'') NOT ILIKE '%noImage%';")
    .then(products =>{
        res.json(products.rows);
    })
    .catch(err => {
        res.json(err);
    })  
}); 

module.exports = router