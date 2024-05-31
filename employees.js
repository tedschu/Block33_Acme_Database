const express = require("express");
const router = express.Router();
const pg = require("pg");

const client = new pg.Client("postgres://localhost/AcmeHR");
client.connect();

// Grabs all employees in table
router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM employees ORDER BY id ASC`
    );
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

// Adds an employee to the table
router.post("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO employees(name, department_id) VALUES($1, $2)`,
      [req.body.name, req.body.department_id]
    );
    res.send({
      name: req.body.name,
      department_id: req.body.department_id,
    });
  } catch (err) {
    next(err);
  }
});

// Deletes an employee from the table
router.delete("/:id", async (req, res, next) => {
  try {
    const response = await client.query(`DELETE FROM employees WHERE id=$1`, [
      Number(req.params.id),
    ]);
    res
      .send({
        id: req.params.id,
      })
      .sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// Updates a row in the employees table
router.put("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `UPDATE employees SET name=$1, department_id=$2, updated_at=now() WHERE id=$3 RETURNING *`,
      [req.body.name, req.body.department_id, Number(req.params.id)]
    );
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
    res.send(err);
  }
});

module.exports = router;
