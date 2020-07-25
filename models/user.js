const crypto = require('crypto');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required.'],
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'role must be user or admin',
    },
    default: 'user',
  },
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: '({VALUE}): not a validate email.',
    },
    required: [true, 'email is required.'],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is requried.'],
    minlength: 4,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'you need to confirm your password'],
    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'passwords do not match.',
    },
  },
  photo: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordRestExpiresIn: Date,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  next();
});

userSchema.pre('save', function (next) {
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.isPassChangedAfterJWTcreation = function (iat) {
  if (this.passwordChangedAt) {
    const passChangedAtInSec = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return iat < passChangedAtInSec;
  }
  return false;
};

userSchema.methods.createResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordRestExpiresIn = Date.now() + 10 * 60 * 1000;

  await this.save({ validateBeforeSave: false });

  return resetToken;
};

userSchema.methods.cancelPasswordReset = async function () {
  this.passwordResetToken = undefined;
  this.passwordRestExpiresIn = undefined;

  await this.save({ validateBeforeSave: false });
};

userSchema.methods.isExpiredResetToken = function () {
  return this.passwordRestExpiresIn < Date.now();
};

userSchema.methods.resetPassword = async function (password, passwordConfirm) {
  this.password = password;
  this.passwordConfirm = passwordConfirm;

  this.passwordRestExpiresIn = undefined;
  this.passwordResetToken = undefined;

  return await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
