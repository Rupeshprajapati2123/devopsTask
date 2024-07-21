const { User } = require('../models');

module.exports = {

    index(req, res) {
        User.findAll({})
            .then(users => res.json({
                error: false,
                data: users
            }))
            .catch(error => res.json({
                error: true,
                data: [],
                error: error
            }));
    },

    create(req, res) {
        const { name, username } = req.body;
        console.log("this is the test")
        console.log(name)
        console.log(username)
        if (!name || !username) {
            return res.status(400).json({
                error: true,
                message: "Name and username are required"
            });
        }

        User.create({
            name,
            username
        })
            .then(user => res.status(201).json({
                error: false,
                data: user,
                message: "New user has been created"
            }))
            .catch(error => {
                console.error('Error creating user:', error);
                if (error.name === 'SequelizeValidationError') {
                    return res.status(400).json({
                        error: true,
                        message: error.errors.map(e => e.message)
                    });
                }
                res.status(500).json({
                    error: true,
                    message: 'An error occurred while creating the user'
                });
            });
    },

    update(req, res) {
        const user_id = req.params.id;

        const { name, username } = req.body;

        User.update({
            name, username
        }, {
            where: {
                id: user_id
            }
        })
            .then(user => res.status(201).json({
                error: false,
                data: user,
                message: 'user has been updated'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
    },

    destroy(req, res) {
        const user_id = req.params.id;

        User.destroy({
            where: {
                id: user_id
            }
        })
            .then(status => res.status(201).json({
                error: false,
                message: 'user has been deleted'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
    }
}