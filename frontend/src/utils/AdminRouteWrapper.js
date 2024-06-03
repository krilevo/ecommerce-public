import React from 'react';
import { Navigate } from 'react-router-dom';
import checkAccessLevel from './checkAccessLevel';
import AdminPage from '../pages/AdminPage';

function AdminRouteWrapper() {
  // Check the user's access level here
  const hasAccess = checkAccessLevel('admin');

  if (hasAccess) {
    // User has admin access, render the admin page content
    return <AdminPage />;
  } else {
    // User doesn't have admin access, redirect to the login page or another route
    return <Navigate to="/login" />;
  }
}

export default AdminRouteWrapper;
