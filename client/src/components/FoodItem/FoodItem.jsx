import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    //! Using Normal Usestate Cart Add And Remove
    // <div className="food-item">
    //   <div className="food-item-img-container">
    //     <img className="food-item-img" src={image} alt={name} />
    //     {!itemCount ? (
    //       <img
    //         onClick={() => setItemCount((prev) => prev + 1)}
    //         className="add"
    //         src={assets.add_icon_white}
    //         alt=""
    //       />
    //     ) : (
    //       <div className="food-item-counter">
    //         <img
    //           onClick={() => setItemCount((prev) => prev - 1)}
    //           src={assets.remove_icon_red}
    //           alt=""
    //         />
    //         <p>{itemCount}</p>
    //         <img
    //           onClick={() => setItemCount((prev) => prev + 1)}
    //           src={assets.add_icon_green}
    //           alt=""
    //         />
    //       </div>
    //     )}
    //   </div>
    //   <div className="food-item-info">
    //     <div className="food-item-name-rating">
    //       <p>{name}</p>
    //       <img src={assets.rating_starts} alt="Ratings" />
    //     </div>
    //     <p className="food-item-desc">{description}</p>
    //     <p className="food-item-price">${price}</p>
    //   </div>
    // </div>
    //! Using Context Api Cart Add And Remove
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />
        {!cartItem ? (
          <img
            onClick={() => addToCart(id)}
            className="add"
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Ratings" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
