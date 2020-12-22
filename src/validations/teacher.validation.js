const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTeacher = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    department: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required().valid('MALE', 'FEMALE', 'OTHER'),
    phone: Joi.string(),
  }),
};

const getTeachers = {
  query: Joi.object().keys({
    department: Joi.string(),
    address: Joi.string(),
    teacherId: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};

const updateTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      department: Joi.string().required(),
      address: Joi.string().required(),
      gender: Joi.string().required().valid('MALE', 'FEMALE', 'OTHER'),
      phone: Joi.string(),
    })
    .min(1),
};

const deleteTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher
};