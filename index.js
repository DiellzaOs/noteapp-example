const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
const Product = require('./models/product');
const methodOverride = require('method-override');
const Authrouter = require('./routes/users');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');



mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/',Authrouter);
app.use(flash());


const requireLogin = (req, res, next)=>{
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next();
}

const categories = ['Weekdays', 'Daily', 'Weekends'];

app.get('/products', requireLogin,  async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

// app.post('/products', (req,res)=>{

//     res.render('prodcts/index')
// })

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
});

app.get('/products/show', (req, res) => {
    res.render('products/show', { categories })
});

// app.get('/products', (req, res)=>{  
//     if(!req.session.user_id){
//         res.redirect('/login')
//     }
//      res.send("this is secret")
//  })

app.get('/products', async (req, res) => {
    const { product } = req.query;
    const user = req.query;
    const products = await Product.find({ product, user })
    res.render('products/index', { products}) 
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product, categories })
});

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});


app.listen(3000, () => {
    console.log("APP IS ON PORT 3000")
})


