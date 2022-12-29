const mongoose = require("mongoose")
const Schema = mongoose.Schema

//List of columns for Users schema
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    timestamp: {
      type: String,
      default: Date.now()
    },
    gender: {
      type: String,
      required: true,
      enum: [
        "Female",
        "Male",
        "Gender-fluid",
        "Transgender",
        "Non-binary",
      ],
      default: "Female",
    },
  },
  { collection: "users" }
)
const User = mongoose.model(
  "User",
  UserSchema
)

module.exports = User
