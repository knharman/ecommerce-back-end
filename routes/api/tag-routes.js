const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({include: [Product]})
    res.json(allTags)
  } catch(error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {include: [Product]})
    res.json(oneTag)
  } catch(error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
   /* req.body should look like this...
    {
      tag_name: 'Music'
    }
  */
    try {
      await Tag.create(req.body, {
        fields: ['tag_name'] 
      })
      res.send()
    } catch(error) {
      res.status(500).json(error)
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
   /* req.body should look like this...
    {
      tag_name: 'Music'
    }
  */
  try {
    await Tag.update(req.body, {
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
  // delete on tag by its `id` value
  try {
    Tag.destroy({
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
