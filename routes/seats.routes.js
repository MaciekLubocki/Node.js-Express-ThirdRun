const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
}
);

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.filter((unit) => unit.id == req.params.id));
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email} = req.body;

if(!db.seats.some(item => item.day == day && item.seat == seat)) {

  const data = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client : client,
    email: email,
    message: "posted",
  };
  res.json(db.seats.push(data));
}else {
  res.status(409).json({message:'The slot has been alreade taken'})
};
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
  req.io.emit('seatsUpdated', db.seats)
});

module.exports = router;
