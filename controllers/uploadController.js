const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const productImageUpload = async (req, res) => { 
  if (!req.files) {
    throw new CustomError.BadRequestError('No files were uploaded');
  };

  const productPath = req.files.image;
  if (!productPath.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image');
  }

  const maxSize = 1024 * 1024;

  if (productPath.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller than 1mb');
  }

  const imagePath = path.join(__dirname,'../public/uploads'+`${productPath.name}`);

  await productPath.mv(imagePath)
  return res.status(StatusCodes.OK).json({
    image: {
      src:`uploads/${productPath.name}`
    }
  })
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload
    (
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: 'file-upload'
      }
    )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url
    }
  })
};


module.exports = {
  uploadProductImage,
  productImageUpload
}