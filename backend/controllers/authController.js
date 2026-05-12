const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
        'INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)';

    db.query(
        sql,
        [name, email, hashedPassword, role],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'User Registered Successfully'
            });
        }
    );
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE email=?',
        [email],
        async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid Password'
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            res.json({
                token
            });
        }
    );
};