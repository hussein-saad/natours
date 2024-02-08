const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'Email already exists'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guid', 'lead-guid'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  photo: {
    type: String,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  // - 1 second to make sure the token is created after the password is changed
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  correctPassword,
) {
  return await bcrypt.compare(candidatePassword, correctPassword);
};

userSchema.methods.isPasswordChanged = function (JWTTimestamp) {
  if (!this.passwordChangedAt) {
    return false;
  }

  const passwordChangedTimestamp = this.passwordChangedAt.getTime() / 1000;

  return passwordChangedTimestamp > JWTTimestamp;
};

userSchema.methods.createResetTokenPassword = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 5 * 60 * 1000;

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
