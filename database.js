import mongoose from "mongoose";

export const establishDatabase = async (uri) => {
  if (!uri) throw new Error("Database URI not found");
  return new Promise((res, rej) =>
    mongoose.connect(uri, (err) => {
      if (err) return rej(err);
      res(mongoose.connection);
    })
  );
};
