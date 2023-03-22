const express = require('express');
const { userController, allUsersController, userByIdController,     
} = require('../controllers/user.controller');

const { validateEmail, validateName, validatePassword, validateUserId,
} = require('../middlewares/validateUser');

const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', validateJWT, allUsersController);
router.get('/:id', validateJWT, validateUserId, userByIdController);

router.post('/', validateEmail,
validateName,
validatePassword, userController);

module.exports = router;