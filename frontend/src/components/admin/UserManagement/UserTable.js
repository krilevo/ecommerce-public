import React from 'react';
import './UserTable.css';

const UserTable = ({ users, editUser, deleteUser }) => {

  return (
    <>
      <table className="user-management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Access Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.accessLevel}</td>
              <td>
                <button className="user-management-table-btn user-management-edit-btn" onClick={() => editUser(user)}>Edit</button>
                <button className="user-management-table-btn user-management-delete-btn" onClick={() => deleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
