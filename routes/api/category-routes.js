const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({ include: [Product] })
    res.json(allCategories)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, { include: [Product] })
    res.json(oneCategory)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      "category_name": "Shorts"
    }
  */
  try {
    await Category.create(req.body, {
      fields: ['category_name'] 
    })
    res.json(req.body)
  } catch(error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
    {
      category_name: 'Pants'
    }
  */
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(req.body)
  } catch(error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).send()
  } catch(error) {
    res.status(500).json(error)
  }
});

module.exports = router;
