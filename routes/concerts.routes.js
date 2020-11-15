const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// get all posts
router.route("/posts").get((req, res) => {
  res.json(db.posts);
});

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
  res.json(db.concerts.filter((unit) => unit.id == req.params.id));
});

router.route("/concerts").post((req, res) => {
  const { author, text } = req.body;

  const data = {
    id: uuidv4(),
    author: author,
    text: text,
    message: "posted",
  };
  res.json(data);
});

router.route("/concerts/:id").delete((req, res) => {
  res.json(
    db.concerts.filter((unit) => unit.id !== req.params.id) && {
      message: "Deleted",
    }
  );
});

router.route("/concerts/:id").put((req, res) => {
  const { id, author, text } = req.body;
  res.json(
    db.concerts.map(
      (unit) =>
        unit.id == id && { ...unit, author: author, text: text, message: "PUT" }
    )
  );
});

module.exports = router;
