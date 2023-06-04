const express = require("express");

const router = express.Router();

// importing the CRUD logic

// getting all to-do's
router.get("/", () => {});

// get to-do by id
router.get("/:id", () => {});

// create a new to-do
router.post("/", () => {});

// update to-do
router.patch("/", () => {});

// delete to-do
router.delete("/", () => {});

module.exports = router;
