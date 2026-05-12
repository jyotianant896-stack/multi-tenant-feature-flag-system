const express = require('express');

const router = express.Router();

const db = require('../config/db');

const verifyToken =
require('../middleware/authMiddleware');

const authorizeRoles =
require('../middleware/roleMiddleware');

const {
    body,
    validationResult
} = require('express-validator');


/* =========================
   GET ALL FEATURES
========================= */

router.get('/', (req, res) => {

    db.query(
        'SELECT * FROM features',
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: 'Error fetching features',
                    error: err
                });
            }

            res.json(result);
        }
    );
});


/* =========================
   CREATE FEATURE
========================= */

router.post(
    '/',

    verifyToken,

    authorizeRoles('admin'),

    [
        body('feature_name')
            .notEmpty()
            .withMessage('Feature name is required'),

        body('organization_id')
            .notEmpty()
            .withMessage('Organization id is required')
    ],

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            feature_name,
            status,
            organization_id
        } = req.body;

        const sql =
            `INSERT INTO features
            (feature_name, status, organization_id)
            VALUES (?, ?, ?)`;

        db.query(
            sql,
            [
                feature_name,
                status,
                organization_id
            ],

            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: 'Error adding feature',
                        error: err
                    });
                }

                res.json({
                    message: 'Feature added successfully'
                });
            }
        );
    }
);


/* =========================
   UPDATE FEATURE
========================= */

router.put(
    '/:id',

    verifyToken,

    authorizeRoles('admin'),

    (req, res) => {

        const { id } = req.params;

        const {
            feature_name,
            status
        } = req.body;

        const sql =
            `UPDATE features
            SET feature_name = ?,
                status = ?
            WHERE id = ?`;

        db.query(
            sql,
            [
                feature_name,
                status,
                id
            ],

            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: 'Error updating feature',
                        error: err
                    });
                }

                res.json({
                    message: 'Feature updated successfully'
                });
            }
        );
    }
);


/* =========================
   DELETE FEATURE
========================= */

router.delete(
    '/:id',

    verifyToken,

    authorizeRoles('admin'),

    (req, res) => {

        const { id } = req.params;

        const sql =
            'DELETE FROM features WHERE id = ?';

        db.query(
            sql,
            [id],

            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: 'Error deleting feature',
                        error: err
                    });
                }

                res.json({
                    message: 'Feature deleted successfully'
                });
            }
        );
    }
);

module.exports = router;