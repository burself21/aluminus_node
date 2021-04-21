const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../../models/User');

/* Handle login info posted from form */
router.post('/', (req, res) => {

    console.log("Request body: ", req.body);

    const loginInfo = {
        email: req.body.email,
        password: req.body.password
    }

    // 1. Check if user with this email exists
    User.findOne({ email: loginInfo.email }, (err, user) => {
        if (err)
            return console.error("Encountered an error when querying the DB: ", err);
        if (!user) {
            res.send({
                ...loginInfo,
                userNotFoundError: true
            });

            return console.error("Error in confirming sign in: email address was not found in the DB.");
        }

        // 2. check to see if the given password matches the one in the DB

        if (user.password === loginInfo.password) {
            res.send({
                ...loginInfo,
                success: true
            });
        }
        else {
            res.send({
                ...loginInfo,
                incorrectPasswordError: true
            });
            return console.error("Error in confirming sign in: password did not match the password in the DB");
        }

    });

});

module.exports = router;