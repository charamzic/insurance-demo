const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world from the home of this insurance mothafocka');
});

module.exports = router;