const express = require('express');
const router = express.Router();
const User = require('../models/user');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');

const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: 'notagoodsecret',
    resave: true,
    cookie: {maxAge: oneDay},
    saveUninitialized: true
}));

router.use(flash());

router.get('/register', (req, res)=>{
    res.render('./products/register', {warning: req.flash('warning') })
})



router.post('/register', async(req,res)=>{
    const user = await User.findOne({ email: req.body.email, username: req.body.username });
    if (user) {
        //return res.status(400).send('That user already exisits!');
        req.flash('warning', 'That user already exisits!');
        res.redirect('/register');
    } else {
    const { name, username, email, password} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        name,
        username,
        email,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    //errMsg = "Successfully registred, please login";
    res.redirect('/login');
}})

router.get('/login', (req, res)=>{
    //const name = req.flash('user')
    res.render('./products/login', {messages: req.flash('danger') })
})

router.post('/login', async(req,res)=>{
    const user = await User.findOne({username: req.body.username});
    if(!user){
        req.flash('danger', 'User does not exist, please sign up');
        res.redirect('/login');
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass || !user){
        //res.send("Wrong password or username");
        req.flash('danger', 'Wrong password or username, try again');
        res.redirect('/login');
    }else{
        req.session.user_id = user._id;
        res.redirect('/products');
    }
})

router.post('/logout', (req, res)=>{
    req.session.user_id=null;
    res.redirect('/login')
});


module.exports=router;