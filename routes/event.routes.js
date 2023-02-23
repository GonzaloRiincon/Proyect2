const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole, ADMINorOwn } = require('../middlewares/route-guard');
const { getFutureRaces, getFinishedRaces, getCreateEvent, postCreateEvent, deleteEvent, finishEvent } = require('../controllers/event.controller');

router.get('/list', isLoggedIn, getFutureRaces)
router.get('/finished', isLoggedIn, getFinishedRaces)
router.get('/create', isLoggedIn, checkRole('ADMIN', 'EDITOR'), getCreateEvent)
router.post('/create', isLoggedIn, checkRole('ADMIN', 'EDITOR'), postCreateEvent)
router.post('/delete/:eventId', isLoggedIn, checkRole('ADMIN', 'EDITOR'), deleteEvent)
router.post('/finish/:eventId', isLoggedIn, checkRole('ADMIN', 'EDITOR'), finishEvent)

module.exports = router