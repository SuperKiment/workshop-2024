// Importer les modules nécessaires
import express from "express";
import mysql from "mysql2/promise"; // Version avec promesses
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import dbConfig from "./config.js";

// Configurer l'application Express
const app = express();
app.use(express.json()); // Middleware pour parser les requêtes en JSON

// Créer une connexion MySQL avec mysql2
const db = await mysql.createConnection(dbConfig);

// Vérifie la connexion à la base de données
try {
  await db.connect();
  console.log("Connecté à la base de données MySQL");
} catch (err) {
  console.error("Erreur de connexion à la base de données :", err);
}

// Configurer Passport avec la stratégie locale
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Chercher l'utilisateur dans la base de données
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (rows.length === 0) {
        return done(null, false, { message: "Utilisateur non trouvé" });
      }

      const user = rows[0];

      // Comparer les mots de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Mot de passe incorrect" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
/*
// Sérialiser et désérialiser les utilisateurs
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});
// Middleware pour Passport
app.use(passport.initialize());
*/

// Routes
// Inscription d'un utilisateur
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const [result] = await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

// Connexion d'un utilisateur
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.json({ message: "Connexion réussie", user: req.user });
  }
);

// Route pour récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Users");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Route pour mettre à jour un utilisateur
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "UPDATE Users SET username = ?, password = ? WHERE id = ?",
      [username, hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

// Route pour supprimer un utilisateur
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
});

app.get("/", async (req, res) => {
  res.json({ "coucou": "yes" });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});
