// import React, { useState } from 'react';
// import { BASE_URL } from '../../../config';

// const DeleteProduct = ({ id }) => {
//   // const [isDeleted, setIsDeleted] = useState(false);

//   async function deleteProduct() {
//     console.log(id);
//     try {
//       const response = await fetch(`${BASE_URL}/products/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the JWT token to the request headers
//         }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error);
//       }

//       // setIsDeleted(true);

//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // if (isDeleted) {
//   //   return <p>Product deleted succesfully</p>
//   // }

//   return (
//     <button onClick={deleteProduct}>Delete</button>
//   )
// }

// export default DeleteProduct;