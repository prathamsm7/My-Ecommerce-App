const Category = require('../models/Category');
const express = require('express');
const router = express.Router();

// create new category
router.post('/', async (req, res) => {
  try {
    let cate = req.body.name.toLowerCase();
    let category = await Category.findOne({
      name: cate,
    });

    if (category) {
      return res.status(400).send('Category already existed');
    }

    category = await Category.create({ name: cate });

    return res.send(category);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// all categories
router.get('/', async (req, res) => {
  try {
    let category = await Category.find();

    if (!category) {
      return res.status(400).send('Categories not found');
    }

    return res.send(category);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Get a category
router.get('/:id', async (req, res) => {
  try {
    let category = await Category.findById(req.params.id).lean().exec();

    if (!category) {
      return res.status(400).send('Category Not Found');
    }

    return res.send(category);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Update a category
router.patch('/:id', async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(400).send('Category Not Found');
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.send(category);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(400).send('Category Not Found');
    }

    await Category.findByIdAndDelete(req.params.id);

    return res.status(200).send({ message: 'Category Deleted Successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
