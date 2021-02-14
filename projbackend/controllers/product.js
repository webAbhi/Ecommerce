const Product = require("../models/product");
const category = require("../models/category");
const formidable =require("formidable");
const _ = require("lodash");
const fs = require("fs"); 



exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,productId) => {
        if(err || !productId){
            res.status(400).json({
                err:"Not able to get product Id"
            })
        }
        req.product = productId;
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions =true; 

    form.parse(req,(err,field,file) => {
        if(err){
             return res.status(400).json({
                err:"Inappropriate image"
            })
        }


        //data restriction

        const {name,description,price,category,stock} = field;
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                err:"All fields  r required"
            })

        }


        let product =new Product(field);

        //handling file

        if(file.photo){
            if(file.photo.size > 300125){
                return res.status(400).json({
                    err:"too big file"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        //saving 
        product.save((err,product) => {
            if(err ){
                return res.status(400).json({
                    err:"failed to save"
                })
            }
            res.json(product);
            
        })
    })
    

}


exports.getProduct =(req, res) => {
    req.product.photo = undefined; 
    return res.json(req.product);
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct =(req, res) => {  
    let product = req.product;
    product.remmove((err, deletedProducr)=> {
        if(err){
            return res.status(400).json({
                err:"failed to delete product"
            })
        }
        return res.staus(200).json({
            message:"successfully deleted product"
        })

    })
    
}

exports.updateProduct =(req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions =true; 

    form.parse(req,(err,field,file) => {
        if(err){
             return res.status(400).json({
                err:"Inappropriate image"
            })
        }


        //updation

        let product =req.product;
        product = _.extend(product,fields)

        //handling file

        if(file.photo){
            if(file.photo.size > 300125){
                return res.status(400).json({
                    err:"too big file"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        //saving 
        product.save((err,product) => {
            if(err ){
                return res.status(400).json({
                    err:"Updation failed"
                })
            }
            res.json(product);
            
        })
    })

}

exports.getAllProduct =(req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) :8
    let sortBy = req.query.sortBy ? req.query.sortBy :"_id"
    product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                err:"No product found"
            })
        }
        return res.json(products);
    })
}


exports.getAllUniqueCategories =(req, res) => {
    product.distinct("category",{},(err, category) => {
        if(err){
            return res.status(400).json({
                err:"no category found"
            })
        }
        return res.json(category);
    })

}

exports.updateStock =(req, res, next) => {
    let myOperation =req.body.order.product.map(prod =>{
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock:-prod.count, sold: +prod.count}}

            }
        }
    });
    product.bulkWrite(myOperation, {}, (err,product)=>{
        if(err){
            return res.status(40).json({
                error:"bulk operation failed"
            })
        }
        next();

    })

}