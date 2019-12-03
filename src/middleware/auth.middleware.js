const sessionChecker = (req, res, next) => {
    if (!req.session.foo && !req.cookies.foo) {
        res.sendStatus(401);
    } else {
        next();
    }    
};

export default sessionChecker;