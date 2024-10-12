const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('superuser'), createUser);
router.get('/', authorizeAnyRoles('superuser', 'admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorizeAnyRoles('superuser'), deleteUser);


module.exports = router;
