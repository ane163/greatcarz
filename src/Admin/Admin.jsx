import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "cars",
  });


  const updateOrderStatus = async (id, status) => {

  try {

    await fetch(
      `http://localhost:5000/api/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    loadOrders();

  } catch(err) {

    console.log(err);

  }

};

  const [image, setImage] = useState(null);

  const loadCars = () => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  };

  const loadOrders = () => {
  fetch("http://localhost:5000/api/orders")
    .then((res) => res.json())
    .then((data) => setOrders(data))
    .catch((err) => console.log(err));
};

  useEffect(() => {
    loadCars();
    loadOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);

    if (image) {
      data.append("image", image);
    }

    const url = editingId
      ? `http://localhost:5000/cars/${editingId}`
      : "http://localhost:5000/cars";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
  method,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: data,
});

    if (response.ok) {
      alert(editingId ? "Car Updated!" : "Car Added!");

      setEditingId(null);

      setImage(null);

      setFormData({
        name: "",
        price: "",
        category: "cars",
      });

      loadCars();
    } else {
      alert("Operation failed.");
    }
  };

  const editCar = (car) => {
    setEditingId(car._id);

    setFormData({
      name: car.name,
      price: car.price,
      category: car.category,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCar = async (id) => {
    if (!window.confirm("Delete this product?")) return;

   await fetch(`http://localhost:5000/cars/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    loadCars();
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("adminLoggedIn"); 
  navigate("/login");
};

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
);


return (
    <div className="admin">

      <div className="top-bar">
        <h1>🚗 GREATCARS ADMIN DASHBOARD</h1>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>{cars.length}</h2>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <h2>{cars.filter(c => c.category === "cars").length}</h2>
          <p>Cars</p>
        </div>

        <div className="stat-card">
          <h2>{cars.filter(c => c.category === "tyres").length}</h2>
          <p>Tyres</p>
        </div>

        <div className="stat-card">
          <h2>{cars.filter(c => c.category === "batteries").length}</h2>
          <p>Batteries</p>
        </div>

      </div>

      <div className="admin-container">

        <div className="admin-card">

          <h2>
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="price"
            placeholder="$18 000"
            value={formData.price}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="cars">Cars</option>
            <option value="tyres">Tyres</option>
            <option value="batteries">Batteries</option>
            <option value="seats">Seats</option>
            <option value="oil">Oil</option>
          </select>

          <label className="upload-label">
            Choose Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

        </div>

        <div className="table-card">

          <div className="table-header">

            <h2>Inventory</h2>

            <input
              className="search-box"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <table>

            <thead>

              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredCars.map((car) => (

                <tr key={car._id}>

                  <td>

                    <img
                      src={`http://localhost:5000${car.image}`}
                      alt={car.name}
                    />

                  </td>

                  <td>{car.name}</td>

                  <td>{car.price}</td>

                  <td>{car.category}</td>

                  <td>

                    <button
                      className="edit"
                      onClick={() => editCar(car)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteCar(car._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="table-card">

  <h2>Customer Orders</h2>

  <table>

    <thead>
      <tr>
        <th>Customer</th>
        <th>Phone</th>
        <th>Products</th>
        <th>Total</th>
        <th>Payment</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>

      {orders.map((order) => (

        <tr key={order._id}>

          <td>{order.customerName}</td>

          <td>{order.phone}</td>

          <td>
            {order.products.map(product => (
              <div key={product.name}>
                {product.name} × {product.quantity}
              </div>
            ))}
          </td>

          <td>
            ${Number(order.totalPrice).toLocaleString()}
          </td>

          <td>{order.paymentMethod}</td>

          <td>

<select
value={order.status}
onChange={(e) =>
  updateOrderStatus(
    order._id,
    e.target.value
  )
}
>

<option value="Pending">
Pending
</option>

<option value="Processing">
Processing
</option>

<option value="Delivered">
Delivered
</option>

<option value="Cancelled">
Cancelled
</option>

</select>

</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    </div>
  );
}

export default Admin;
