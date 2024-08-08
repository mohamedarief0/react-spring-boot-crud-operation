import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    gender: "",
  });
  const [items, setItems] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      gender: "Male",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      gender: "Female",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Manager",
      gender: "Female",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "Developer",
      gender: "Male",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "Designer",
      gender: "Male",
    },
  ]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/items/${editing}`, formData);
      } else {
        await axios.post("/api/items", formData);
      }
      fetchItems();
      setFormData({ name: "", email: "", role: "", gender: "" });
      setEditing(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  // uncommand this untill it all data is getting using GET method
  const fetchItems = async () => {
    try {
      // const response = await axios.get("/api/items");
      // setItems(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditing(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Simple form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          role:
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </label>
        <label>
          gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{editing ? "Update" : "Create"}</button>
      </form>

      <table border={ 2} style={{
        borderCollapse: "collapse",
        marginTop:"20px"
      }}> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{item.gender}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}, {item.email}, {item.role}, {item.gender}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
