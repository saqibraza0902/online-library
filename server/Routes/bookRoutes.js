const express = require('express');
const router = express.Router();
const bookCtrl = require('../Controllers/bookCtrl');
const auth = require('../Middlewares/auth');
const authAdmin = require('../Middlewares/authAdmin');

router.get('/all/books', auth, bookCtrl.getBooks)
router.post('/post', auth, authAdmin, bookCtrl.postBook)
router.patch('/update/:id', auth, authAdmin, bookCtrl.updateBook)
router.patch('/delete/request/:id', bookCtrl.DeleteRequest)
router.patch('/restore/:id', bookCtrl.restoreBook)
router.delete('/delete/:id', auth, authAdmin, bookCtrl.deleteBook)

module.exports = router