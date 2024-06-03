import { Routes, Route, Outlet } from 'react-router-dom';
import './AdminPage.css';
import AddProduct from '../../components/admin/AddProduct';
import AdminBar from '../../components/admin/AdminBar';
import UserManagement from '../../components/admin/UserManagement';
import ProductManagement from '../../components/admin/ProductManagement';
import AddCategory from '../../components/admin/AddCategory';
import OrderManagement from '../../components/admin/OrderManagement';
import DeleteCategory from '../../components/admin/DeleteCategory';

const AdminPage = () => {
  return (
    <div>
      <div className="admin-page-container">
        <AdminBar/>
        <Routes>
          <Route path="/user-management" element={<UserManagement/>}/>
          <Route path="/product-management" element={<ProductManagement/>}/>
          <Route path="/add-category" element={<AddCategory/>}/>
          <Route path="/delete-category" element={<DeleteCategory/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/order-management" element={<OrderManagement/>}/>
        </Routes>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPage;