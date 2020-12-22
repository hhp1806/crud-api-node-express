const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teacherValidation = require('../../validations/teacher.validation');
const teacherController = require('../../controllers/teacher.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(teacherValidation.createTeacher), teacherController.createTeacher)
  .get(validate(teacherValidation.getTeachers), teacherController.getTeachers);

router
  .route('/:teacherId')
  .get(validate(teacherValidation.getTeacher), teacherController.getTeacher)
  .patch(validate(teacherValidation.updateTeacher), teacherController.updateTeacher)
  .delete(validate(teacherValidation.deleteTeacher), teacherController.deleteTeacher);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher management and retrieval
 */

/**
 * @swagger
 * paths:
 *  /teachers:
 *    post:
 *      summary: Create a teacher
 *      description: Only admins can create other teacher.
 *      tags: [Teachers]
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
 *                - department
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
 *                department:
 *                  type: string
 *                address:
 *                  type: string
 *                phone:
 *                  type: string                  
 *              example:
 *                name: Phuoc Huynh
 *                email: phuochuynh@example.com
 *                gender: MALE
 *                department: department
 *                address: Hoa Minh, Lien Chieu, Danang
 *                phone: 0905551234
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Teacher'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all teachers
 *      description: Only admins can retrieve all teachers.
 *      tags: [Teachers]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: department
 *          schema:
 *            type: string
 *          description: teacher's department
 *        - in: query
 *          name: address
 *          schema:
 *            type: string
 *          description: teacher's address
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: teacher's name
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
 *                      $ref: '#/components/schemas/Teacher'
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
 *  /teachers/{id}:
 *    get:
 *      summary: Get a teacher
 *      tags: [Teachers]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Teacher id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Teacher'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 * 
 *    patch:
 *      summary: Update a teacher
 *      tags: [Teachers]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Teacher's id
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
 *                department: 
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
 *                department: department
 *                address: Hoa Minh, Lien Chieu, Danang
 *                phone: 0905551234
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/teacher'
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
 *      summary: Delete a teacher
 *      tags: [Teachers]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Teacher id
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

