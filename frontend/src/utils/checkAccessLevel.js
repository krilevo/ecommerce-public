import jwt_decode from 'jwt-decode';

const checkAccessLevel = (requiredLevel) => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userAccessLevel = decodedToken?.accessLevel;

      if (userAccessLevel === requiredLevel) {
        return true;
      } 
    }
  
  } catch (error) {
    console.error('Error decoding token:', error);
  }
  
  return false;
}

export default checkAccessLevel;
