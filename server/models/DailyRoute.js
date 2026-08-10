const mongoose = require('mongoose');

const dailyRouteSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true,
    trim: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  departure: {
    location: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  arrival: {
    location: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  // Specific seat numbers that are booked/unavailable (admin controlled)
  bookedSeats: {
    type: [Number],
    default: []
  },
  stops: [String],
  amenities: [String],
  description: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('DailyRoute', dailyRouteSchema);
