const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');


const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teacherSchema.plugin(toJSON);
teacherSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The teacher's email
 * @param {ObjectId} [excludeTeacherId] - The id of the teacher to be excluded
 * @returns {Promise<boolean>}
 */
teacherSchema.statics.isEmailTaken = async function (email, excludeTeacherId) {
  const teacher = await this.findOne({ email, _id: { $ne: excludeTeacherId } });
  return !!teacher;
};


/**
 * @typedef Teacher
 */
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
