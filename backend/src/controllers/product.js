const Product = require('../models/product');
const express = require('express');
const router = express.Router();

const upload = require('../multer');

router.post('/', upload.single('images'), async (req, res) => {
  try {
    let body = req.body.content;
    body = JSON.parse(body);

    let newProduct = {
      title: body.title,
      category: body.category,
      images: req.file.path,
      brand: body.brand,
      price: body.price,
      cpu: body.cpu,
      camera: body.camera,
      size: body.size,
      weight: body.weight,
      display: body.display,
      battery: body.battery,
      memory: body.memory,
      description: body.description,
    };

    const product = new Product(newProduct);

    await product.save();
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    let order;

    //Sorting order
    if (req.query.order) {
      order = req.query.order == 'asc' ? 1 : -1;
    }

    //SortBY
    let sortBy = req.query.sortBy ? req.query.sortBy : 'price';

    //Price Filter
    let priceFilter =
      req.query.min && req.query.max
        ? { price: { $gte: req.query.min, $lte: req.query.max } }
        : { price: { $gte: 100, $lte: 1000000 } };

    //BrandFilter
    let allBrands = req.query.brands;

    if (typeof allBrands != 'string') {
      allBrands =
        allBrands != null
          ? allBrands.map((elem) => {
              return new RegExp(elem, 'i');
            })
          : {};
    } else {
      allBrands = new RegExp(allBrands, 'i');
    }

    let brandFilter = req.query.brands ? { brand: allBrands } : {};
    let allFilter = { ...brandFilter, ...priceFilter };

    console.log(allBrands);

    const products = await Product.find(allFilter)
      .populate('category', '_id name')
      .sort([[sortBy, order]])
      .lean()
      .exec();

    return res.send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();

    if (!product) {
      return res.status(400).send({ message: 'Product not found' });
    }

    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let prod = await Product.findById(req.params.id);

    if (!prod) {
      return res.status(400).send({ message: 'Product Not Found' });
    }

    prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.send(prod);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let prod = await Product.findById(req.params.id);

    if (!prod) {
      return res.status(400).send({ message: 'Product Not Found' });
    }

    await prod.remove();

    res.send('Product Deleted Successfully');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
