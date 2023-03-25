const PostsService = require('../services/post.service');
const getUser = require('../middlewares/getUserByToken');

const allPostsController = async (_req, res) => {
    const { status, response } = await PostsService.getAllBlogPost();
    res.status(status).json(response);
};

const getOnePostController = async (req, res) => {
    const postId = req.params.id;
    const { status, response } = await PostsService.getOneBlogPost(postId);
    res.status(status).json(response);
};

const getSearchPostController = async (req, res) => {
    const { q } = req.query;
    if (q.length === 0) {
        const { status, response } = await PostsService.getAllBlogPost();
        return res.status(status).json(response);
      }
    const { status, response } = await PostsService.getPostByTitleOrContent(q);
    res.status(status).json(response);
};

const putPostController = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const { status, response } = await PostsService.updatePost(title, content, postId);
    return res.status(status).json(response);
};

const postPostController = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const token = req.header('Authorization');
    const userId = getUser(token);
    const { status, response } = await PostsService.insertPost(title, content, userId, categoryIds);
    return res.status(status).json(response);
};

const deletePostController = async (req, res) => {
    const postId = req.params.id;
    await PostsService.deletePost(postId);
    return res.status(204).json();
};

module.exports = {
allPostsController,
getOnePostController,
getSearchPostController,
putPostController,
deletePostController,
postPostController,
};