'use strict';
var router = require('express').Router();
module.exports = router;
let Company = require('../../../db/models/company'),
Job = require('../../../db/models/job'),
User = require('../../../db/models/user'),
check = require('../check-handler');

router.param('id', function(req, res, next, id){
	Company.findOne({
		where:{
			id: id
		}, //we'll figure this out later
		include: [
		{ model: Job, as: 'jobs'},
		{ model: User, as: 'employee'},
		]
	})
	.then(function(company){
		req.requestedCompany = company;
		next();
	})
	.catch(next);
});

//what would the admin route look like
router.get('/:id', check.company, function(req, res, next) {
	req.requestedCompany.reload()
	.then(function(company){
		res.send(company)
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	Company.create(req.body)
	.then(function(company){
		res.status(201);
		res.send(company)
	})
	.catch(next);
});

router.put('/:id', function(req, res, next) {
	req.requestedCompany.update(req.body)
	.then(function (user) {
		res.status(204)
		res.send(user);
	})
	.catch(next);
})