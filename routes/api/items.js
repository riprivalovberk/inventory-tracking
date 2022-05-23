const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

//Item Models
const Item = require('../../models/Item');

// @route GET api/items
// @desc GET All Items

router.get('/', (req, res) => {
    Item.find()
        .then(items => res.json(items));
});

// @route POST api/items
// @desc POST create an Item

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });

    newItem.save()
        .then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc DELETE an Item

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({sucess: true})))
        .catch(err => res.status(404).json({success: false}));
});

// @route PUT api/items/:id
// @desc EDITS (PUTS) an Item

router.put('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.update(req.body).then(() => res.json({sucess: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;