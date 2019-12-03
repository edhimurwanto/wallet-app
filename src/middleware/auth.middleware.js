const sessionChecker = (req, res, next) => {

    if (!req.session.user && !req.cookies.foo) {
        res.status(401).json({ message: 'You are not login.' });
    } else {
        next();
    }
};

export default sessionChecker;