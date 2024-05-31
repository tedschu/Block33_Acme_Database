const express = require("express");
const router = express.Router();
const pg = require("pg");

const client = new pg.Client("postgres://localhost/AcmeHR");
client.connect();

router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM departments ORDER BY id ASC`
    );
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
