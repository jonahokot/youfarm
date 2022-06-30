const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

const ManagerSchema = new mongoose.Schema({
  name: { type: String, trim:true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
});

// Export Model
ManagerSchema.plugin(passportLocalMongoose, { usernameField: "email" }); 
module.exports = mongoose.model("Manager", ManagerSchema);
