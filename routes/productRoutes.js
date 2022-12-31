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


router.get('/', getAllProducts);
router.post('/', createProducts);
router.route('/uploads')
.post(uploadProductImage)
// .post(productImageUpload)


module.exports = router;