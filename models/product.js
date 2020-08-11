const { Sequelize } = require("sequelize/types");

const product = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        ID: {
            type: DataTypes.INTEGER
        },
        name : {
            type: DataTypes.STRING
        },
        price : {
            type: DataTypes.STRING
        },
        longDescription : {
            type: DataTypes.STRING
        },
        shortDescription : {
            type: DataTypes.STRING
        },
        categoryName : {
            type: DataTypes.STRING
        },
        parentCategory : {
            type: DataTypes.STRING
        }               
    });
    return Product;
};

export default product;