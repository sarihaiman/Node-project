import {jwtDecode} from 'jwt-decode';

const isTokenValid = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp! > currentTime) {
        return token;
      }
    }
    window.location.href = 'http://localhost:5173/signIn'; 
    return "";
  }

export default isTokenValid;






