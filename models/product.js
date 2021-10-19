const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Weekdays', 'Daily', 'Weekends']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
