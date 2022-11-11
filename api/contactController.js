// contactController.js
// Import contact model
Contact = require('./contactModel');
// Handle index actions
exports.index = function (req, res) {
    try {
        Contact.get(function (err, contacts) {
            res.json({
                status: "success",
                message: "Contacts retrieved successfully",
                data: contacts
            });
        });
    } catch (err) {
        return res.json(err);
    }
};

// Handle create contact actions
exports.new = async function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    try {
        contact.save(function (err) {
            res.json({
                message: 'New contact created!',
                data: contact
            });
        });
    } catch (err) {
        return res.json(err);
    }
};
// Handle view contact info
exports.view = async function (req, res) {
    try {
        Contact.find({email: req.params.email_address}, function (err, contact) {
            res.json({
                message: 'Contact details loading..',
                data: contact
            });
        });
    } catch (err) {
        return res.json(err);
    }
};
// Handle update contact info
exports.update = async function (req, res) {
    email_address = req.params.email_address
    try {
        Contact.findOne({ email: email_address }, function (err, contact) {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.email = req.body.email ? req.body.email : contact.name;
            contact.gender = req.body.gender ? req.body.gender : contact.gender;
            contact.phone = req.body.phone ? req.body.phone : contact.phone;
            // save the contact and check for errors
            contact.save(function (err) {
                res.json({
                    message: 'Contact Info updated',
                    data: contact
                });
            });
        });
    } catch (err) {
        return res.json(err);
    }
};
// Handle delete contact
exports.delete = async function (req, res) {
    try {
        Contact.deleteOne({
            email: req.params.email_address
        }, function (err, contact) {
            if (err)
                res.send(err);
        res.json({
                status: "success",
                message: 'Contact deleted'
            });
        });
    } catch (err) {
        return res.json(err);
    }
};