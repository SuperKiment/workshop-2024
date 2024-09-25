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
import cors from "cors";
import multer from "multer";
import fs from "fs";

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

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Configure Multer pour stocker les fichiers dans un dossier 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Définit le dossier où les fichiers seront stockés
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Garde le nom original du fichier
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Filtrer les fichiers pour n'accepter que les vidéos
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|mkv|avi|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Seules les vidéos sont autorisées !"));
  }
};

// Initialise multer avec le stockage et le filtre
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100000000 }, // Limite de taille (100MB ici)
});

app.use("/uploads", express.static("uploads"));

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

// Endpoint pour gérer l'upload de la vidéo
app.post("/upload", upload.single("video"), async (req, res) => {
  const { content, isGlobal, idUser } = req.body;

  //console.log(req.body);

  const [rows] = await db.execute("SELECT * FROM Users WHERE idUser = ?", [
    idUser,
  ]);
  if (rows.length == 0) return res.status(400).send("Utilisateur non trouvé");

  const user = rows[0];

  const { isAdmin, idCampus } = user;

  const attachement = req.file.filename;

  console.log(
    "Vidéo upload :",
    content,
    isGlobal,
    isAdmin,
    idCampus,
    idUser,
    attachement
  );

  try {
    const [result] = await db.execute(
      "INSERT INTO `Video` (`idVideo`, `content`, `isGlobal`, `isAdmin`, `idCampus`, `idUser`, `attachement`) VALUES (NULL, ?, ?, ?, ?, ?, ?);",
      [content, isGlobal, isAdmin, idCampus, idUser, attachement]
    );

    res.send("Vidéo uploadée avec succès !");
  } catch (err) {
    console.log(err);
    res.status(400).send("Erreur lors de l'upload de la vidéo.");
  }
});

app.get("/videos", (req, res) => {
  const directoryPath = path.resolve() + "/uploads";
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la lecture des vidéos",
      });
    }
    const videos = files.map((file) => `/uploads/${file}`);
    res.json({ success: true, videos });
  });
});

app.get("/videos/campus/:idCampus", async (req, res) => {
  const { idCampus } = req.params;

  const [result] = await db.execute(
    "SELECT * FROM Video WHERE idCampus = ?",
    [idCampus]
  );

  res.json(result)
});

app.get("/videos/reseau/", async (req, res) => {

  const [result] = await db.execute(
    "SELECT * FROM Video WHERE isGlobal = 1",
  );

  res.json(result)
});

app.get("/videos/admin/", async (req, res) => {

  const [result] = await db.execute(
    "SELECT * FROM Video WHERE isAdmin = 1",
  );

  res.json(result)
});



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

// Route pour récupérer toutes les catégories de plainte
app.get("/complaintCategories", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM CategoryComplaint");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des catégories" });
  }
});

