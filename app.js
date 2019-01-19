const express = require('express');
const multer = require('multer');

const readChunk = require('read-chunk');
const fileType = require('file-type');

const sharp = require('sharp');

const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
});

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {

  var path = req.file.path;
  const buffer = readChunk.sync(path, 0, fileType.minimumBytes);

  console.log(fileType(buffer));

  //var destination = 'uploads/output.webp'
  //console.log(req.file);
  sharp(buffer)
    .resize(320, 240)
    .toFile('output.webp', (err, info) => {
      if (err) throw err;

      console.log(info);
    } );


  res.redirect('/');
});

app.listen(3000);
