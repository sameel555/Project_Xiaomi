const express = require('express')

const router = express.Router();

const Product = require('../models/product.model')
// router.get("/products", (req, res) => {
//     return res.render("index")
// })
const Signup = require('../models/signup.model')
const Login = require('../models/login.model');
 
const objectId = require('mongodb').ObjectID
router.post('/', async (req, res) => {

    const products = await Product.create(req.body);
    res.send(products)
})
router.get('/', async (req, res) => {
    try {
        const checkLogin = await Login.find().lean().exec();
       // console.log(checkLogin.length);
        const checkLogin1 = checkLogin[0];
        const products = await Product.find().lean().exec();
       // console.log("Products is", products._id);
         
        if (checkLogin.length != 0) {
            const currentUser = await Login.find().lean().exec();
            const userProduct = await Signup.findById(currentUser[0]._id);
            let sum1 = 0;
            userProduct.holding_product_cnt.forEach((el) => {
                sum1 += +el;
            });
            res.status(200).render("index", { checkLogin1, sum1,products});
        } else {
            let sum1 = 0;
            let checkLogin1 = "Please Login";
            res.status(200).render("index", { checkLogin1, sum1,products });
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
        
})
    router.get('/logout', async (req, res) => {
    try {
        const currentUser = await Login.find().lean().exec();
        
        let sum1 = 0;
        const products = await Product.find().lean().exec();
        
        await Login.deleteMany();
        let checkLogin1 = 'Please Login';
        res.status(200).render('index', { checkLogin1, sum1,products });
    } catch (err) {
        res.status(400).send(err.message);
    }
})
   
router.get('/cart/:id', async(req, res) => {
        
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
            return  res.status(200).redirect("/");
        } else {
              const updateIdInDb1 = await Signup.findById(userProduct._id);
            let array = updateIdInDb1.holding_product_cnt;
            
            array[array.length] = "1";
            let array2 = updateIdInDb1.holding_product;
            array2[array2.length] = product.name;
            // console.log('array2:', array2)

            
            await Signup.findByIdAndUpdate(userProduct._id, {
                holding_product_cnt: array, holding_product:array2
            });
            return res.status(200).redirect("/");
        }
})

module.exports = router;