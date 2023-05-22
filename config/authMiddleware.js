export const authenticate = (req, res, next) => {
    const loggedAs = req.cookies.loggedAs;

    if (loggedAs) {
        console.info('Verifying the user...');
        next();
    } else {
        res.redirect('/');
    }
}

export const checkUser = (req, res, next) => {
    const loggedAs = req.cookies.loggedAs;

    if (loggedAs) {
        res.locals.user = loggedAs;
        next();
    } else {
        res.locals.user = null;
        next();
    }
}