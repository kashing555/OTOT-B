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
    contact.name = req.body.name ? req.body.name : null;
    contact.gender = req.body.gender ? req.body.gender : null;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save()
        .then(() => res.json({
            message: 'New contact created!',
            data: contact}))
        .catch(err => res.status(400).json('Error: ' + err));
};
// Handle view contact info
exports.view = async function (req, res) {
    try {
        Contact.find({email: req.params.email_address}, function (err, contact) {
            if (contact.length == 0)
                return res.status(404).json({
                    message: 'Email does not exist'
            });
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
            if (req.body.name == null && req.body.email == null && req.body.gender == null && req.body.phone == null) {
                return res.status(400).json('Error: There is no input')
            }


            contact.name = req.body.name ? req.body.name : contact.name;
            contact.email = req.body.email ? req.body.email : contact.email;
            contact.gender = req.body.gender ? req.body.gender : contact.gender;
            contact.phone = req.body.phone ? req.body.phone : contact.phone;
            // save the contact and check for errors


            contact.save()
            .then(() => res.json({
                message: 'Contact Info updated',
                data: contact}))
            .catch(err => res.status(400).json('Error: ' + err));
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
            else if (contact.deletedCount === 0)
            return res.status(404).json({
                message: 'Email does not exist'
            });
        res.json({
                status: "success",
                message: 'Contact deleted'
            });
        });
    } catch (err) {
        return res.json(err);
    }
};