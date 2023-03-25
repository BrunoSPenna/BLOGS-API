const express = require('express');
const {
    allPostsController,
    getOnePostController,
    getSearchPostController,
    putPostController,
    deletePostController,
    postPostController,
} = require('../controllers/post.controller');
const validateJWT = require('../middlewares/validateJWT');
const { validateUserFromPost,
    validateCampus, validatePostId,
    validateCampusCategoryIds } = require('../middlewares/validatePost');

const router = express.Router();

router.get('/', validateJWT, allPostsController);
router.post('/', validateJWT, validateCampus, validateCampusCategoryIds, postPostController);
router.get('/search', validateJWT, getSearchPostController);
router.get('/:id', validateJWT, getOnePostController);
router.put('/:id', validateJWT, validateUserFromPost, validateCampus, putPostController);
router.delete('/:id', validateJWT, validatePostId, validateUserFromPost, deletePostController);

module.exports = router;