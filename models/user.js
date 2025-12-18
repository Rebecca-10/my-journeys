const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   
    
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        
    },
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
   
    
    password: {
        type: String,
        required: true,
    },

    trips: [tripSchema]

})

const User = mongoose.model('User', userSchema)

module.exports = User
