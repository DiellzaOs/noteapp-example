// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');
// const productIndex = require("../index");
// const Product = require('../models/product');
// const methodOverride = require('method-override')

// mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     });



// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))


// app.get('/products', async (req, res) => {
//     const product = await Product.find().sort({ createdAt: -1 })
//     res.render('products/index', { product: product })
// });

// app.use('products/index', productIndex);

// app.listen(3000)