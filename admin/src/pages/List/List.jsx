import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // const url = "http://localhost:5000";

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error Getting Food Items From DataBase");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    // console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(`Success - ${response.data.message}`);
    } else {
      toast.error(`Error - ${response.data.message}`);
    }
  };

  return (
    <div className="list add flex-col">
      <Toaster position="top-right" reverseOrder={false} />
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, i) => {
          return (
            <div key={i} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
