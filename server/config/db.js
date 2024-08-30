import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://rafikulfood:RafikulFood@cluster0.qa9wv.mongodb.net/food-order?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("MonGo DB Connected");
    })
    .catch((err) => {
      console.log(`Error Connecting MonGo DB: ${err}`);
    });
};

export default connectDb;
