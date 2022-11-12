// api-routes.js
// Initialize express router
let router = require('express').Router();
Redis = require('redis')
axios = require('axios')
const redisClient = Redis.createClient()
const DEFAULT_EXPIRATION = 3600

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// router.get('/contacts', async (req, res) => {
//     const { data } = await axios.get(
//         'http://localhost:8000/api/contacts/',
//     )
//     res.json(data)


//     // try {
//     //     contacts =  Contact.get(function (err, contacts) {
//     //         res.json({
//     //             status: "success",
//     //             message: "Contacts retrieved successfully",
//     //             data: contacts
//     //         });
            
//     //     });
//     //     redisClient.set("contacts", contacts)
//     // } catch (err) {
//     //     return res.json(err);
//     // }
// });


// Import contact controller
var contactController = require('./contactController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:email_address')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
// Export API route
module.exports = router;
