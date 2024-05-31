const express = require("express");

const app = express();
app.use(express.json());

const baseQuery = `/api/`;

app.get(baseQuery, (res, req) => {
  res.json({
    success: true,
  });
});

app.use(baseQuery + "employees", require("./employees"));
app.use(baseQuery + "departments", require("./departments"));

app.listen(8080, () => {
  console.log("app is running on port 8080");
});
