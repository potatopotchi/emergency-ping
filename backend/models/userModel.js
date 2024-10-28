const mongoose = require("mongoose");
const validator = require("validator");
const { v4: uuid4 } = require("uuid");
const { checkPassword, hashPassword } = require("../core/utils");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fsUniquifier: {
      type: String,
      required: true,
      default: uuid4,
    },
    roles: [
      {
        type: String,
        enum: ["SUPERUSER", "ADMIN", "USER"],
      },
    ],
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    locationGroup: {
      type: Schema.Types.String,
      ref: "LocationGroup",
      required: true,
    },
    locationAddress: {
      type: String,
    },
    recentStatus: {
      type: Schema.Types.ObjectId,
      ref: "UserStatus",
    },
  },
  { timestamps: true }
);

if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret.__v;
  delete ret.password;
  delete ret.fsUniquifier;

  return ret;
};

userSchema.statics.validateThenCreate = async function (userData) {
  const { email, password } = userData;

  if (email && !validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    userData.password = await hashPassword(password);
    userData.fsUniquifier = uuid4();
  }

  const user = this.create({
    ...userData,
  });

  return user;
};

userSchema.statics.validateOneThenUpdate = async function (
  conditions,
  userData
) {
  const { password, oldPassword } = userData;

  let user = await this.findOne({ ...conditions });
  if (!user) {
    throw Error("User not updated");
  }

  if (password) {
    if (!oldPassword) {
      throw Error("Old password is required when changing password");
    }

    const match = await checkPassword(oldPassword, user.password);
    if (!match) {
      throw Error("Invalid old password");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    userData.password = await hashPassword(password);
    userData.fsUniquifier = uuid4();
  }

  user = this.findOneAndUpdate({ ...conditions }, { ...userData });

  return user;
};

module.exports = mongoose.model("User", userSchema);
