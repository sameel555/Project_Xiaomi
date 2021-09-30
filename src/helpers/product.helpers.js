
const Product = require("../models/product.model");

module.exports = {
    getAllProduct: () => {
        return new Promise(async(resolve, reject) => {
            let product = await Product.find().lean().exec()
            resolve(product)
        })
    }
}