const express = require('express');
const {handleGenerateURL,handleGetAnanlyti} = require('../controllers/url');


const router = express.Router();

router.post("/", handleGenerateURL);

router.get("/analytics/:shortId",handleGetAnanlyti);
module.exports = router;