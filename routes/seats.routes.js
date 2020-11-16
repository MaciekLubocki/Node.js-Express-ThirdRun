const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.filter((unit) => unit.id == req.params.id));
});

router.route("/seats").post((req, res) => {
  const { author, text } = req.body;

  const data = {
    id: uuidv4(),
    author: author,
    text: text,
    message: "posted",
  };
  res.json(data);
});

router.route("/seats/:id").delete((req, res) => {
  res.json(
    db.seats.filter((unit) => unit.id !== req.params.id) && {
      message: "Deleted",
    }
  );
});

router.route("/seats/:id").put((req, res) => {
  const { id, author, text } = req.body;
  res.json(
    db.seats.map(
      (unit) =>
        unit.id == id && { ...unit, author: author, text: text, message: "PUT" }
    )
  );
});

module.exports = router;
