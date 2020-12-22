const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const courseValidation = require('../../validations/course.validation');
const courseController = require('../../controllers/course.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(courseValidation.createCourse), courseController.createCourse)
  .get(validate(courseValidation.getCourses), courseController.getCourses);

router
  .route('/:courseId')
  .delete(validate(courseValidation.deleteCourse), courseController.deleteCourse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Courses management and retrieval
 */

/**
 * @swagger
 * paths:
 *  /courses:
 *    post:
 *      summary: Create a course
 *      description: Only admins can create other course.
 *      tags: [Courses]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - department
 *                - faculty
 *              properties:
 *                name:
 *                  type: string
 *                department:
 *                  type: string
 *                faculty:
 *                  type: string                  
 *              example:
 *                name: name
 *                department: department
 *                faculty: faculty
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Course'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all courses
 *      description: Only admins can retrieve all courses.
 *      tags: [Courses]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: department
 *          schema:
 *            type: string
 *          description: Course's department
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of courses
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Course'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * paths:
 *  /courses/{id}:
 *    delete:
 *      summary: Delete a course
 *      tags: [Courses]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Course id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */