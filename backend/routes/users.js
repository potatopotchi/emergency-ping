const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getNearestPlaces
} = require('../controllers/usersController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('superuser'), createUser);
router.get('/', authorizeAnyRoles('superuser', 'admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorizeAnyRoles('superuser'), deleteUser);
router.get('/locations/nearest', getNearestPlaces);

module.exports = router;
