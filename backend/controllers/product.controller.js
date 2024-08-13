import Product from "../models/product.models.js";

const uploadProduct = async(req, res)=>{
    
    try{
        const {name, category, productImage, price, description} = req.body

        if(!name && !category && !productImage && !price && !description){
            return res.status(400).json({
                message : "All fields are required",
                error : true,
                success : false
            })

        }

        const product = await Product.create({
                name,
                category,
                productImage,
                price,
                description
        })

        if(!product){
            return res.status(400).json({
                message : "Error while uploading",
                error : true,
                success : false
            })
        }
        console.log(product);
        
        return res.status(200).json({
            message : "Product Uploaded Successfully",
            error : false,
            success : true
        })
    }
    catch(err){
        return res.status(400).json({
            message : "Error while uploading",
            error : true,
            success : false
        })
    }
}


const allProduct = async(req,res)=>{
        try{
            const data = await Product.find({})
            res.json({
                data
            })
        }
        catch(err){
            console.log("product",err);
            
        }
}

const singleProduct = async(req,res)=>{
    try{
        const _id = req.body
        const foundProduct = await Product.find({
                _id
        })
        res.json({
            foundProduct
        })
    }
    catch(err){
        console.log("product",err);
        
    }
}

export {
    uploadProduct,
    allProduct,
    singleProduct
}