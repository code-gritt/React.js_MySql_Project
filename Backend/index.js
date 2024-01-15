import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.use(cors());
app.use(express.json());
app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.test";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    res.json(data);
  });
});

app.post("/books", (req, res) => {
  //   const a =
  //     "INSERT INTO `test`.`test` (`id`, `title`, `desc`, `cover`) VALUES ('2', 'cover title 2', 'desc 2', '2cover.png')";
  const a =
    "INSERT INTO `test`.`test` (`id`, `title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.id, req.body.title, req.body.desc, req.body.cover];
  db.query(a, [values], (err, data) => {
    if (err) return res.json(err);

    res.json("Book has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("server is running");
});
