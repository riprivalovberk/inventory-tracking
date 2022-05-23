const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

//Comment Models
const Comment = require('../../models/Comment');

// @route GET api/comments
// @desc GET All Comments

router.get('/', (req, res) => {
    Comment.find()
        .then(comments => res.json(comments));
});

// @route POST api/commnets
// @desc POST create a Comment

router.post('/', (req, res) => {
    const newComment = new Comment({
        text: req.body.text,
        itemName: req.body.itemName,
        itemid: req.body.itemid
    });

    newComment.save()
        .then(comment => res.json(comment));
});

// @route DELETE api/comments/:id
// @desc DELETE a Comment and UNDO deletion of Item

router.delete('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => comment.remove().then(() => res.json({sucess: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;