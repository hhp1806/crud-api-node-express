const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    department: Joi.string().required(),
    faculty: Joi.string().required(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    name: Joi.string(),
    department: Joi.string(),
    faculty: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourse,
  getCourses,
  deleteCourse
};