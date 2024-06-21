const express = require("express");
const fs = require("fs"); // FileSytem read file
const path = require("path"); // Parcourir les dossier
const router = express.Router();


router.get("/:id", (req, res) => {
  const idSong = req.params.id;
  const filePath = path.resolve(__dirname, "songs",`${idSong}.mp3`);
  const info = fs.statSync(filePath);
  const fileSize = info.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(206, head);
    file.pipe(res);
    console.log(head);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;
