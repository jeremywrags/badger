var db = require('./postgres')

module.exports.getParentCategories = function() {
  return new Promise(function(resolve, reject) {
         db.query(`
          select * from salesforce.ccrz__E_Category__c cat
          where ccrz__parentcategory__c is null
          `, function(err, data){
        if (err) return reject(err);
          resolve(data.rows);
      })
  });
}

module.exports.getChildCategories = function(parentID) {
    return new Promise(function(resolve, reject) {
      db.query(`
      select * from salesforce.ccrz__E_Category__c cat
      where sfid='${parentID}'
      `, function(err, data){
    if (err) return reject(err);
      resolve(data.rows);
  })
  });
  
}

module.exports.getCategories2 = function() {
  return new Promise(function(resolve, reject) {
         db.query(`
         WITH RECURSIVE parents AS
(
    SELECT
        sfid AS id,
        '' :: TEXT AS parent,
        name,
        '' :: TEXT AS parentname
    FROM salesforce.ccrz__E_Category__c
    WHERE name in ('BadgerEquipment','BadgerParts', 'Heavy Equipment' ) 
    UNION
    SELECT
        child.sfid  AS id,
        child.ccrz__parentcategory__c AS parent,
        child.name,
        p.name AS parentname
    FROM salesforce.ccrz__E_Category__c child
    INNER JOIN parents p ON p.id = child.ccrz__parentcategory__c
)
SELECT
  id,
  parent,
  name,
  parentname
FROM parents where name != 'All Products' order by parentname asc; 
      `, function(err, data){
        if (err) return reject(err);
          resolve(data.rows);
      })
  });
}

module.exports.getCategories = function() {
  return new Promise(function(resolve, reject) {
         db.query(`
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
      `, function(err, data){
        if (err) return reject(err);
          resolve(data.rows);
      })
  });
}

module.exports.getProducts = function() {
  return new Promise(function(resolve, reject) {
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
      `, function(err, data){ // and pricelistname = 'Badger Parts Retail Price'
        if (err) return reject(err);
          resolve(data.rows);
      })
  });
}

module.exports.getProduct = function(productID) {
  return new Promise(function(resolve, reject) {
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
         where categoryname != 'All Products' and pricelistname = 'Badger Parts Retail Price' and id='${productID}';
      `, function(err, data){
        if (err) return reject(err);
          resolve(data.rows);
      })
  });
}