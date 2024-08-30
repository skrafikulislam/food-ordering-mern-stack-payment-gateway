import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { name, description, price, category } = req.body;
  const food = new foodModel({
    name,
    description,
    price,
    image: image_filename,
    category,
  });
  try {
    await food.save();
    res.status(200).json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

// remove food item

const removeFood = async (req, res) => {
  const { id } = req.body;
  try {
    const food = await foodModel.findById(id);
    //? This below line is to delete the image stored locally in my system using multer
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Food Removed Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

export { addFood, listFood, removeFood };
