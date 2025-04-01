import React, { useEffect, useState } from "react";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [vendorId, setVendorId] = useState(1); // Default vendor
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:80/vendor/${vendorId}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [vendorId]);

  const handleEdit = (product) => {
    alert(`Edit product: ${product.name}`);
    // Future modal/edit logic here
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://127.0.0.1:80/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setProducts((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("Delete failed", err));
    }
  };

  fetch("http://127.0.0.1:80/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newProduct),
})
  .then(async (res) => {
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Unknown error");
    }
    return res.json();
  })
  .then((data) => {
    if (data.id) {
      setProducts((prev) => [...prev, { ...newProduct, id: data.id }]);
      e.target.reset();
      alert("✅ Product added successfully!");
    } else {
      alert("⚠️ Product not added. Try again.");
    }
  })
  .catch((err) => {
    console.error("Add failed", err.message || err);
    alert("❌ Server error: " + (err.message || "Please try again."));
  });

    fetch("http://127.0.0.1:80/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setProducts((prev) => [...prev, { ...newProduct, id: data.id }]);
          e.target.reset();
          alert("✅ Product added successfully!");
        } else {
          alert("⚠️ Product not added. Try again.");
        }
      })
      .catch((err) => {
        console.error("Add failed", err);
        alert("❌ Server error. Please try again.");
      });
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} min-h-screen p-6 transition`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Vendor Product Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded text-sm font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="vendorId" className="block mb-1 text-sm">
            Vendor ID
          </label>
          <input
            type="number"
            id="vendorId"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="w-32 border border-gray-300 rounded px-3 py-2 shadow-sm"
          />
        </div>

        <div className="mb-10 border p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-blue-600 mr-2 text-xl">➕</span> Add New Product
          </h2>
          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input name="name" type="text" placeholder="Product Name" required className="border p-2 rounded" />
              <input name="category" type="text" placeholder="Category" required className="border p-2 rounded" />
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price"
                required
                className="border p-2 rounded"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Product
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
              <p className="font-bold text-blue-600 dark:text-blue-400 mt-2">R{product.price.toFixed(2)}</p>

              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 px-3 py-2 text-sm font-medium bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                  onClick={() => handleEdit(product)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="flex-1 px-3 py-2 text-sm font-medium bg-red-100 text-red-800 rounded hover:bg-red-200"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No products found for vendor ID {vendorId}</p>
        )}
      </div>
    </div>
  );
}

