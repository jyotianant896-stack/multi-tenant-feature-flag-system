const express = require('express');

const router = express.Router();

const db = require('../config/db');


/* =========================
   GET ALL ORGANIZATIONS
========================= */

router.get('/', (req, res) => {

    const sql = 'SELECT * FROM organizations';

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: 'Error fetching organizations',
                error: err
            });

        }

        res.json(result);

    });

});


/* =========================
   CREATE ORGANIZATION
========================= */

router.post('/', (req, res) => {

    const { name } = req.body;

    if (!name) {

        return res.status(400).json({
            message: 'Organization name is required'
        });

    }

    const sql =
        `INSERT INTO organizations (name)
         VALUES (?)`;

    db.query(
        sql,
        [name],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: 'Error adding organization',
                    error: err
                });

            }

            res.json({
                message: 'Organization added successfully'
            });

        }
    );

});


/* =========================
   UPDATE ORGANIZATION
========================= */

router.put('/:id', (req, res) => {

    const { id } = req.params;

    const { name } = req.body;

    const sql =
        `UPDATE organizations
         SET name = ?
         WHERE id = ?`;

    db.query(
        sql,
        [name, id],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: 'Error updating organization',
                    error: err
                });

            }

            res.json({
                message: 'Organization updated successfully'
            });

        }
    );

});


/* =========================
   DELETE ORGANIZATION
========================= */

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql =
        'DELETE FROM organizations WHERE id = ?';

    db.query(
        sql,
        [id],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: 'Error deleting organization',
                    error: err
                });

            }

            res.json({
                message: 'Organization deleted successfully'
            });

        }
    );

});


module.exports = router;