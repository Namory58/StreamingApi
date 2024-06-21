const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

const streamMusic = require('./streamAudio');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get("/", (req, res) => {;
  res.json({
    error: false,
    message: "Bienvenue sur notre prémière Api",
  });
});
app.use("/stream",streamMusic);

app.listen(port, () => {
  console.log("serveur lancer sur le port : " + port);
});
