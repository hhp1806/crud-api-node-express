const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createStudent = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required().valid('MALE', 'FEMALE', 'OTHER'),
    phone: Joi.string(),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    city: Joi.string(),
    address: Joi.string(),
    studentId: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      gender: Joi.string().required().valid('MALE', 'FEMALE', 'OTHER'),
      phone: Joi.string(),
    })
    .min(1),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};