const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee.controller')

/* GET home page. */
router.get('/', employeeController.index)

/* GET ALL employee. */
router.get('/employees', employeeController.readAll)

/* GET ONE employee. */
router.get('/employees/:id', employeeController.readOne)

/* POST ONE post. */
router.post('/employees/', employeeController.create)

/* PUT ONE post. */
router.put('/employees/:id', employeeController.update)

/* DELETE ONE post. */
router.delete('/employees/:id', employeeController.destroy)

module.exports = router
