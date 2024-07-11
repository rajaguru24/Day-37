const express = require("express");

const app = express();

const fs = require("fs");

const path = require("path");

const PORT = 4000;

const outputFolder = "./output";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

app.get("/createFile", (req, res) => {
  const data = new Date();

  const year = data.getFullYear();

  const month = data.getMonth() + 1;

  const date = data.getDate();

  const hour = data.getHours();

  const mins = data.getMinutes();

  const secs = data.getSeconds();

  const fileName = `${year}-${month}-${date}----${hour}-${mins}-${secs}.txt`;

  const filePath = path.join(outputFolder, fileName);

  fs.writeFile(filePath, data.toISOString(), (err) => {
    if (err) {
      res.status(500).send(`Error creating file:, ${err}`);
      return;
    }
    res.send(`File created successfully: ${fileName}`);
  });
});

app.get("/readFiles", (req, res) => {
  fs.readdir(outputFolder, (err, files) => {
    if (err) {
      res.status(500).send(`Error reading files:, ${err}`);
      return;
    }
    const txtFiles = files.filter((file) => path.extname(file) === ".txt");

    res.json(txtFiles);
  });
});

app.listen(PORT, () => {
  console.log("Server is running:", PORT);
});