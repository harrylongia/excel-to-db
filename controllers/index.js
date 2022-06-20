import excelToJson from "convert-excel-to-json";
import { excelModel } from "../model/excel.model.js";
import async from "async";

export const parseExcelData = (rawExcelData) => {
  let data = excelToJson({
    source: rawExcelData,
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });

  var excelData = Object.values(data)[0];
  excelData.shift(1);
  return excelData;
};

export const uploadToDB = async (excelData, fileName) => {
    return(  async
    .eachSeries(excelData, async (body) => {
        const duplicate = await excelModel.find({
            Email:body.Email
          });
          if(duplicate.length!=0){
            console.log("duplicated",duplicate)
          return Promise.resolve()}
      const entry = await new excelModel({
        fileName,
        ...body,
      }).save();
    }));
}