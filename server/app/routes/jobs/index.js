'use strict';
var router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;

let db = require('../../../db'),
    check = require('../check-handler')

const Job = db.model('job'),
    Apps = db.model('application'),
    JobDescription = db.model('job_description'),
    JobApplication = db.model('job_application'),
    Stage = db.model('stage');


router.param('id', function(req, res, next, id) {
    Job.findOne({
            where: {
                id: id
            },
            include: [
                { model: JobApplication, as: 'jobApplication' },
                { model: JobDescription, as: 'jobDescription' },
                { model: Stage, as: 'stage' }
            ]
        })
        .then(function(job) {
            req.requestedJob = job;
            next();
        })
        .catch(next);
});

//Im having a massive brain fart on what data from where should be send to the front
router.get('/:id/apps', function(req, res, next) {
    Job.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: Apps, as: 'apps' },
            ]
        })
        .then(function(desc) {
            res.send(desc)
        })
        .catch(next);
});

//get one job
router.get('/:id', function(req, res) {
    res.send(req.requestedJob);
});

router.get('/', function(req, res, next) {
    Job.findAll({
            include: [
                { model: JobApplication, as: 'jobApplication' },
                { model: JobDescription, as: 'jobDescription' },
            ]
        })
        .then(function(desc) {
            res.send(desc)
        })
        .catch(next);
})


router.post('/', function(req, res, next) {
    Job.create(req.body)
        .then(function(desc) {
            res.status(201);
            res.send(desc);
        })
        .catch(next);
});

router.get('/:jobId/apps', function(req, res, next) {
    Apps.get({
        where: {
            jobId: req.params.jobId
        }
    })
    .then(function(apps){
        res.status(200)
        res.send(apps)
    })
    .catch(next);
})

router.put('/:id', function(req, res, next) {
    req.requestedJob.update(req.body)
        .then(function(desc) {
            res.send(desc);
        })
        .catch(next);
});

router.delete('/:id', check.pageAdmin || check.admin, function(req, res, next) {
    req.requestedJob.destroy()
        .then(function() {
            res.status(204).end();
        })
        .catch(next);
});

router.put('/stages/:jobId', check.pageAdmin || check.admin, function(req, res, next) {
    Stage.destroy({
      where: {
        jobId: req.params.jobId
      }
    })
    .then(function() {
      return Promise.each(req.body, function(stage) {
        Stage.create(stage)
      })
    })
    // .then(function() {
    //   var stages = req.body.map(stage => Stage.create(stage))

    //   return Promise.all(stages)
    // })

    .then(function(newStages) {
      res.status(201)
      res.send(newStages)
    })
    .catch(next)
})
