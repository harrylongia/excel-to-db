import pkg from "mongoose";
const { model, Schema, SchemaTypes } = pkg;


const excelSchema = new Schema(
  {
    fileName: {
      type: SchemaTypes.String,
      required: true,
    },
  Email:{
    type: SchemaTypes.String,
    required:true,
    unique:true,
  },
},
  {strict: false},
  { timestamps: true }
);

export const excelModel = model("excel-records", excelSchema);
