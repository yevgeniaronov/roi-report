const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 4000;
const path = require("path");
app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/companies", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./mock/companies.json"))
  );
  res.json(data);
});

app.get("/api/performance/countries", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./mock/performance/countries.json"))
  );
  res.json(data);
});

app.get("/api/performance/countries/company/:id", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `./mock/performance/countries/company_${req.params.id}.json`
      )
    )
  );
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
