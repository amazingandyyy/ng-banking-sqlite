'use strict';

var express = require('express');
var router = express.Router();

var record = require('../models/record');

//   /api/records
router.route('/')
    .get((req, res) => {
        record.get((err, records) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.send(records);
        });
    })
    .post((req, res) => {
        console.log('req.body: ', req.body);
        record.create(req.body, (err, newrecord) => {
            if (err) {
                return res.status(455).send(err);
            }
            res.send(newrecord);
        });
    })
    .put((req, res) => {
        console.log('update req.body: ', req.body);
        record.update(req.body, (err, updatedRecord) => {
            if (err) {
                return res.status(455).send(err);
            }
            res.send(updatedRecord);
        });
    })

router.delete('/:id', (req, res) => {
    console.log('req.params.id: ', req.params.id);
    record.removeById(req.params.id, err => {
        res.status(err ? 400 : 200).send(err);
    });
});

module.exports = router;
