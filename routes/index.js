import { Router } from "express";
import path from "path";
import { parseExcelData, uploadToDB } from "../controllers/index.js";



const router = Router();
const __dirname = path.resolve();



router.post("/",async(req, res) => {
    if (req.files) {
        const {name,data }= req.files.file;
        const excelData = parseExcelData(data);
       const result = await uploadToDB(excelData,name);
       return res.send("Success :)");
    }

});

router.get("/", (req, res) => {
    return res.sendFile(__dirname + "/index.html");
});

router.get(["/health"], (_req, res) => {
    return res.status(200).json({
        message: "API Working",
        status: process.env.NODE_ENV || "Development",
    });
});

export default router;