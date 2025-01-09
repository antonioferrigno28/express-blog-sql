const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

// index
router.get("/", postsController.index);

// show
router.get("/:id", postsController.show);

//store (create)
router.post("/", postsController.store);

// update
router.put("/:id", postsController.update);

// destroy
router.delete("/:id", postsController.destroy);

module.exports = router;
