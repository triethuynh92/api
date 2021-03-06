const Account = require('../model/account');
const User = require('../model/user');

// Find all Accounts
exports.findAll = (req, res) => {
    Account
    .find()
    .then(accounts => {
        res.send(accounts);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving accounts"
        });
    })
}

// Find an Account by "Id"
exports.findOne = (req,res) => {
    Account
    // Find a Account by "id" property and except the "_id" & "__v" field
    .findOne({id:req.param("id")}, {_id: 0, __v: 0}) 
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with ID " 
            });
        }
        res.send({'attributes':account});
    })
    .catch(err => {
        return res.status(505).send({
            message: "Something wrong retrieving account with Id "
        });
    })
}

// Find all Accounts by "user_id" of User
exports.findAccountsByUser = (req, res) => {
    Account
    .find({user_id: req.param('user_id')}, {_id: 0, __v: 0})
    .then(result => {
        res.send(result.map(data => {
            return ({'attributes': data});
        }));
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving accounts"
        });
    })

}

