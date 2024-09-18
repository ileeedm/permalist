import express, { query } from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "159357",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];


app.get("/", async(req, res) => {
  
  const result = await db.query("SELECT * FROM items");

  result.rows.forEach((item) => {
    items.push(item);
   
  });
  console.log(items)
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
  items = [];
});

app.post("/add",async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1)",[item]);
 
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
