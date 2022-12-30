const express = require('express');
const router = express.Router();

const { 
  createProducts,
  getAllProducts,
} = require('../controllers/productController');

const {
  uploadProductImage,
  productImageUpload
} = require('../controllers/uploadController');


router.route('/')
  .post(createProducts)
  .get(getAllProducts)
router.route('/uploads')
.post(productImageUpload)
.post(uploadProductImage)


module.exports = router;