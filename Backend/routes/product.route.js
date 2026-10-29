// const express = require('express');
// const productRouter = express.Router();
// const {isAuth} = require('../middleware/isAuth')
// const upload = require('../middleware/multer')
// const { addProduct  } = require('../controllers/product.controller'); 

// productRouter.post('/create',isAuth,  upload.fields([
//     {name : "image", maxCount:1}
// ]) ,addProduct);

// module.exports = productRouter;


const express = require('express');
const productRouter = express.Router();
const {isAuth} = require('../middleware/isAuth')
// const productController = require("../controllers/product.controller");
const upload = require('../middleware/multer')
const { addProduct, getAllProducts,getProductById,updateProduct,deleteProduct } = require('../controllers/product.controller'); 
// router.get("/my-products", authMiddleware, productController.getMyProducts);
//create route
// productRouter.post('/create',isAuth,  upload.fields([
//     {name : "image", maxCount:1}
// ]) ,addProduct);



productRouter.post('/create',
  isAuth,
    upload.single('image'),
  addProduct
);

// update route( only owner washerman)
productRouter.put('/:id',isAuth,updateProduct);

//product delete route(only owner washerman)
productRouter.delete('/:id',isAuth,deleteProduct);

//get all product(for customer)
productRouter.get('/all',isAuth,getAllProducts);

//getproduct by id
productRouter.get('/:id',isAuth,getProductById);

module.exports = productRouter;