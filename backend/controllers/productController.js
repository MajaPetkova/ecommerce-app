import {v2 as cloudinary} from "cloudinary";


// add product 
const addProduct = async(req, res) =>{
try{
const {name, description,price, category, subcategory, sizes, bestseller} =  req.body;
const image1 = req.files.image1 && req.files.image1[0];
const image2 = req.files.image2 && req.files.image2[0];
const image3 = req.files.image3 && req.files.image3[0];
const image4 = req.files.image4 && req.files.image4[0];

const images= [image1, image2,image3, image4].filter((x)=> x !== undefined);


const imagesUrl = await Promise.all(images.map(async(x)=>{
    let result = await cloudinary.uploader.upload(x.path, {resource_type: "image"});
    return result.secure_url
} ))

console.log(name, description,price, category, subcategory, sizes, bestseller)
console.log(imagesUrl);
res.json({})

}catch(err){
    console.log(err);  
    res.json({success:false, message: err.message})
}
}

// get products 
const getProducts = async(req, res)=>{

}

// remove product 
const removeProduct = async(req, res)=>{
    
}

// get one product 
const singleProduct = async(req, res)=>{
    
}
export {addProduct, getProducts, removeProduct, singleProduct}