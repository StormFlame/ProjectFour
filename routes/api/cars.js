const express = require('express');
const router = express.Router();
const carsCtrl = require('../../controllers/cars');
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post('/', upload.single('photo'),  carsCtrl.create);
router.delete('/:id', carsCtrl.deleteCar);
router.get('/', carsCtrl.index);

/*---------- Protected Routes ----------*/




module.exports = router;