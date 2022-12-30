require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// Database
const connectDB = require('./db/connect');
// routes
const productsRouter = require('./routes/productRoutes');
// error handle
const NotFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handle');

app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
}));

app.get('/', (req, res) => {
  res.send('<h1>upload file Starter</h1>')
})

app.use('/api/v1/products', productsRouter);

// middleware
app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect Db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Serve listening on ${port}....`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();