const { response } = require("express");
const Products = require('../data/Products'); 

class productController {
    async create(req, res) {
        try {
            const { name, price, description } = req.body;

                const newProduct = {
                id: Date.now().toString(), 
                name,
                price,
                description
            };
            
            Products.push(newProduct);

            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера при создании продукта', error: error.message });
        }
    }

    async getProducts (req, res) {
        try {
            return res.status(200).json(Products);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при получении данных' });
        }
    }   
};

module.exports = new productController();



