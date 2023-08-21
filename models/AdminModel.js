const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: [true, `Please provide email`] },
  password: { type: String, required: [true, `Please provide password`] },
  role: { type: String, default: `admin` },
});

AdminSchema.pre(`save`, async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (incomingPassword) {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model(`admin`, AdminSchema);
