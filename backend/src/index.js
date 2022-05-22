require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const connect = require('./config/db');
const cors = require('cors');

const usercontroller = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const productController = require('./controllers/product');
const paymentController = require('./controllers/payment');

app.use(express.json());
app.use(cors());

app.use('/api/user', usercontroller);
app.use('/api/category', categoryController);
app.use('/api/product', productController);
app.use('/api/payment', paymentController);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/dist'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listning on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});