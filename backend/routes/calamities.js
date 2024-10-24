const express = require('express');
const {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
} = require('../controllers/calamitiesController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('SUPERUSER'), createRecord);
router.get('/', authorizeAnyRoles('SUPERUSER', 'ADMIN', 'USER'), getRecords);
router.get('/:id', authorizeAnyRoles('SUPERUSER', 'ADMIN', 'USER'), getRecord);
router.put('/:id', authorizeAnyRoles('SUPERUSER', 'ADMIN'), updateRecord);
router.delete('/:id', authorizeAnyRoles('SUPERUSER'), deleteRecord);


module.exports = router;
