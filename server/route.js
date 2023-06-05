const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Ты мой мир!");
});


module.exports = router;