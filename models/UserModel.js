const mongoose = require(`mongoose`);
const validator = require(`validator`);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, `Please provide email`],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: `Please provide valid email`,
      },
    },
    preferredBlockchain: {
      type: String,
      required: [true, `Please provide preferred blockchain`],
    },
    projectSuggestion: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(`User`, UserSchema);
