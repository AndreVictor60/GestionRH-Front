export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log("user.token",'Bearer ' + token);
    if (token) {
      return 'Bearer ' + token ;
    } else {
      return {};
    }
  }