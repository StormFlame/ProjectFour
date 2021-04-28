const express = require('express');
const router = express.Router();
const serviceCtrl = require('../../controllers/services');
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post('/', serviceCtrl.create);
router.get('/:id', serviceCtrl.index);


/*---------- Protected Routes ----------*/




module.exports = router;