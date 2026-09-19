const express = require('express');
const router = express.Router();
const product = require("../controllers/productController");

router.post("/products", product.create); 

router.get("/products", product.getProducts);

router.get('/', (req, res) => {
    res.send('hello!')
})

module.exports = router;



