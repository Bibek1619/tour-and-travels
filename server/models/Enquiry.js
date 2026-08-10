const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    numberOfPeople: {
      type: Number,
      default: 1,
    },
    comment: {
      type: String,
      trim: true,
    },
    // Reference info about what the enquiry is for
    packageName: {
      type: String,
      trim: true,
    },
    packageType: {
      type: String,
      default: 'tour',
    },
    packageId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
