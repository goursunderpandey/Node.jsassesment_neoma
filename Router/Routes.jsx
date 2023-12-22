const express = require("express");
const { AddNews, GetNews, GetNewsId ,UpdateNews ,deleteNews ,SearchNews ,FilterNews } = require("../Controllers/Controllers.jsx");
const router = express.Router();
router.use(express.json());

router.post("/Addnews", AddNews);
router.get("/GetNews", GetNews);
router.get("/GetNews/:id", GetNewsId);
router.put("/GetNews/:id", UpdateNews);
router.delete("/GetNews/:id", deleteNews);
router.get("/GetNews/search",SearchNews);
router.get("/GetNews/:category" ,FilterNews);




module.exports = router;