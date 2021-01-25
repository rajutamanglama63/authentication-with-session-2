const express = require("express");
const { ensureAuthentication } = require("../config/auth");


const router = express.Router();

router.get('/', (req, res) => {
    res.render("landing");
});


router.get('/dashbord', ensureAuthentication, (req, res) => {
    res.render("dashbord", {
        name: req.user.name
    });
});

module.exports = router;