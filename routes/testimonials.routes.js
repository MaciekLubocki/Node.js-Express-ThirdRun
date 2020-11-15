const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials/:id").get((req, res) => {
  res.json(db.testimonials.filter((unit) => unit.id == req.params.id));
});

router.route("/testimonials/random").get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;

  const data = {
    id: uuidv4(),
    author: author,
    text: text,
    message: "posted",
  };
  res.json(data);
});

router.route("/testimonials/:id").put((req, res) => {
  const { id, author, text } = req.body;
  res.json(
    db.testimonials.map(
      (unit) =>
        unit.id == id && { ...unit, author: author, text: text, message: "PUT" }
    )
  );
});

router.route("/testimonials/:id").delete((req, res) => {
  res.json(
    db.testimonials.filter((unit) => unit.id !== req.params.id) && {
      message: "Deleted",
    }
  );
});

module.exports = router;
