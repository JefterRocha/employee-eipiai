const { Employee } = require('../model')

function index(req, res, next) {
	res.json({ title: 'employee API' })
}

function create(req, res, next) {
	const { name, phoneNumber, age } = req.body
	const newEmployee = new Employee({ name, phoneNumber, age })
	newEmployee.save(err => {
		if (err) {
			res.status(500).json({ error: err.message })
			res.end()
			return
		}
		res.json(newEmployee)
		res.end()
	})
}

function readAll(req, res, next) {
	Employee.find({}).lean().exec((e, docs) => {
		res.json(docs)
		res.end()
	})
}

function readOne(req, res, next) {
	Employee.findOne({ _id: req.params.id }).lean().exec((e, docs) => {
		res.json(docs)
		res.end()
	})
}

function update(req, res, next) {
	const { name, phoneNumber, age } = req.body
	Employee.findOneAndUpdate(
		{ _id: req.params.id },
		{ name, phoneNumber, age },
		{ upsert: true },
		(err, doc) => {
			if (err) {
				res.status(500).json({ error: err.message })
				res.end()
				return
			}
			res.json(req.body)
			res.end()
		}
	)
}

function destroy(req, res, next) {
	Employee.find({ _id: req.params.id }).remove(err => {
		if (err) {
			res.status(500).json({ error: err.message })
			res.end()
			return
		}
		res.json({ success: true })
		res.end()
	})
}

module.exports = { index, create, readAll, readOne, update, destroy }
