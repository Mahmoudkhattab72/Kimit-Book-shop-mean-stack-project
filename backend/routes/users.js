const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const controller = require("../controllers/users");
const auth = require("../middleware/auth");
const validationMW = require("../validation/user");
const multer  = require('multer');
const uuid = require('uuid');
const storage = multer.diskStorage({
    destination: (request, file, cb) =>{
        if(file.mimetype.includes("image")){
            cb(null, "upload/");
        }else{
            cb(new Error("Invalid file extension"));
        }
        
    },
    filename: (request, file, cb) => {
        console.log("file ::", file);
        console.log("uuid ::", uuid.v4());
        
        const newFileName = uuid.v4();
        console.log("uuid ::", uuid.v4());
        const extension = file.mimetype.split("/")[1]
        console.log("extension ::", extension);
        request.newFileName = `${newFileName}.${extension}`
        cb(null, `${newFileName}.${extension}`);
    },
});

const upload = multer({storage, limits: {fileSize: 1024 * 1024 * 5}});

router.get("", auth, controller.select);
router.post("", auth, upload.single("userPhoto"),validationMW.addUserValidation, controller.add);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.deleteUsers);
router.patch("/:id", auth, controller.recover);
router.post("/login", validationMW.loginValidation, controller.login);
module.exports = router;