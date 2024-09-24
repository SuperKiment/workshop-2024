// Importer les modules nécessaires
import express from "express";
import mysql from "mysql2/promise"; // Version avec promesses
import bcrypt from "bcryptjs";
import passport from "passport";
import dbConfig from "./config.js";
import path from "path";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import createPayload from "./fonctions/payload.js";
import jwt from "jsonwebtoken";
import cors from "cors"

// Configurer l'application Express
const app = express();
app.use(cors()); // Middleware pour parser les requêtes en JSON
app.use(express.json()); // Middleware pour parser les requêtes en JSON

//app.use(express.static("./public"));

// Créer une connexion MySQL avec mysql2
const db = await mysql.createConnection(dbConfig);

// Vérifie la connexion à la base de données
try {
  await db.connect();
  console.log("Connecté à la base de données MySQL");
} catch (err) {
  console.error("Erreur de connexion à la base de données :", err);
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret_key", // Remplace par ta clé secrète
};

// Configurer Passport avec la stratégie locale
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    const userId = jwt_payload.sub; // Assure-toi que l'ID utilisateur est dans le payload

    // Requête SQL pour récupérer l'utilisateur
    db.query(
      "SELECT * FROM Users WHERE idUser = ?",
      [userId],
      (err, results) => {
        if (err) {
          return done(err, false);
        }
        if (results.length > 0) {
          return done(null, results[0]); // Renvoie l'utilisateur trouvé
        } else {
          return done(null, false); // Utilisateur non trouvé
        }
      }
    );
  })
);

// Sérialiser et désérialiser les utilisateurs
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Users WHERE idUser = ?", [
      id,
    ]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});
// Middleware pour Passport
app.use(passport.initialize());

// Routes
// Inscription d'un utilisateur
app.post("/register", async (req, res) => {
  const { mail, lastName, firstName, password, isAdmin, idGrade, idCampus } =
    req.body;

  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const [result] = await db.execute(
      "INSERT INTO Users (idUser, mail, lastName, firstName, password, isAdmin, idGrade, idCampus) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);",
      [mail, lastName, firstName, hashedPassword, isAdmin, idGrade, idCampus]
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
app.post("/login", async (req, res) => {
  console.log("request login : ", req.body);
  const { mail, password } = req.body;


  try {
    const [result] = await db.execute("SELECT * FROM Users WHERE mail = ?", [
      mail,
    ]);

    // Vérifier l'utilisateur dans la base de données
    //db.query("SELECT * FROM Users", [mail], (err, results) => {
    console.log("results :", result);
    //if (err) return res.status(500).json({ error: "Erreur de base de données" });

    if (result.length === 0) {
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    const user = result[0];

    // Ici, tu devrais vérifier le mot de passe (utilise bcrypt pour le hashage)
    if (!bcrypt.compare(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    const payload = createPayload(user.idUser, user.mail);

    function excludeAttribute(obj, attr) {
      const { [attr]: omitted, ...rest } = obj;
      return rest;
    }

    const userSansPassword = excludeAttribute(user, "password");

    // Signer le token
    const token = jwt.sign(payload, opts.secretOrKey);

    res.json({
      message: "Connexion réussie",
      token,
      user: userSansPassword,
    });
  } catch (err) {
    console.log("Erreur lors de l'aquisition des données");
    return res
      .status(500)
      .json({ error: "Erreur lors de l'aquisition des données" });
  }
});

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

// Route pour récupérer tous les campus
app.get("/campus", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Campus");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des campus :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des campus" });
  }
});

/*
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
*/

// Route pour supprimer un utilisateur
app.delete("/users/:id", async (req, res) => {
  const { idUser } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM Users WHERE idUser = ?", [
      idUser,
    ]);

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
  res.json({ test: "reussi" });
});

app.get("/dev", async (req, res) => {
  res.sendFile(path.resolve("./public/dev/index.html"));
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});
