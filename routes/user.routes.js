const express = require('express');
const router = express.Router();
const fileUploader = require('../middlewares/cloudinary.middleware');
const { checkFields, checkFieldsEdit } = require('../middlewares/auth-guard');
const { isLoggedIn, checkRole, ADMINorOwn } = require('../middlewares/route-guard');
const { getUsersList, getProfileEdit, postProfileEdit, getUserProfile, deleteUser, changeRole } = require('../controllers/user.controller');

router.get('/list', isLoggedIn, getUsersList)
router.get('/profile/edit/:id', isLoggedIn, ADMINorOwn, getProfileEdit)
router.post('/profile/edit/:id', fileUploader.single('avatar'), checkFieldsEdit, isLoggedIn, ADMINorOwn, postProfileEdit)
router.get('/profile/:id', isLoggedIn, getUserProfile);
router.post('/delete/:id', isLoggedIn, checkRole('ADMIN'), deleteUser)
router.post('/:role/:id', isLoggedIn, checkRole('ADMIN'), changeRole)

module.exports = router