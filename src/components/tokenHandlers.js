import { token, user } from "../constants/API";

export async function getProfile(url) {
  if(user) { 
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };  
      const res = await fetch(url+user, fetchOptions);
      const json = await res.json();
  
    } catch(error) {
      console.log(error);
    }
  }
}

export function logoutUser() {
  localStorage.removeItem("username")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("manager")
  localStorage.removeItem("avatar")
  window.location.reload()
}