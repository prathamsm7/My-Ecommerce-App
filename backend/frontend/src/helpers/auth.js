export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('token')) {
    // return JSON.parse(localStorage.getItem('token'));
    return true;
  } else {
    return false;
  }
};
