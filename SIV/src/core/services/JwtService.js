// src/services/JwtService.js
const JwtService = {
  getToken() {
    return localStorage.getItem('token');
  },

  saveToken(token) {
    localStorage.setItem('token', token);
  },

  destroyToken() {
    localStorage.removeItem('token');
  }
};

export default JwtService;