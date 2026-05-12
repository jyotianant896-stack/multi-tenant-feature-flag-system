const db = require('../config/db');


// GET all organizations
exports.getOrganizations = (req, res) => {

    const sql = 'SELECT * FROM organizations';

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: 'Database Error'
            });
        }

        res.status(200).json(result);

    });

};


// CREATE organization
exports.createOrganization = (req, res) => {

    const { name } = req.body;

    const sql =
        'INSERT INTO organizations (name) VALUES (?)';

    db.query(sql, [name], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: 'Database Error'
            });
        }

        res.status(201).json({
            message: 'Organization Created'
        });

    });

};