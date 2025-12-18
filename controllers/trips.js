// controllers/trips.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
router.get('/', async(req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('trips/index.ejs',{
     trips: currentUser.trips,
    });

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('trips/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // trips array of the current user
    currentUser.trips.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the trips index view
    res.redirect(`/users/${currentUser._id}/trips`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
