// controllers/trips.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
//index show all trips 
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

//new form to create my new trip 
router.get('/new', async (req, res) => {
  res.render('trips/new.ejs');
});

//create route i can add a new trip here
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

//show one trip
router.get('/:tripId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the applicationId supplied from req.params
    const trip = currentUser.trips.id(req.params.tripId);
    // Render the show view, passing the application data in the context object
    res.render('trips/show.ejs', {
      trip: trip,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});
 //form to edit mt trip 

router.get('/:tripId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const trip = currentUser.trips.id(req.params.tripId);
    res.render('trips/edit.ejs', { trip });
  } catch (error) {
    console.log(error);
    res.redirect('/users/' + req.session.user._id + '/trips');
  }
});

//update route, save edited trip 
router.put('/:tripId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const trip = currentUser.trips.id(req.params.tripId);
    trip.set(req.body); // update the trip fields
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/trips/${req.params.tripId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.session.user._id}/trips`);
  }
});

//delete remove my trip 
router.delete('/:tripId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.trips.pull(req.params.tripId);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/trips`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
