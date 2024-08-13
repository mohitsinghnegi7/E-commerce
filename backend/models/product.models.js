import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    productImage : String,

    price : {
        type : String,
        required : true
    },
    
    description : {
        type : String,
        required : true
    }
})

const Product = mongoose.model('Product',productSchema)

export default Product