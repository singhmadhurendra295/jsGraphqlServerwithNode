const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', userSchema);