const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
		first_name: {
				type: String,
				trim: true,
				required: "Username is Required"
		},
		last_name: {
				type: String,
				required: "Last name is Required"
		},
		email: {
				type: String,
				unique: true,
				match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
		},
		password: {
				type: String,
				trim: true,
				required: "Password is Required",
				validate: [
						function (input) {
								return input.length >= 6;
						},
						"Password should be longer."
				]
		}
});

UserSchema.methods.comparePassword = function (inputPass) {
		return bcrypt.compareSync(inputPass, this.password);
};

UserSchema.pre("save", function (next) {
		if (!this.isModified("password")) return next();
		this.password = bcrypt.hashSync(this.password, 10);
		return next();
});

module.exports = mongoose.model("User", UserSchema);
