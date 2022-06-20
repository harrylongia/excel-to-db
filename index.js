import express from "express";
import xlsx from "node-xlsx";
import upload from 'express-fileupload';
import path from 'path';
import { establishDatabase } from "./database.js";
import excelToJson from "convert-excel-to-json";
import dotenv from "dotenv"
import { excelModel } from "./model/excel.model.js";
import async from "async"

const app = express();
app.use(express.json());
app.use(upload());
dotenv.config();

establishDatabase(process.env.MONGODB_URI).then((c) =>
  console.log("[MDB]", "Connected to", c.name)
);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(
      `Running in ${PORT? "development" : "production"} environment`
    );
    console.log(`Listening on ${PORT}`);
  });


//var obj = xlsx.parse('./myFile.xlsx'); 

let result = excelToJson({
    sourceFile: './myFile.xlsx',
});



var json = Object.values(result)[0]
const keys = json.shift(1);


function renameKeys(body) {
    for (const key in keys) {
        body[keys[key]] =body[key];
        delete body[key];

    }
    return body;
}


async.eachSeries(json,async(body)=>{

    const newBody = renameKeys(body);
   const quote = await new excelModel({fileName:"hi",...newBody}).save();
   console.log(({fileName:"hi",...newBody}));
}).catch(err => console.log(err));













const __dirname = path.resolve();

app.post("/test",(req,res)=>{
    if(req.files){
        console.log(req.files);
    }
})

app.get('/test', (req, res) => {
    return res.sendFile(__dirname+"/index.html")
  })

  app.get(["/", "/health"], (_req, res) => {
    return res.status(200).json({
      message: "Server Working",
      status: process.env.NODE_ENV || "Development",
    });
  });



