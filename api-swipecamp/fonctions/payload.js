const createPayload = (userId, userName) => {
  return {
    sub: userId, // ID utilisateur
    name: userName, // Nom de l'utilisateur
    iat: Math.floor(Date.now() / 1000), // Date d'émission
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Date d'expiration (1 heure)
  };
};

export default createPayload;
