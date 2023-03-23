const express = require('express');
const {
    categoryController,
    getCategoryController,
} = require('../controllers/category.controller');
const validateJWT = require('../middlewares/validateJWT');
const { validateName } = require('../middlewares/validateCategory');

const router = express.Router();

router.post('/', validateJWT, validateName, categoryController);
router.get('/', validateJWT, getCategoryController);

module.exports = router;