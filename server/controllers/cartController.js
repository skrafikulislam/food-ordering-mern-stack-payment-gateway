import userModel from "../models/userModel.js";

//? add items to user cart

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData,
    });
    res.status(200).json({ success: true, message: "Item Added to Cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

//? remove items from user cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData,
    });
    res.status(200).json({ success: true, message: "Item Removed From Cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

//? get items from user cart fetching items

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

export { addToCart, removeFromCart, getCart };
