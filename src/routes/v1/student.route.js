const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const studentValidation = require('../../validations/student.validation');
const studentController = require('../../controllers/student.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(studentValidation.createStudent), studentController.createStudent)
  .get(validate(studentValidation.getStudents), studentController.getStudents);

router
  .route('/:studentId')
  .patch(validate(studentValidation.updateStudent), studentController.updateStudent)
  .delete(validate(studentValidation.deleteStudent), studentController.deleteStudent);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management and retrieval
 */

/**
 * @swagger
 * paths:
 *  /students:
 *    post:
 *      summary: Create a student
 *      description: Only admins can create other student.
 *      tags: [Students]
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
 *                - email
 *                - city
 *                - address
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                gender:
 *                  type: string
 *                  enum: [MALE, FEMALE, OTHER]
 *                city:
 *                  type: string
 *                address:
 *                  type: string
 *                phone:
 *                  type: string                  
 *              example:
 *                name: Phuoc Huynh
 *                email: phuochuynh@example.com
 *                gender: MALE
 *                city: Danang
 *                address: Hoa Minh, Lien Chieu, Danang
 *                phone: 0905551234
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Student'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all students
 *      description: Only admins can retrieve all students.
 *      tags: [Students]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: city
 *          schema:
 *            type: string
 *          description: Student's city
 *        - in: query
 *          name: address
 *          schema:
 *            type: string
 *          description: Student's address
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Student's name
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
 *          description: Maximum number of users
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
 *                      $ref: '#/components/schemas/Student'
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
 *  /students/{id}:
 *    patch:
 *      summary: Update a user
 *      tags: [Students]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Student's id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                city: 
 *                  type: string
 *                address: 
 *                  type: string
 *                phone: 
 *                  type: string
 *                gender: 
 *                  type: string
 *                  enum: [MALE, FEMALE, OTHER]
 *              example:
 *                name: Phuoc Huynh
 *                email: phuochuynh@example.com
 *                gender: MALE
 *                city: Danang
 *                address: Hoa Minh, Lien Chieu, Danang
 *                phone: 0905551234
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Student'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a student
 *      tags: [Students]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Student id
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

