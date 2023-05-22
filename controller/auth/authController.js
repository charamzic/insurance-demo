import { User } from "../../model/User.js";

const getLogin = async (req, res) => {
    const username = req.params.name;

    const user = await User.login(username);

    res.cookie('loggedAs', user.name, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ user: user._id });

};

const getLogout = async (req, res) => {
    res.cookie('loggedAs', '', { maxAge: 1 });
    res.redirect('/');
}

export const authController = {
    getLogin, getLogout
}