import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal/Index';
import UserTable from './UserTable';
import { deleteUser, fetchUsers, updateUser } from '../../../utils/services/api';
import { usePopup } from '../../../utils/PopupContext';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { openPopup } = usePopup();
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    accessLevel: '',
  });

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        openPopup('Error', error.message);
        console.error('Error fetching users:', error);
      });
  }, []);
  
  const handleEditModal = async () => {
    updateUser(formData.id, formData)
    .then(() => fetchUsers())
    .then((data) => {
      setUsers(data);
      openPopup('Updated', 'User info updated succesfully')
    })
    .catch((error) => {
      console.log(error);
      openPopup('Error', error.message);
    })
    .finally(handleCloseModal());
  };

  const handleDeleteModal = async () => {
    deleteUser(formData.id)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== formData.id));
        openPopup('Deleted', 'User deleted succesfully')
      })
      .catch((error) => {
        openPopup('Error', error.message);
        console.error('Error fetching users:', error);
      })
      .finally(handleCloseModal());
  };

  const handleEdit = (user) => {
    setIsEditModalOpen(true);

    setFormData({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessLevel: user.accessLevel,
    });
  };

  const handleDelete = (user) => {
    setIsDeleteModalOpen(true);

    setFormData({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessLevel: user.accessLevel,
    });
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  if (isLoading) {
    return <div className="users-loading">Loading...</div>
  }

  return (
    <div className="user-management-container">
      {/* Modal for editing */}
      <Modal 
        isOpen={isEditModalOpen} 
        action='Save'
        onAction={handleEditModal} 
        onClose={handleCloseModal} 
        title='Edit'
        message={
          <div className="user-management-modal-content">
            <label>First Name</label>
            <input
              className='input'
              type='name'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>Last Name</label>
            <input
            className='input'
              type='name'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
            className='input'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />

            <label>Access Level</label>
            <select
              className='input'
              name='accessLevel'
              value={formData.accessLevel}
              onChange={handleChange}
            >
              <option value='admin'>Admin</option>
              <option value='customer'>Customer</option>
            </select>
          </div>
        }
      />

      {/* Modal for deleting */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        action='Delete'
        onAction={handleDeleteModal} 
        onClose={handleCloseModal} 
        title='Delete'
        message={
          <div className="user-management-modal-content">
            Delete {formData.firstName} {formData.lastName}
          </div>
        }
      />
      <UserTable users={users} editUser={handleEdit} deleteUser={handleDelete}/>
    </div>
  );
};

export default UserManagement;