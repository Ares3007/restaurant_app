import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/adminMenu.css";

function AdminMenu() {
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const token = localStorage.getItem("token");
  const { id } = useParams();

  const headers = {
    Authorization: `${token}`,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/menu/get-by-id/${id}`
        );
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData(id);
  }, []);


  const handelUpdate = async (id) => {
    setSelectedMenuId(id);
    console.log(selectedMenuId)
    setShowModal(true);
  };

  const handelEditModal = async () => {
    try {
      if (!editName || !editPrice) {
        alert("All fields required");
      } else {
        const { data } = await axios.patch(
          `http://localhost:8000/menu/edit-menu/${selectedMenuId}`,
          { name: editName, price: editPrice },
          { headers }
        );
        if (data.msg === "Menu data edited successfully") {
          alert("Menu updated");
          window.location.reload();
        } else {
          alert("error in updating menu");
        }
      }
    } catch (error) {
      console.log("Error in editing");
    }
  };

  const handelDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/menu/delete-menu/${id}`,
        { headers }
      );
      if (data.msg === "Menu data deleted successfully") {
        alert("Menu deleted");
        window.location.reload();
      } else {
        alert("Error in deleting menu");
      }
    } catch (error) {
      console.log("error in deleting");
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handelAddModal = async () => {
    try {
      if (!newName || !newPrice) {
        alert("All fields required");
      } else {
        const { data } = await axios.post(
          "http://localhost:8000/menu/add-menu",
          { name: newName, price: newPrice, category: id },
          { headers }
        );
        if (data.msg === "Menu data inserted successfully") {
          alert("New menu added");
          window.location.reload();
        } else {
          alert("Error in adding menu");
        }
      }
    } catch (error) {
      console.log("Error in adding category");
    }
  };

  return (
    <div className="container">
      <h1>Menu Details</h1>
      <button
        style={{ marginLeft: "1000px", marginBottom: "20px" }}
        className="button"
        onClick={handleAdd}
      >
        Add Menu
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((e, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>
                  <button
                    onClick={() => handelUpdate(e._id)}
                    className="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handelDelete(e._id)}
                    className="button delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">Edit Menu</div>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label>Menu name:</label>
              <input
                type="text"
                placeholder="menu name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="string"
                placeholder="description"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handelEditModal} className="button">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">Add Menu</div>
            <button
              className="close-button"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label>Menu name : </label>
              <input
                type="text"
                placeholder="menu name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label>Price : </label>
              <input
                type="text"
                placeholder="description"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handelAddModal} className="button">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMenu
