const UserService = require('../services/user.services');
const jwtUtils = require('../utils/createToken');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserService.getByEmail(email, password);
    const { password: _, ...userWithoutPassword } = user.dataValues;
    const token = jwtUtils.createToken(userWithoutPassword);
    res.status(200).json({ token });
};

module.exports = {
    loginController,
};