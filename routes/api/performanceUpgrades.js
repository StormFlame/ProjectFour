const express = require('express');
const router = express.Router();
const performanceUpgradesCtrl = require('../../controllers/performanceUpgrades');
const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post('/cars/:id/performanceUpgrades', performanceUpgradesCtrl.create);
router.delete('/performanceUpgrades/:id', performanceUpgradesCtrl.delete);



/*---------- Protected Routes ----------*/




module.exports = router;