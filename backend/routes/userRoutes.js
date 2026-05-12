const express = require('express');
const router = express.Router();

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyToken = require('../middleware/authMiddleware');


/*
========================
CREATE USER
========================
*/

router.post('/', async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
            organization_id
        } = req.body;

        // HASH PASSWORD
        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql =
        `INSERT INTO users
        (name, email, password, role, organization_id)
        VALUES (?, ?, ?, ?, ?)`;

        db.query(
            sql,
            [
                name,
                email,
                hashedPassword,
                role,
                organization_id
            ],

            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: 'Error creating user',
                        error: err
                    });
                }

                res.json({
                    message: 'User created successfully'
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});


/*
========================
GET USERS
========================
*/

router.get('/', (req, res) => {

    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: 'Error fetching users',
                error: err
            });
        }

        res.json(result);
    });
});


/*
========================
UPDATE USER
========================
*/

router.put('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            email,
            password,
            role,
            organization_id
        } = req.body;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql =
        `UPDATE users
        SET
        name=?,
        email=?,
        password=?,
        role=?,
        organization_id=?
        WHERE id=?`;

        db.query(
            sql,
            [
                name,
                email,
                hashedPassword,
                role,
                organization_id,
                id
            ],

            (err, result) => {

                if (err) {

                    return res.status(500).json({
                        message: 'Error updating user',
                        error: err
                    });
                }

                res.json({
                    message: 'User updated successfully'
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});


/*
========================
LOGIN API
========================
*/

router.post('/login', (req, res) => {

    const { email, password } = req.body;

    const sql =
        'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: 'Database error'
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        const user = result[0];

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        // CREATE JWT TOKEN
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });

    });

});


/*
========================
PROTECTED PROFILE API
========================
*/

router.get('/profile', verifyToken, (req, res) => {

    res.status(200).json({
        message: 'Protected Route Accessed',
        user: req.user
    });

});


/*
========================
DELETE USER
========================
*/

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql =
    'DELETE FROM users WHERE id=?';

    db.query(
        sql,
        [id],

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: 'Error deleting user',
                    error: err
                });
            }

            res.json({
                message: 'User deleted successfully'
            });
        }
    );
});


module.exports = router;