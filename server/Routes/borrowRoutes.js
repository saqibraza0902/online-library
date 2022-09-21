const express = require('express');
const router = express.Router();
const borrowCtrl = require('../Controllers/borrowCtrl');
const auth = require('../Middlewares/auth');
const authAdmin = require('../Middlewares/authAdmin');

router.get('/all/borrows', auth, borrowCtrl.getBorrow)
router.post('/user/borrow', auth, borrowCtrl.getUserBorrow)
router.post('/post', auth, borrowCtrl.postBorrow)
router.patch('/approve/:id', auth, authAdmin, borrowCtrl.approveBorrow)
router.delete('/delete/:id', auth, authAdmin, borrowCtrl.DisapproveBorrow)
router.patch('/update/:id', auth, authAdmin, borrowCtrl.ReturnBorrow)
router.delete('/delete/borrow/:id', auth, borrowCtrl.DeleteBorrow)

module.exports = router