const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const send = require("send");
const urlencodedParser = bodyParser.urlencoded({ extended: false });



const Product = require('../models/product.model')
const Price = require('../models/price.model')
const Login = require("../models/login.model");
const Signup = require('../models/signup.model');

router.post('/priceCollection',urlencodedParser, async (req, res) => {
    try {
        
        await Price.deleteMany();
        await Price.create(req.body);
    } catch (err) {
        res.status(400).send(err.message);
    }
})


// Adding product in cart collection
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean().exec();
        const currentUser = await Login.find().lean().exec();
        const userProduct = await Signup.findById(currentUser[0]._id);
        let ff = false;
        let idx;
        const prd = userProduct.holding_product.filter((el, i) => {
           
            if (product.name === el) {
                idx = i;
                ff = true;
            }
        })
        if (ff) {
            const updateIdInDb1 = await Signup.findById(
                userProduct._id
            );
            let array = updateIdInDb1.holding_product_cnt;
            let value = +array[idx]
            array[idx] = value + 1 + '';
            
            await Signup.findByIdAndUpdate(userProduct._id, { holding_product_cnt: array })
            return  res.status(200).redirect("/product");
        } else {
              const updateIdInDb1 = await Signup.findById(userProduct._id);
            let array = updateIdInDb1.holding_product_cnt;
            
            array[array.length] = "1";
            let array2 = updateIdInDb1.holding_product;
            array2[array2.length] = product.name;
            
            await Signup.findByIdAndUpdate(userProduct._id, {
                holding_product_cnt: array, holding_product:array2
            });
            return res.status(200).redirect("/product");
        }

            
    } catch (err) {
        res.status(400).send(err.message)
    }
})




module.exports = router;