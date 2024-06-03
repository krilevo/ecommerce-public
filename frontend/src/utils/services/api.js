import { BASE_URL } from "../../config";

// Helper function for handling API responses
const handleResponse = async (response) => {
  if (response.status === 403) {
    alert('You are not authorized for this action.')
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Backend Error:', errorData.error);
    throw new Error(errorData.error)
  }

  const data = await response.json();
  return data;
};

const createJsonHeader = () => ({
  'Content-Type': 'application/json',
});

const createAuthorizedHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// Fetch all users
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return handleResponse(response);
};

// Fetch user details
export const fetchUserDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return handleResponse(response);
};

// Update a user
export const updateUser = async (userId, userData) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: createAuthorizedHeader(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

// Add user details
export const addUserDetails = async (userId, userData) => {
  const response = await fetch(`${BASE_URL}/users/details/${userId}`, {
    method: 'PUT',
    headers: createJsonHeader(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

// Create a new user
export const createUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/create-user`, {
    method: 'POST',
    headers: createJsonHeader(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

// Delete a user
export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: createAuthorizedHeader()
  });
  return handleResponse(response);
};

// Fetch categories
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories/`)
  return handleResponse(response);
};

// Add a category
export const addCategory = async (parentName, parentFullpath, newCategory, createTopCategory) => {
  const response = await fetch(`${BASE_URL}/categories/`, {
    method: 'POST',
    headers: createAuthorizedHeader(),
    body: JSON.stringify({
      name: newCategory,
      parent: parentName,
      parentFullpath: parentFullpath,
      createTopCategory: createTopCategory
    })
  })
  return handleResponse(response);
};

// Delete a category and its subcategories
export const deleteCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/categories/${category}`, {
    method: 'DELETE',
    headers: createAuthorizedHeader()
  });
  return handleResponse(response);
};

// Fetch top categories
export const fetchTopCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories/top`)
  return handleResponse(response);
};

// Fetch sub categories
export const fetchSubCategories = async (subCategoryName) => {
  const response = await fetch(`${BASE_URL}/categories/sub/${subCategoryName}`)
  return handleResponse(response);
};

// Fetch bottom categories
export const fetchBottomCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories/bottom`);
  return handleResponse(response);
};

// Fetch a product
export const fetchProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  return handleResponse(response);
};

// Fetch best-selling products
export const fetchBestSellingProducts = async () => {
  const response = await fetch(`${BASE_URL}/products/best-selling`)
  return handleResponse(response);
};

// Fetch discounted products
export const fetchDiscountedProducts = async () => {
  const response = await fetch(`${BASE_URL}/products/discounted`)
  return handleResponse(response);
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`)
  return handleResponse(response);
};

// Fetch products by page
export const fetchProductsByPage = async (category, currentPage, productsPerPage, sort) => {
  const response = await fetch(`${BASE_URL}/products/category/${category}?page=${currentPage}&limit=${productsPerPage}&sort=${sort}`);
  return handleResponse(response);
};

// Search products
export const searchProducts = async (searchQuery) => {
  const response = await fetch(`${BASE_URL}/products/search/${searchQuery}`);
  return handleResponse(response);
};

// Add a product
export const addProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: createAuthorizedHeader(),
    body: product
  });
  return handleResponse(response);
};

// Update a product
export const updateProduct = async (id, data) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: createAuthorizedHeader(),
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

// Reduce product stock
export const reduceProductStock = async (cart) => {
  const response = await fetch(`${BASE_URL}/products/reduce-stock`, {
    method: 'PUT',
    headers: createJsonHeader(),
    body: JSON.stringify(cart)
  });
  return handleResponse(response);
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/delete/${id}`, {
    method: 'DELETE',
    headers: createAuthorizedHeader()
  });
  return handleResponse(response);
}

// Fetch orders by status
export const fetchOrdersByStatus = async (status) => {
  const response = await fetch(`${BASE_URL}/orders/status/${status}`);
  return handleResponse(response);
}

// Create order
export const createOrderAndReduceStock = async (order) => {
  const response = await fetch(`${BASE_URL}/orders/create-order`, {
    method: 'POST',
      headers: createJsonHeader(),
      body: JSON.stringify(order)
  })
  return handleResponse(response);
}

// Update order
export const updateOrder = async (id, order) => {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    method: 'PUT',
    headers: createAuthorizedHeader(),
    body: JSON.stringify({ order })
  });
  return handleResponse(response);
}