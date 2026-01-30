import express from "express";
import session from "express-session";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* DATABASE */
const db = await open({
  filename: "./db/database.db",
  driver: sqlite3.Database
});

/* MIDDLEWARE */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.set("view engine", "ejs");

/* AUTH GUARD */
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect("/login");
  next();
}

/* LOGIN AND REGISTER */
/* REGISTER */
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("register", { error: "All fields required" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    await db.run(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      username,
      hash
    );
  } catch (err) {
    return res.render("register", { error: "Username already exists" });
  }

  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE username = ?",
    username
  );

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.render("login", { error: "Invalid credentials" });
  }

  req.session.userId = user.id;
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

/* MAIN PAGE */
app.get("/", requireLogin, async (req, res) => {
  const tasks = await db.all(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
    req.session.userId
  );

  res.render("index", { tasks });
});

/* TASKS */
app.post("/tasks", requireLogin, async (req, res) => {
  const { title, due_date, priority } = req.body;

  await db.run(
    `INSERT INTO tasks (title, due_date, priority, user_id)
     VALUES (?, ?, ?, ?)`,
    title,
    due_date || null,
    priority,
    req.session.userId
  );

  res.redirect("/");
});

app.post("/tasks/:id/toggle", requireLogin, async (req, res) => {
  await db.run(
    `
    UPDATE tasks
    SET completed_at =
      CASE WHEN completed_at IS NULL
      THEN datetime('now')
      ELSE NULL END
    WHERE id = ? AND user_id = ?
    `,
    req.params.id,
    req.session.userId
  );

  res.sendStatus(200);
});

app.post("/tasks/:id/delete", requireLogin, async (req, res) => {
  await db.run(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    req.params.id,
    req.session.userId
  );

  res.sendStatus(200);
});

app.post("/tasks/:id/edit", requireLogin, async (req, res) => {
  const { title, due_date, priority } = req.body;

  await db.run(
    `
    UPDATE tasks
    SET title = ?, due_date = ?, priority = ?
    WHERE id = ? AND user_id = ?
    `,
    title,
    due_date || null,
    priority,
    req.params.id,
    req.session.userId
  );

  res.sendStatus(200);
});

/* STATS API */
app.get("/api/stats", requireLogin, async (req, res) => {
  const monthly = await db.all(
    `
    SELECT
      strftime('%m', completed_at) AS month,
      strftime('%Y', completed_at) AS year,
      COUNT(*) AS count
    FROM tasks
    WHERE completed_at IS NOT NULL AND user_id = ?
    GROUP BY year, month
    ORDER BY year, month
    `,
    req.session.userId
  );

  const yearly = await db.all(
    `
    SELECT
      strftime('%Y', completed_at) AS year,
      COUNT(*) AS count
    FROM tasks
    WHERE completed_at IS NOT NULL AND user_id = ?
    GROUP BY year
    ORDER BY year
    `,
    req.session.userId
  );

  res.json({ monthly, yearly });
});

/* SERVER */
app.listen(PORT, () =>
  console.log(`✅ TaskFlow running at http://localhost:${PORT}/login`)
);
