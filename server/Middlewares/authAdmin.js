const User = require("../Modals/user");

const authAdmin = async (req, res, next) => {
    try {
        const user = req.user.user
        const role = await User.findOne({ _id: user._id });
        if (role.role !== 1 && role.role !== 2) {
            return res.status(400).json({ message: "Admin resources access denied!" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = authAdmin;
