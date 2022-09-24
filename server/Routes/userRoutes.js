const express = require('express');
const userCtrl = require('../Controllers/userCtrl')
const loginCtrl = require('../Controllers/loginCtrl');
const auth = require('../Middlewares/auth');
const authAdmin = require('../Middlewares/authAdmin');
const router = require('express').Router()
const mail = require('../Services/NewMail')

router.get('/all/users', auth, authAdmin, userCtrl.getUser)
router.post('/send/otp', userCtrl.sendOTP)
router.post('/post', userCtrl.postVerifiedUser)
router.patch('/update/:id', auth, authAdmin, userCtrl.updateUser)
router.patch('/approve/:id', userCtrl.approveUser)
router.patch('/updatepwd/:id', auth, userCtrl.updatePassword)
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)
router.post('/login/otp', loginCtrl.sendLoginOTP)
router.post('/login/verify', loginCtrl.login)
router.post('/myallusers', mail)
module.exports = router