// Route pour ajouter un commentaire à une vidéo
app.post("/videos/:idVideo/comments", async (req, res) => {
  // console.log("acouphene");
  const { idVideo } = req.params;
  const { content, userId } = req.body; // Récupérer l'ID utilisateur du corps de la requête

  // console.log("Début de l'ajout du commentaire :");
  // console.log("ID de la vidéo :", idVideo);
  // console.log("Contenu :", content);
  // console.log("ID de l'utilisateur :", userId);

  try {
    const [result] = await db.execute(
      "INSERT INTO Comment (content, idVideo, idUser) VALUES (?, ?, ?)",
      [content, idVideo, userId]
    );

    console.log(
      "Commentaire ajouté avec succès, ID du commentaire :",
      result.insertId
    );
    res
      .status(201)
      .json({ message: "Commentaire ajouté avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
  }
});

// Route pour envoyer un message 
app.post("/messages", async (req, res) => {
  const { content, idUserSender, idUserReceiver } = req.body; 
  console.log('coucou')
  console.log(content, idUserSender, idUserReceiver)

  try {
    const [result] = await db.execute(
      "INSERT INTO Message (content, dateSended, idUserSender, idUserReceiver) VALUES (?, NOW(), ?, ?)",
      [content, idUserSender, idUserReceiver]
    );

    console.log("Message ajouté avec succès, ID du message :", result.insertId);
    res.status(201).json({ message: "Message ajouté avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'ajout du message :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout du message" });
  }
});

//Récupérer toutes les personnes avec qui quelqu'un a eu une conv
app.get("/users/:idUser/messages/contacts", async (req, res) => {
  const { idUser } = req.params;
  
    try {
    const [contacts] = await db.execute(
      `SELECT DISTINCT u.idUser, u.firstName, u.lastName 
      FROM Message m JOIN Users u 
      ON (m.idUserSender = u.idUser OR m.idUserReceiver = u.idUser) 
      WHERE (m.idUserSender = ? OR m.idUserReceiver = ?) AND u.idUser != ?;`,
      [idUser, idUser, idUser]
    );

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des contacts" });
  }
});



// Route pour envoyer une plainte
app.post("/complaint", async (req, res) => {
  // console.log("acouphene");
  const { content, isGlobal, idCategoryComplaint, idUser } = req.body; // Récupérer l'ID utilisateur du corps de la requête

  // console.log("Début de l'ajout du commentaire :");
  // console.log("ID de la vidéo :", idVideo);
  // console.log("Contenu :", content);
  // console.log("ID de l'utilisateur :", userId);

  try {
    const [result] = await db.execute(
      "INSERT INTO `Complaint`(`content`, `isGlobal`, `idCategoryComplaint`, `idUser`) VALUES (?, ?, ?, ?)",
      [content, isGlobal, idCategoryComplaint, idUser]
    );

    console.log("Plainte ajoutée avec succès, ID du commentaire :", result.insertId);
    res.status(201).json({ message: "Plainte ajoutée avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la plainte :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la plainte" });
  }
});


//Récupérer tous les commentaires d'une vidéo
app.get("/videos/:idVideo/comments", async (req, res) => {
  const { idVideo } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM Comment WHERE idVideo = ?", [
      idVideo,
    ]);
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des commentaires :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commentaires" });
  }
});

//Pouvoir supprimer un commentaire
app.delete("/comments/:idComment", async (req, res) => {
  const { idComment } = req.params;

  try {
    const [result] = await db.execute(
      "DELETE FROM Comment WHERE idComment = ?",
      [idComment]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du commentaire :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du commentaire" });
  }
});

// Ajoute ou supprime un like
app.post("/videos/:idVideo/like", async (req, res) => {
  const { idVideo } = req.params;
  const { userId } = req.body;

  try {
    // Vérifie si l'utilisateur a déjà aimé la vidéo
    const [checkResult] = await db.execute(
      "SELECT * FROM Likes WHERE idVideo = ? AND idUser = ?",
      [idVideo, userId]
    );

    if (checkResult.length > 0) {
      // Si l'utilisateur a déjà aimé, on supprime le like
      await db.execute("DELETE FROM Likes WHERE idVideo = ? AND idUser = ?", [
        idVideo,
        userId,
      ]);
      return res.status(200).json({ message: "Like retiré avec succès" });
    } else {
      // Sinon, on ajoute le like
      const [result] = await db.execute(
        "INSERT INTO Likes (idUser, idVideo) VALUES (?, ?)",
        [userId, idVideo]
      );
      return res
        .status(201)
        .json({ message: "Like ajouté avec succès", id: result.insertId });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout ou du retrait du like :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'ajout ou du retrait du like" });
  }
});

// Vérifie si un utilisateur a déjà aimé une vidéo
app.get("/videos/:idVideo/like/check", async (req, res) => {
  const { idVideo } = req.params;
  const userId = req.body;

  try {
    const [result] = await db.execute(
      "SELECT * FROM Likes WHERE idVideo = ? AND idUser = ?",
      [idVideo, userId]
    );

    if (result.length > 0) {
      res.status(200).json({ liked: true });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du like :", error);
    res.status(500).json({ error: "Erreur lors de la vérification du like" });
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
