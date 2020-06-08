const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const employee = require('./scheme/employee.scheme')

const employeeSchema = new mongoose.Schema(employee)

module.exports = {
    Employee: mongoose.model('employees', employeeSchema)
}
