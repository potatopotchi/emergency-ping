const express = require('express');
const {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
} = require('../controllers/userStatusController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('SUPERUSER', 'ADMIN'), createRecord);
router.get('/', authorizeAnyRoles('SUPERUSER', 'ADMIN'), getRecords);
router.get('/:id', getRecord); // permission applied to item level
router.put('/:id', updateRecord); // permission applied to item level
router.delete('/:id', authorizeAnyRoles('SUPERUSER'), deleteRecord);


module.exports = router;
