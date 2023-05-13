// Localstorage

// Token is for checking if user is logged in and sending auth requests
// User is to display the users username
// Avatar is to display avatar
// isManager is to check authority 

  export const token = localStorage.getItem("accessToken");
  export const user = localStorage.getItem("username");
  export const email = localStorage.getItem("email");
  export const avatar = localStorage.getItem("avatar");
  export const isManager = localStorage.getItem("manager");

// Basic
export const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/";

// Venues (Add id for specific venue)
export const VENUES = "venues/";

// Auth
export const REGISTER = "auth/register/";

export const LOGIN = "auth/login/";

// Profiles 
export const PROFILES = "profiles/";
export const PROFILE = `profiles/${user}`;
export const PROFILE_MEDIA = `profiles/${user}/media`;

// Querry 
const QUERY = "?"

// Bookings
export const BOOKINGS = "bookings/";
// `https://api.noroff.dev/api/v1/holidaze/profiles/${username}/bookings`
export const USER_BOOKINGS = `${user}/bookings/`

export const BOOKING_OWNER = `${QUERY}_owner=true&_bookings=true`

export const ISBOOKED = `${QUERY}_bookings=true`

// Owner 
export const ISOWNER = `${QUERY}_owner=true`