import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "../css/adminMenu.css";

function AdminCategory() {
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const token = localStorage.getItem("token");
  const { id } = useParams();

  const headers = {
    Authorization: `${token}`,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/category/all-category"
        );
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handelUpdate = async (id) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const handelEditModal = async () => {
    try {
      if (!editName || !editDescription) {
        alert("All fields required");
      } else {
        const { data } = await axios.patch(
          `http://localhost:8000/category/edit-category/${selectedCategoryId}`,
          { name: editName, description: editDescription },
          { headers }
        );
        if (data.msg === "Category updated") {
          alert("Category updated");
          window.location.reload();
        } else {
          alert("error in updating category");
        }
      }
    } catch (error) {
      console.log("Error in editing");
    }
  };

  const handelDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/category/delete-category/${id}`,
        { headers }
      );
      if (data.msg === "Category deleted") {
        alert("category deleted");
        window.location.reload();
      } else {
        alert("Error in deleting category");
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
      if (!newName || !newDescription) {
        alert("All fields required");
      } else {
        const { data } = await axios.post(
          "http://localhost:8000/category/add-category",
          { name: newName, description: newDescription, user: id },
          { headers }
        );
        if (data.msg === "New category added.") {
          alert("New category added");
          window.location.reload();
        } else {
          alert("Error in adding category");
        }
      }
    } catch (error) {
      console.log("Error in adding category");
    }
  };

  return (
    <div className="container">
      <h1>Category Details</h1>
      <button
        style={{ marginLeft: "1000px", marginBottom: "20px" }}
        className="button"
        onClick={handleAdd}
      >
        Add Category
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((e, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.description}</td>
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
                  <Link to={`/admin-menu/${e._id}`}>
                  <button className="button-visit">Menu</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">Edit Category</div>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label>Category name:</label>
              <input
                type="text"
                placeholder="category name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                placeholder="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
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
            <div className="modal-title">Add Category Modal</div>
            <button
              className="close-button"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label>Category name : </label>
              <input
                type="text"
                placeholder="category name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label>Description : </label>
              <input
                type="text"
                placeholder="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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

export default AdminCategory;
