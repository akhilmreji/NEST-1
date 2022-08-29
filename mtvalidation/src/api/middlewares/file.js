const multer = require("multer");
const path=require('path')
var p=require('../../utils/path')
     

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, p);
    console.log(p)

  },
  filename: function (req, file, cb) { 
      cb(null, file.originalname); 
  }
})
const upload = multer({ storage: storage })
module.exports = upload;