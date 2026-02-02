const mongoose = require("mongoose");
const UserSchema = require("../schemas/UserSchema"); 

// Register the model
const User = mongoose.model("User", UserSchema);

module.exports = User;
