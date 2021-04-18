const express = require('express');
const router = express.Router();

const User = require('../models/User');

/* Handle user info posted from form */
router.post('/', (req, res) => {

  console.log("Request body: ", req.body);

  const userInfo = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }

  // 1. Check if User with this email already exists and if so send an error
  User.findOne({ email: req.body.email }, (err, result) => {
    if (err)
      return console.error("Encountered an error when querying the DB: ", err);
    if (result) {
      userExistsError = "Account already exists with this email. Please sign in."
      res.send({
        ...req.body,
        userExistsError
      })
      return console.error("Error saving user to the database: A user with this email already exists.");
    }
    
    // 2. Create new User
    const user = new User(userInfo);

    // 3. Save new User to DB
    user.save()
    .then(() => {
      res.send({
        ...req.body,
      });
    }).catch(err => {
      if (err) {
        console.log("there was error");
        res.send({
          ...req.body,
          errors: err.errors
        });
        return console.error(err);
      }
    });

    // 4. Send back the request along with potential errors
    // res.send({
    //   ...req.body,
    //   emailError: emailError,
    //   pwError: pwError,
    //   userError: userError

    // });

  })

      


});

module.exports = router;
