var db = require('./postgres')

function getCategories (callback) {  
  return new Promise((resolve, reject) => {
      
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
    `, (err, data) => {
        if (err) {
            // if no callback available, reject the promise
            // else, return callback using "error-first-pattern"
            return callback ? callback(err) : reject(err)
          }
    
          return callback ? callback(null, data) : resolve(data)  
    })    
  })
}

module.exports = getCategories  